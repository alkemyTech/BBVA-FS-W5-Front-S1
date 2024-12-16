import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import apiConfig from "../../Config/axiosConfig";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

export default function SendMoney({ send }) {
  const navigate = useNavigate();
  const userAuthenticated = useSelector((state) => state.userAuthenticated);
  const [accounts, setAccounts] = useState([]);
  const [cbuCompleto, setCbuCompleto] = useState(false);
  const [cbuValido, setCbuValido] = useState(false);
  const [userChip, setUserChip] = useState({
    firstName: "",
    lastName: "",
    currency: "",
    transactionLimit: "",
  });
  const [tipoCuenta, setTipoCuenta] = useState({
    currency: "ARS",
  });
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    cbu: "",
  });
  const [deposit, setDeposit] = useState({
    amount: "",
    description: "",
    currencyType: "",
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiConfig.get("accounts/");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (transaction.cbu.length == 20) {
      buscarCuentaCbu();
      setCbuCompleto(true);
    }
  }, [transaction.cbu || deposit.currencyType]);

  const handleGoHome = () => {
    navigate("/home");
  };

  const buscarCuentaCbu = async () => {
    let response;
    try {
      response = await apiConfig.get(`/accounts/${transaction.cbu}`, {});
      setUserChip({
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        currency: response.data.currency,
        transactionLimit: response.data.transactionLimit,
      });
      setCbuValido(true);
    } catch (e) {
      console.log(e);
      setCbuValido(false);
      setCbuCompleto(false);
      setUserChip({
        firstName: "",
        lastName: "",
        currency: "",
        transactionLimit: "",
      });
    }
  };

  const manejarTransferencia = async () => {
    let response;
    if (send == true) {
      if (tipoCuenta.currency == "ARS") {
        try {
          response = await apiConfig.post("/transactions/sendArs", {
            amount: transaction.amount,
            description: transaction.description,
            cbu: transaction.cbu,
          });
          alert("Transferencia realizada con exito");
          navigate("/home");
        } catch (e) {
          console.log(e);
          setTransaction({
            amount: "",
            description: "",
            cbu: "",
          });
          if (e.response.status === 500) {
            alert("ERROR! La transferencia no pudo realizarse");
          } else {
            alert(e.response.data.Mensaje);
          }
        }
      } else {
        try {
          response = await apiConfig.post("/transactions/sendUsd", {
            amount: transaction.amount,
            description: transaction.description,
            cbu: transaction.cbu,
          });
          alert("Transferencia realizada con exito");
          navigate("/home");
        } catch (e) {
          console.log(e);
          setTransaction({
            amount: "",
            description: "",
            cbu: "",
          });
          if (e.response.status === 500) {
            alert("ERROR! La transferencia no pudo realizarse");
          } else {
            alert(e.response.data.Mensaje);
          }
        }
      }
    } else {
      try {
        response = await apiConfig.post("/transactions/deposit", {
          amount: deposit.amount,
          description: deposit.description,
          currencyType: tipoCuenta.currency,
        });
        alert("Deposito realizado con exito");
        navigate("/home");
      } catch (e) {
        console.log(e);
        setTransaction({
          amount: "",
          description: "",
          currencyType: "",
        });
        alert("ERROR! El deposito no pudo realizarse");
      }
    }
  };

  const obtenerIniciales = (cadena) => {
    return cadena
      .split(" ")
      .filter((palabra) => palabra)
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join("");
  };

  const obtenerCuenta = (currency) => {
    let accountBuscada = null;
    accounts.map((account) => {
      if (account.currency === currency) {
        accountBuscada = account;
      }
    });
    return accountBuscada;
  };

  return (
      <Card variant="elevation" elevation={20} sx={{  
        width: "65%",
        m: "auto", // Centra horizontalmente y verticalmente
        position: "absolute", // Posición absoluta
        top: "50%", // Lo coloca al 50% desde arriba
        left: "50%", // Lo coloca al 50% desde la izquierda
        transform: "translate(-50%, -50%)", // Centra completamente
        borderRadius: "20px"
        }}>
        <Grid
          container
          flexDirection= {send ? "" :"column"}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid item size={12}>
            <Grid container>
              <Grid item size={12}>
                <Typography
                  variant="h4"
                  sx={{
                    p: 2,
                    mb: "30px",
                    background: "#646cff",
                    color: " white",
                  }}
                >
                  {send ? "Transferencia" : "Deposito"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={12}>
            {((send && cbuCompleto && cbuValido) ||
              (!send && obtenerCuenta(tipoCuenta.currency) != null)) && (
              <Grid container
                sx={{
                  border: "1px solid #646cff",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent:"space-between",
                  textAlign:"center",
                  alignItems: "center",
                  width: "56%",
                  margin: "auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  marginBottom: "30px",
                  p:2.2
                }}
              >
                <Grid item size={2} >
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
                    {obtenerIniciales(
                      send
                        ? userChip.firstName + " " + userChip.lastName
                        : userAuthenticated.firstName +
                            " " +
                            userAuthenticated.lastName
                    )}
                  </Avatar>
                </Grid>
                <Grid item size={5}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "16px", color: "#646cff" }}
                  >
                    {send
                      ? userChip.firstName + " " + userChip.lastName
                      : userAuthenticated.firstName +
                        " " +
                        userAuthenticated.lastName}
                  </Typography>
                  <Typography variant="p" color="textSecondary">
                    CBU: {send
                      ? transaction.cbu
                      : obtenerCuenta(tipoCuenta.currency).cbu}
                  </Typography>
                </Grid>
                <Grid item size={5}>
                  <Grid container>
                    <Grid item size={12}><Typography variant="p" color="textSecondary">
                    {send
                      ? "Limite de transaccion: $" + userChip.transactionLimit
                      : "Balance: $" +
                        obtenerCuenta(tipoCuenta.currency).balance}
                  </Typography></Grid>
                    <Grid item size={12}><Typography variant="p" color="textSecondary">
                    Tipo de cuenta: {send ? userChip.currency : tipoCuenta.currency}
                  </Typography></Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item size={6}>
            <Grid container p="10px" flexDirection="column" spacing={7}>
              {send && (
                <Grid item size={12}>
                  <TextField
                    id=""
                    label="CBU"
                    value={transaction.cbu}
                    onChange={(e) => {
                      const nuevoCbu = e.target.value;
                      setTransaction({
                        ...transaction,
                        cbu: nuevoCbu,
                      });
                      setCbuCompleto(nuevoCbu.length === 20);
                    }}
                    sx={{ width: "90%",textAlign:"center"}}
                  />
                </Grid>
              )}
              <Grid item size={12}>
                <TextField
                  id="tipo-cuenta"
                  label="Tipo de cuenta"
                  value={tipoCuenta.currency}
                  onChange={(e) =>
                    setTipoCuenta({ ...tipoCuenta, currency: e.target.value })
                  }
                  select
                  sx={{ width: send ? "90%" : "40%" }}
                  variant="outlined"
                >
                  <MenuItem value="ARS">ARS</MenuItem>
                  {accounts.length > 1 && <MenuItem value="USD">USD</MenuItem>}
                </TextField>
              </Grid>
              
            </Grid>
          </Grid>
          <Grid item size={6}>
            <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            spacing={5}
          >
            <Grid item={12}>
            <NumericFormat
              sx={{
                width: "100%",
                "& input::placeholder": {
                  color: "black",
                  opacity: 1,
                },
              }}
              value={send ? transaction.amount : deposit.amount}
              onValueChange={(values) => {
                const { value } = values;
                send
                  ? setTransaction({ ...transaction, amount: value })
                  : setDeposit({ ...deposit, amount: value });
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
                    color: "#646cff",
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
              value={send ? transaction.description : deposit.description}
              onChange={(e) =>
                send
                  ? setTransaction({
                      ...transaction,
                      description: e.target.value,
                    })
                  : setDeposit({
                      ...deposit,
                      description: e.target.value,
                    })
              }
              sx={{ width: "80%" }}
            />
          </Grid>
          </Grid>
          
          </Grid>
          

          
          <Grid item size={12}>
            <Grid container justifyContent="end" alignItems="end">
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
                {send ? "Transferir" : "Depositar"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    
  );
}
