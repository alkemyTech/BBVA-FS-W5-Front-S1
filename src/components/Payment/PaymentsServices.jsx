import React, { useEffect, useState } from 'react';
import {
  
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import apiConfig from '../../Config/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';

const Payment = () => {
  const [accounts, setAccounts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [concept, setConcept] = useState("");
  const dispatch = useDispatch();

  const userAuthenticated = useSelector((state) => state.userAuthenticated);

  const handleOpenDialog = (service) => {
    setCurrentService(service);
    setConcept(`Pago de ${service.name}`);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    
    setConcept("");
  };

  const handleConfirmPayment = () => {
    if (!concept) {
      alert("Por favor, ingrese un concepto");
      return;
    }

    const nuevaTransaccion = {
      amount: currentService.price,
      description: `${concept || `Pago de ${currentService.name}`}`,
      currencyType: "ARS",
    };
    pagarServicio(nuevaTransaccion);
    handleCloseDialog();
  };

  const pagarServicio = async (transaction) => {
    try {
      await apiConfig.post("/transactions/payment", transaction);
      alert("El servicio fue pagado con éxito");
    } catch (e) {
      alert("Ocurrió un error al realizar el pago");
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiConfig.get("accounts/");
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const accountPesos = accounts.filter(account => account.currency === "ARS");

  const services = [
    { name: "Netflix", price: 6000, image: "https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-6-1024x576.png" },
    { name: "Spotify", price: 5000, image: "https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-4.png" },
    { name: "Disney+", price: 7000, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdhsY8X-02mpMvDgZea_Je-bPG8qnqFLb4bHrLpQ5Gluam6M-jMUm8rsXigVpzz6dDV-Mc-kVUtvqovFn2T3S1cZ15yOE2MAMu6f_ng-jxkv-oXHGeVv4JajAT0KimCb5-LImrnxd23Le4/s1600/disney%252B.jpg" },
    { name: "HBO Max", price: 8500, image: "https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Symbol.png" },
    { name: "Amazon Prime", price: 9000, image: "https://imagenes.elpais.com/resizer/v2/XUFZ2BH5C5JWNICKSC5CJBGCZU.jpg?auth=5ad75fc3c1809da6275fc1bb154727678ba7e8cacc6bf8a16e0f3464699684cf&width=1200" },
    { name: "YouTube Premium", price: 4300, image: "https://gagadget.com/media/cache/ce/91/ce91b0023268291238a231d2439c882c.jpg" },
    { name: "Apple TV+", price: 12000, image: "https://www.apple.com/v/apple-tv-plus/ai/images/meta/apple-tv__e7aqjl2rqzau_og.png" },
    { name: "Paramount+", price: 5500, image: "https://static.eldiario.es/clip/548babf0-6e4a-4603-aca1-fcf283dc8ee0_16-9-discover-aspect-ratio_default_0.jpg" },
    { name: "Direct TV", price: 15000, image: "https://static2.pisapapeles.net/uploads/2024/08/Directv-logo-2024-HD.jpeg" },
    { name: "Movistar+", price: 4550, image: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/07/movistar-logo-001.jpg?fit=1920%2C1200&quality=70&strip=all&ssl=1" },
    { name: "Star+", price: 7200, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWWcQyYoGF046D9j85Xijvdro9u1C3rsXpqTRgkTUn7euHgzbjixOG-D3OAUQNRjn44k6rVf_BJkl3EaEwyLa4rLK4y7vZ4GOYJPoQuZ07UKvYDx1mXfwuR4eGYbajsAJOIezQGDF4ZjXp/s16000/star-%252B-logo-official.png" },
    { name: "Fox Sport", price: 8700, image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Fox_Sports_Premium_Argentina_2019.png" },

  ];

  return (
    <Grid container sx={{ minHeight: "100vh", background: "#f5f5f5", position: "relative", overflow: "hidden" }}>
      <Grid item size={12}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "28px",
            marginTop: "30px",
            color: "#6a0dad",
          }}
        >
          PAGAR SERVICIOS
        </Typography>
      </Grid>

      {/* Mostrar cuentas en pesos */}
      <Grid container spacing={12} sx={{ width: "100%", padding: "20px" }}>
        {accountPesos.map((account) => (
          <Grid item size={12} key={account.currency}>
            <Card
              sx={{
                width: "98%",
                border: "1px solid #E0E0E0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "20px",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "24px", color: "black" }}>
                  {userAuthenticated.firstName} {userAuthenticated.lastName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "18px", color: "#454545" }}>
                    Dinero disponible:
                  </Typography>
                  <AttachMoneyIcon sx={{ fontSize: "40px", color: "#4CAF50" }} />
                  <Typography sx={{ fontWeight: "bold", fontSize: "36px", color: "#2E3B55" }}>
                    {account.balance}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: "#2E3B55" }}>
                  {account.currency}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mostrar servicios */}
      <Grid item size={12} sx={{ padding: "0px 50px 100px 50px" }}>
        <Grid container spacing={4} sx={{ width: "100%", justifyContent: "center" }}>
          {services.map((service) => (
            <Grid item size={2} key={service.name}>
              <Card sx={{ boxShadow: 4, borderRadius: 4 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center" }}>
                    {service.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: 2 }}>
                    
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      ${service.price}
                    </Typography>
                  </Box>                
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(service)}
                    >
                      Pagar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Diálogo de pago */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} >
        <DialogTitle>Pago de Servicio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            No va a ser posible revertir la operación. Por favor, ingrese el concepto del pago:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="concepto"
            label="Concepto"
            type="text"
            fullWidth
            variant="standard"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleConfirmPayment} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Payment;

