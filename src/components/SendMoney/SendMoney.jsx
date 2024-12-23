import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import apiConfig from "../../Config/axiosConfig";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import { Card, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import AlertaDialog from "../UI/Dialogs/AlertaDialog";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function SendMoney({ send }) {
  const { cbuParam, tipoCuentaParam } = useParams();
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
    currency:
      tipoCuentaParam == 0 ||
      tipoCuentaParam == "ARS" ||
      tipoCuentaParam == undefined
        ? "ARS"
        : "USD",
  });

  const [transaction, setTransaction] = useState({
    amount: "",
    description: "Varios",
    cbu: send ? (cbuParam != 0 ? cbuParam : "") : "",
  });

  const [deposit, setDeposit] = useState({
    amount: "",
    description: "Varios",
    currencyType: "ARS",
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
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/");
    }
    const fetchAccounts = async () => {
      try {
        const response = await apiConfig.get("accounts/");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, [navigate]);

  useEffect(() => {
    if (transaction.cbu.length == 20) {
      buscarCuentaCbu();
      setCbuCompleto(true);
    }
  }, [transaction.cbu || deposit.currencyType]);

  const buscarCuentaCbu = async () => {
    setSnackbarVisibility(false);
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
      setSnackbarVisibility(true);
      setSnackbar({
        status: "error",
        message: e.response.data.Mensaje,
      });
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
    setSnackbarVisibility(false);
    setMostrarAlertaMovimiento(false);
    if (send == true) {
      if (tipoCuenta.currency == "ARS") {
        try {
          await apiConfig.post("/transactions/sendArs", {
            amount: transaction.amount,
            description: transaction.description,
            cbu: transaction.cbu,
          });
          setIsLoading(true);
          setLoadingScreen({
            message: "Realizando Transferencia",
            duration: 3000,
          });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        } catch (e) {
          setSnackbar({
            status: "error",
            message: e.response.data.Mensaje,
          });
          setSnackbarVisibility(true);
        }
      } else {
        try {
            await apiConfig.post("/transactions/sendUsd", {
            amount: transaction.amount,
            description: transaction.description,
            cbu: transaction.cbu,
          });
          setIsLoading(true);
          setLoadingScreen({
            message: "Realizando Transferencia ",
            duration: 3000,
          });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
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
      setIsLoading(false);
      try {
        await apiConfig.post("/transactions/deposit", {
          amount: deposit.amount,
          description: deposit.description,
          currencyType: tipoCuenta.currency,
        });
        setIsLoading(true);
        setLoadingScreen({
          message: "Realizando Deposito",
          duration: 3000,
        });
        setTimeout(() => {
          setDeposit({
            amount: "",
            description: "Varios",
          });
          navigate("/home");
        }, 3000);
      } catch (e) {
        console.log(e);
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
    if (campo === "cbu" && valor.length != 20 && valor != "") {
      setErrores((errores) => ({
        ...errores,
        cbu: "El CBU debe contener 20 digitos",
      }));
    }

    if (campo === "cbu" && (valor.length == 20 || valor === "")) {
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

  const textFieldStyle = {
    width: "90%",
    textAlign: "center",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#6655D9",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#505050",
      },
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6655D9",
    },
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: "red",
    },
    "& .MuiInputBase-input": {
      color: "black",
      "&:focus": {
        color: "black",
      },
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "red",
    },
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="70vh">
      <Card
        variant="elevation"
        elevation={10}
        sx={{
          width: "70%",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid
            item
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              background: "#6655D9",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                p: 2,
                color: " white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {send ? "Realizar Transferencia" : "Ingresar Dinero"}
            </Typography>
          </Grid>
          <Grid item size={12}>
            {send && cbuCompleto && cbuValido && (
              <Grid
                container
                sx={{
                  border: "1px solid #6655D9",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                  alignItems: "center",
                  width: "50%",
                  margin: "auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  marginBottom: "30px",
                  p: 2,
                  background: "#eee",
                }}
              >
                <Grid item size={4}>
                  <Grid container>
                    <Grid
                      item
                      size={12}
                      sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}
                    >
                      <Grid item size={6}>
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
                      <Grid item size={6}>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "19px", color: "#646cff" }}
                      >
                        {userChip.firstName + " " + userChip.lastName}
                      </Typography>
                    </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item size={8} sx={{pl:"50px"}}>
                  <Grid container>
                    <Grid item size={12}>
                      <Typography variant="p" sx={{fontSize:"17.5px"}}>
                        CBU: {transaction.cbu}
                      </Typography>
                    </Grid>
                    <Grid item size={12}>
                      <Typography variant="p">
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
                      const nuevoCbu = e.target.value.replace(/[^0-9]/g, "");
                      setTransaction({
                        ...transaction,
                        cbu: nuevoCbu,
                      });
                      setCbuCompleto(nuevoCbu.length === 20);
                    }}
                    onBlur={(e) => validarCampo("cbu", e.target.value)}
                    sx={textFieldStyle}
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
                        p: 2,
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
                          variant="p"
                          component="div"
                          sx={{ fontSize: "20px", color: "#646cff" }}
                        >
                          {userAuthenticated.firstName +
                            " " +
                            userAuthenticated.lastName}
                        </Typography>
                      </Grid>
                      <Grid item size={5}>
                        <Grid container>
                          <Grid item size={12}>
                            <Typography variant="p" sx={{fontSize:"17px"}}>
                              {"Balance: $" + obtenerCuenta(tipoCuenta.currency).balance}
                            </Typography>
                          </Grid>
                          <Grid item size={12}>
                            <Typography variant="p" sx={{fontSize:"17px"}}>
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
                  sx={textFieldStyle}
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
                  sx={textFieldStyle}
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
              : "Estas a punto de realizar un déposito"
          }
        />
      </Card>

      {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
    </Grid>
  );
}

SendMoney.propTypes = {
  send: PropTypes.bool.isRequired,
};
