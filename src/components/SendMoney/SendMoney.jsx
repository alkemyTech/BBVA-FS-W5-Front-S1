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
import axios from "axios";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

export default function SendMoney({ send }) {
  const navigate = useNavigate();
  const userAuthenticated = useSelector((state) => state.userAuthenticated);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cbuCompleto, setCbuCompleto] = useState(false);
  const [cbuValido, setCbuValido] = useState(false);
  const [userChip, setUserChip] = useState({
    firstName: "",
    lastName: "",
  });
  const [tipoCuenta, setTipoCuenta] = useState({
    currency: "ARS",
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
    const fetchTransactions = async () => {
      try {
        const response = await apiConfig.get("/transactions");

        const sortedTransactions = response.data.content
          .sort(
            (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
          )
          .slice(0, 3);
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
    fetchTransactions();
  }, []);

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

  const handleGoHome = () => {
    navigate("/home");
  };

  const buscarCuentaCbu = async() => {
    let response;
    try {
      response = await apiConfig.get(`/accounts/${transaction.cbu}`, {
      });
      setUserChip({
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
      })
      setCbuValido(true)
    } catch (e) {
      console.log(e);
      setCbuValido(false)
      setUserChip({
        firstName: "",
        lastName: "",
      })
    }
  }
  console.log(userChip)
  console.log(cbuValido)
  if(cbuCompleto){
    buscarCuentaCbu()
  }

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
        response = await apiConfig.post("/transactions/deposit",{
          amount: deposit.amount,
          description: deposit.description,
          currencyType: tipoCuenta.currency,
        });
        alert("Deposito realizado con exito");
        handleGoHome;
      } catch (e) {
        console.log(e);
        setTransaction({
          amount: "",
          description: "",
          currencyType: "",
        });
        if (e.response.status === 500) {
          alert("ERROR! El deposito no pudo realizarse");
        } else {
          alert(e.response.data.Mensaje);
        }
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
    console.log(accountBuscada);
    return accountBuscada;
  };
  console.log(accounts);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Card sx={{ width: "70%" }}>
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
                <Typography variant="h4" sx={{ p: 2, pb:"30px" }}>
                  {send ? "Transferencia" : "Deposito"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={12}>
            {send == true ? (
              (cbuCompleto && cbuValido &&(
              <Box sx={{p:3}}>
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
                      {obtenerIniciales(userChip.firstName + " " + userChip.lastName)}
                    </Avatar>
                  }
                  label={userChip.firstName+" "+userChip.lastName}
                  variant="outlined"
                  sx={{
                    fontSize: "20px",
                    color: "#646cff",
                    borderColor: "#646cff",
                    "&:hover": { backgroundColor: "#f3eaff" },
                  }}
                />
              </Box>
              ))
              
            ) : (
              obtenerCuenta(tipoCuenta.currency) != null && (
                <Card
                  sx={{
                    border: "1px solid #646cff",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30%",
                    margin: "auto",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginBottom: "30px"
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
                      {obtenerIniciales(
                        userAuthenticated.firstName +
                          " " +
                          userAuthenticated.lastName
                      )}
                    </Avatar>
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        p: 1,
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: "16px", color: "#646cff" }}
                      >
                        {userAuthenticated.firstName +
                          " " +
                          userAuthenticated.lastName}
                      </Typography>
                      <Typography variant="p" color="textSecondary">
                        CBU: {obtenerCuenta(tipoCuenta.currency).cbu}
                      </Typography>
                      <Typography variant="p" color="textSecondary">
                        Balance: $ {obtenerCuenta(tipoCuenta.currency).balance}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )
            )}
          </Grid>
          <Grid item size={12}>
            <Grid
              container
              justifyContent="space-between"
              p="10px"

            >
              <Grid item size={send ? 6 : 12}>
                <TextField
                  id="tipo-cuenta"
                  label="Tipo de cuenta"
                  value={tipoCuenta.currency}
                  onChange={(e) =>
                    setTipoCuenta({ ...tipoCuenta, currency: e.target.value })
                  }
                  select
                  sx={{ width: send ? "70%" : "30%" }}
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
                    value={transaction.cbu}
                    onChange={(e) => {
                      const nuevoCbu = e.target.value;
                      setTransaction({
                        ...transaction,
                        cbu: nuevoCbu,
                      });
                      setCbuCompleto(nuevoCbu.length === 20);
                    }}
                    sx={{ width: "70%" }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            paddingTop="10px"
            paddingBottom="20px"
          >
            <NumericFormat
              sx={{ width: "50%" }}
              value={send ? transaction.amount : deposit.amount}
              onValueChange={(values) => {
                const { value } = values;
                send ? 
                setTransaction({ ...transaction, amount: value }) :
                setDeposit({...deposit, amount: value})

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
                    color: transaction.amount || deposit.amount ? "#646cff" : "#000000",
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
                send ? 
                setTransaction({
                  ...transaction,
                  description: e.target.value,
                }) : 
                setDeposit ({
                  ...deposit, 
                  description: e.target.value,
                })
              }
              sx={{ width: "30%" }}
            />
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
                continuar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
