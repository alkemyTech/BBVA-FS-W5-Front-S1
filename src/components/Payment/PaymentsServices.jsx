// src/components/Payment.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Import Grid
import { Home, Wifi, Lightbulb, Opacity, WbIncandescent } from '@mui/icons-material';

const services = [
  { name: 'Movistar', icon: <Home fontSize="large" />, price: 'ARS 1200' },
  { name: 'Netflix', icon: <Wifi fontSize="large" />, price: 'ARS 900' },
  { name: 'Edenor', icon: <Lightbulb fontSize="large" />, price: 'ARS 1500' },
  { name: 'Agua', icon: <Opacity fontSize="large" />, price: 'ARS 700' },
  { name: 'Luz', icon: <WbIncandescent fontSize="large" />, price: 'ARS 1600' },
];

// Valores fijos para los balances
const balancePesos = 50000; // Ejemplo: 50,000 pesos disponibles
const balanceDolares = 1000; // Ejemplo: 1,000 dólares disponibles

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [currency, setCurrency] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setPaymentDate(new Date().toLocaleString());
  }, [open]);

  const handleClickOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
    setAmount('');
    setConcept('');
    setCurrency('');
    setPaymentDate('');
    setErrors({});
  };

  const validate = () => {
    let tempErrors = {};
    if (!currency) tempErrors.currency = "Seleccione una moneda.";
    if (amount <= 0) tempErrors.amount = "El monto debe ser mayor que cero.";
    if (concept.length > 100) tempErrors.concept = "El concepto debe tener un máximo de 100 caracteres.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleConfirmPayment = () => {
    if (validate()) {
      alert(`Pago confirmado:
Servicio: ${selectedService.name}
Monto: ${amount} ${currency}
Concepto: ${concept}
Fecha y hora: ${paymentDate}`);
      handleClose();
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Servicios Disponibles para Pagar
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={service.name}>
            <Card sx={{ borderRadius: '8px', border: '1px solid violet' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h5">{service.name}</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                  {service.icon}
                </Box>
                <Typography variant="h6">{service.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleClickOpen(service)}>
                  Pagar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedService && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: '8px',
              border: '1px solid violet',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            Confirmar Pago
          </DialogTitle>
          <DialogContent>
            <Box textAlign="center">
              {selectedService.icon}
              <Typography variant="h5">{selectedService.name}</Typography>
              <Typography variant="h6">{selectedService.price}</Typography>
              <FormControl component="fieldset" fullWidth margin="normal" required error={!!errors.currency}>
                <FormLabel component="legend">Moneda</FormLabel>
                <RadioGroup row value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <FormControlLabel value="Pesos" control={<Radio />} label={`Pesos (Disponible: ${balancePesos} ARS)`} />
                  <FormControlLabel value="Dólares" control={<Radio />} label={`Dólares (Disponible: ${balanceDolares} USD)`} />
                </RadioGroup>
                {errors.currency && <FormHelperText>{errors.currency}</FormHelperText>}
              </FormControl>
              <TextField
                label="Monto"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(Math.max(0, e.target.value))}
                margin="normal"
                required
                error={!!errors.amount}
                helperText={errors.amount}
              />
              <TextField
                label="Concepto"
                fullWidth
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                inputProps={{ maxLength: 100 }}
                margin="normal"
                required
                error={!!errors.concept}
                helperText={errors.concept}
              />
              <Typography variant="body2" color="textSecondary" mt={2}>
                Fecha y hora: {paymentDate}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Volver
            </Button>
            <Button onClick={handleConfirmPayment} variant="contained" color="primary">
              Confirmar Pago
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Payment;
