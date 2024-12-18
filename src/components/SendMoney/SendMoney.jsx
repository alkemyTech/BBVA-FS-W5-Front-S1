import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import apiConfig from "../../Config/axiosConfig";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import { Card, TextField, Button, MenuItem, duration } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import AlertaDialog from "../UI/Dialogs/AlertaDialog";

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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });
  const [tipoCuenta, setTipoCuenta] = useState({
    currency: "ARS",
  });
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "Varios",
    cbu: "",
  });

  const [deposit, setDeposit] = useState({
    amount: "",
    description: "Varios",
    currencyType: "",
  });

  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [errores, setErrores] = useState({});

  const [mostrarAlertaMovimiento, setMostrarAlertaMovimiento] = useState(false);
  const closeAlertaMovimiento = () => {
    setMostrarAlertaMovimiento(false);
  };
  const openAlertaMovimiento = () => {
    setMostrarAlertaMovimiento(true);
  };

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
    setSnackbarVisibility(false);
    setMostrarAlertaMovimiento(false)
    if (send == true) {
      if (tipoCuenta.currency == "ARS") {
        try {
          if (transaction.description == "") {
            transaction.description = "Varios";
          }
          response = await apiConfig.post("/transactions/sendArs", {
            amount: transaction.amount,
            description: transaction.description,
            cbu: transaction.cbu,
          });
          setIsLoading(true);
          setLoadingScreen({
            message: "Realizando Transferencia " ,
            duration: 3000
          })
          setTimeout(() => {
            navigate("/home")
          },3000)
        } catch (e) {
          setSnackbar({
            status: "error",
            message: e.response.data.Mensaje,
          });
          setSnackbarVisibility(true);
        }
      } else {
        try {
          response = await apiConfig.post("/transactions/sendUsd", {
            amount: transaction.amount,
            description: transaction.description,
            cbu: transaction.cbu,
          });
          setIsLoading(true);
          setLoadingScreen({
            message: "Realizando Transferencia " ,
            duration: 3000
          })
          setTimeout(() => {
            navigate("/home")
          },3000)
        } catch (e) {
          setTransaction({
            amount: "",
            description: "",
            cbu: "",
          });
          setSnackbar({
            status: "error",
            message: e.response.data.Mensaje,
          });
          setSnackbarVisibility(true);
        }
      }
    } else {
      try {
        response = await apiConfig.post("/transactions/deposit", {
          amount: deposit.amount,
          description: deposit.description,
          currencyType: tipoCuenta.currency,
        });
        setIsLoading(true);
          setLoadingScreen({
            message:"Realizando Deposito",
            duration: 3000
          })
          setTimeout(() => {
            navigate("/home")
          },3000)
      } catch (e) {
        setTransaction({
          amount: "",
          description: "",
          currencyType: "",
        });
        setSnackbar({
          status: "error",
          message: e.response.data.Mensaje,
        });
        setSnackbarVisibility(true);
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

  const presenciaDeErrores = Object.values(errores).some(
    (valor) => valor != null
  );

  const validarCampo = (campo, valor) => {
    if (campo === "cbu" && !cbuCompleto && valor != "") {
      setErrores((errores) => ({
        ...errores,
        cbu: "El cbu debe contener 20 digitos",
      }));
    }

    if (campo === "cbu" && (cbuCompleto || valor === "")) {
      setErrores((errores) => ({
        ...errores,
        cbu: null,
      }));
    }

    if (campo === "amount") {
      if (campo === "amount" && valor == "$0") {
        setErrores((errores) => ({
          ...errores,
          amount: "El monto no puede ser 0",
        }));
      }

      if (campo === "amount" && valor != "" && valor != "$0") {
        setErrores((errores) => ({
          ...errores,
          amount: null,
        }));
      }
    }
  };

  return (
    <>
    <Card
      variant="elevation"
      elevation={20}
      sx={{
        width: "70%",
        flexDirection: "column",
        m: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "20px",
        mt: send ? 0 : 4,
        background: "#fafafa",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid item size={12}>
          <Grid container>
            <Grid item size={12}>
              <Typography
                variant="h3"
                sx={{
                  p: 2,
                  mb: "30px",
                  background: "#6655D9",
                  color: " white",
                }}
              >
                {send ? "Transferencia" : "Deposito"}{" "}
                {send ? <CallMadeIcon /> : <CallReceivedIcon />}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12}>
          {send && cbuCompleto && cbuValido && (
            <Grid
              container
              sx={{
                border: "1px solid #646cff",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
                width: "60%",
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                marginBottom: "30px",
                p: 1.5,
              }}
            >
              <Grid item size={2}>
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
                    userChip.firstName + " " + userChip.lastName
                  )}
                </Avatar>
              </Grid>
              <Grid item size={5}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "16px", color: "#646cff" }}
                >
                  {userChip.firstName + " " + userChip.lastName}
                </Typography>
                <Typography variant="p" color="textSecondary">
                  CBU: {transaction.cbu}
                </Typography>
              </Grid>
              <Grid item size={5}>
                <Grid container>
                  <Grid item size={12}>
                    <Typography variant="p" color="textSecondary">
                      {"Limite de transaccion: $" + userChip.transactionLimit}
                    </Typography>
                  </Grid>
                  <Grid item size={12}>
                    <Typography variant="p" color="textSecondary">
                      Tipo de cuenta: {userChip.currency}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item size={6}>
          <Grid
            container
            p="10px"
            flexDirection="column"
            spacing={send ? 8 : 6}
          >
            {send ? (
              <Grid item size={12}>
                <TextField
                  id="cbu-input"
                  name="cbu"
                  label="CBU"
                  value={transaction.cbu}
                  error={Boolean(errores.cbu)}
                  helperText={errores.cbu}
                  onChange={(e) => {
                    const nuevoCbu = e.target.value.replace(/[^0-9]/g, ""); // Filtra solo números
                    setTransaction({
                      ...transaction,
                      cbu: nuevoCbu,
                    });
                    setCbuCompleto(nuevoCbu.length === 20);
                  }}
                  onBlur={(e) => validarCampo("cbu", e.target.value)}
                  sx={{ width: "90%", textAlign: "center" }}
                />
              </Grid>
            ) : (
              <Grid item size={12}>
                {!send && obtenerCuenta(tipoCuenta.currency) != null && (
                  <Grid
                    container
                    sx={{
                      border: "1px solid #646cff",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center",
                      alignItems: "center",
                      width: "90%",
                      margin: "auto",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",

                      p: 1,
                    }}
                  >
                    <Grid item size={2}>
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
                    </Grid>
                    <Grid item size={5}>
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
                    </Grid>
                    <Grid item size={5}>
                      <Grid container>
                        <Grid item size={12}>
                          <Typography variant="p" color="textSecondary">
                            {"Balance: $" +
                              obtenerCuenta(tipoCuenta.currency).balance}
                          </Typography>
                        </Grid>
                        <Grid item size={12}>
                          <Typography variant="p" color="textSecondary">
                            Tipo de cuenta: {tipoCuenta.currency}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
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
                sx={{ width: send ? "90%" : "90%" }}
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
                name="amount"
                error={Boolean(errores.amount)}
                helperText={errores.amount}
                onBlur={(e) => validarCampo("amount", e.target.value)}
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

                  // Validar que no comience con 0
                  if (value.startsWith("0") && value !== "") {
                    return;
                  }

                  send
                    ? setTransaction({ ...transaction, amount: value })
                    : setDeposit({ ...deposit, amount: value });
                }}
                prefix="$"
                customInput={TextField}
                decimalSeparator=","
                thousandSeparator="."
                decimalScale={0}
                fixedDecimalScale
                allowNegative={false}
                allowLeadingZeros={false}
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
              onClick={() => openAlertaMovimiento()}
              disabled={
                send
                  ? presenciaDeErrores ||
                    transaction.amount == "" ||
                    transaction.cbu == ""
                  : presenciaDeErrores || deposit.amount == ""
              }
            >
              {send ? "Transferir" : "Depositar"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      
      {snackbarVisibility && (
        <GenericSnackbar
          status={snackbar.status}
          message={snackbar.message}
          visibility={snackbarVisibility}
        />
      )}
      <AlertaDialog
        mostrarAlerta={mostrarAlertaMovimiento}
        accion={manejarTransferencia}
        closeAlerta={closeAlertaMovimiento}
        mensajeAlerta={
          send
            ? "Estas a punto de realizar una transferencia"
            : "Estas a punto de realizar un deposito"
        }
      />
    </Card>
    
    {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
    </>
  );
}
