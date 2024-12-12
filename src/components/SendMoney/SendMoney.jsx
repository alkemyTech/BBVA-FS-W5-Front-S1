import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import { Card, CardContent, TextField, Button, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { NumericFormat } from "react-number-format";



export default function SendMoney({ send }) {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [cbuCompleto, setCbuCompleto] = useState(false);


    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await apiConfig.get("accounts/");
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        const fetchTransactions = async () => {
            try {
                const response = await apiConfig.get("/transactions");

                const sortedTransactions = response.data.content
                    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
                    .slice(0, 3);
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        console.log(accounts)
        fetchAccounts();
        fetchTransactions();
    }, []);

  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    cuentaDestino: "",
  });

  const handleGoHome = () => {
    navigate("/home");
  };

  const manejarTransferencia = async () => {
    let response;

    try {
      console.log(transaction);

      response = await axios.post(
        "http://localhost:8080/transactions/sendArs",
        {
          amount: transaction.amount,
          description: transaction.description,
          cuentaDestino: transaction.cuentaDestino,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert("BOOOOCA");
    } catch (e) {
      console.log(e);
      setTransaction({
        amount: "",
        description: "",
        cuentaDestino: "",
      });
      console.log(transaction);
      alert("No se pudo realizar la transaccion");
    }
  };


    const obtenerIniciales = (cadena) => {
      return cadena
        .split(' ') // Divide el texto en palabras
        .filter((palabra) => palabra) // Elimina posibles cadenas vacías
        .map((palabra) => palabra.charAt(0).toUpperCase()) // Toma la primera letra y la convierte a mayúsculas
        .join(''); // Une las iniciales en un string
    };
  

  return (
    (accounts.map((account) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Card sx={{ width: "80%" }}>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid item size={12}>
            <Grid container>
            <Grid item size={2}>
              <Typography
                onClick={handleGoHome}
                sx={{
                  cursor: "pointer",
                  color: "#646cff",
                  fontSize: "20px",

                  margin: 2,
                }}
              >
                ← Volver
              </Typography>
            </Grid>
            <Grid item size={8}>
              <Typography variant="h4" sx={{ p: 2 }}>
                {send ? "Transferencia" : "Deposito"}
              </Typography>
            </Grid>
            </Grid>

          </Grid>
          <Grid item size={12}>
            <Grid
              container
              justifyContent="space-between"
              paddingBottom={send ? "10px" : "50px"}
            >
              <Grid item size={send ? 6 : 12}>
                <TextField
                  id="tipo-cuenta"
                  label="Tipo de cuenta"
                  select
                  sx={{ width: send ? "50%" : "30%" }}
                  variant="outlined"
                >
                  <MenuItem value="ARS">ARS</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </TextField>
              </Grid>
              {send && (
                <Grid item size={6}>
                  <TextField
                    id=""
                    label="CBU"
                    value={transaction.cuentaDestino}
                    onChange={(e) => {
                      const nuevoCbu = e.target.value;
                      setTransaction({
                        ...transaction,
                        cuentaDestino: nuevoCbu,
                      });
                      setCbuCompleto(nuevoCbu.length === 20); 
                    }}
                    sx={{ width: "50%" }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item size={12}>
          {send == true ?
              (
                <Box
                sx={{
                  opacity: cbuCompleto ? 1 : 0,
                  transform: cbuCompleto ? "translateY(0)" : "translateY(-10px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  display: cbuCompleto ? "block" : "none", 
                }}
              >
                <Chip
                  avatar={
                    <Avatar
                      sx={{
                        backgroundColor: "#646cff",
                        color: "#ffffff !important",
                        fontWeight: "bold",
                        fontSize: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "56px",
                        width: "56px",
                        padding: "4px",
                      }}
                    >
                      {obtenerIniciales(account.titular)}
                    </Avatar>
                  }
                  label={account.titular}
                  variant="outlined"
                  sx={{
                    fontSize: "20px",
                    color: "#646cff",
                    borderColor: "#646cff",
                    "&:hover": { backgroundColor: "#f3eaff" },
                    p: 3,
                  }}
                />
              </Box>): 
              (<Card
                sx={{
                  border: "1px solid #646cff",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%",
                  margin: "auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      backgroundColor: "#646cff",
                      color: "#ffffff !important",
                      fontWeight: "bold",
                      fontSize: "20px",
                      height: "56px",
                      width: "56px",
                    }}
                  >
                    {obtenerIniciales(account.titular)}
                  </Avatar>
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: "16px", color: "#646cff" }}
                    >
                      {account.titular}
                    </Typography>
                    <Typography variant="p" color="textSecondary">
                      CBU: {account.cbu}
                    </Typography>
                    <Typography variant="p" color="textSecondary">
                      Balance: ${account.balance}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>)}
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            paddingTop="40px"
            paddingBottom="20px"
          >
            <NumericFormat
              sx={{ width: "50%" }}
              value={transaction.amount}
              onValueChange={(values) => {
                const { value } = values;
                setTransaction({ ...transaction, amount: value });
              }}
              prefix="$"
              customInput={TextField}
              maxLength={10}
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={0}
              fixedDecimalScale
              allowNegative={false}
              displayType="input"
              InputProps={{
                disableUnderline: true,
                inputProps: {
                  style: {
                    textAlign: "center",
                    fontSize: "50px",
                    fontWeight: "bold",
                  },
                },
              }}
              size="small"
              variant="standard"
              placeholder="$0"
            />
          </Grid>

          <Grid item size={12}>
            <TextField
              id=""
              label="Descripcion"
              value={transaction.description}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  description: e.target.value,
                })
              }
              sx={{ width: "25%" }}
            />
          </Grid>
          <Grid item size={12}>
            <Grid container justifyContent="end" alignItems="end" >
              
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    background: "#646cff",
                    fontWeight: "bold",
                    margin: 2,
                  }}
                  onClick={manejarTransferencia}
                >
                  continuar
                </Button>
              
            </Grid>
          </Grid>
        </Grid>
      </Card>
      
    </div>
    )))
  );
}
