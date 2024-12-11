import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import ChairIcon from "@mui/icons-material/Chair";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LoginIcon from "@mui/icons-material/Login";
import { InputAdornment, IconButton, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Card, CardContent, TextField, Button, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { NumericFormat } from "react-number-format";

export default function SendMoney() {
  const [value, setValue] = useState(""); // Valor inicial como "0"
  const [tipoCuenta, setTipoCuenta] = useState("");
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    amount: "",
    currencyType: "",
    type: "",
    description: "",
    transactionDate: "",
    cuenta: "",
    titular: "",
    cuentaDestino: "",
  });

  const handleGoHome = () => {
    navigate("/home"); // Navegar a la ruta "/home"
  };

  const handleTipoCuentaChange = (event) => {
    setTipoCuenta(event.target.value);
  };

  const manejarTransferencia = async () => {
    let response;
    try {
      (response = await apiConfig.post("/transactions/sendArs")),
        {
          amount: transaction.amount,
          description: transaction.description,
          cuentaDestino: transaction.cuentaDestino,
        };
        alert("BOOOOCA")
    } catch (e) {
      console.log(e);
      setTransaction({
        amount: "",
        currencyType: "",
        type: "",
        description: "",
        transactionDate: "",
        cuenta: "",
        titular: "",
        cuentaDestino: "",
      });
      alert("No se pudo realizar la transaccion")
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        margin: 0,
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
            <Typography variant="h4" sx={{ p: 2 }}>
              Transferencia
            </Typography>
          </Grid>
          <Grid item size={12}>
            <Grid container justifyContent="space-between">
              <Grid item size={6}>
                <TextField
                  id="tipo-cuenta"
                  label="Tipo de cuenta"
                  select
                  sx={{ width: "50%" }}
                  value={tipoCuenta}
                  onChange={handleTipoCuentaChange}
                  variant="outlined"
                >
                  <MenuItem value="ARS">ARS</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </TextField>
              </Grid>
              <Grid item size={6}>
                <TextField
                  id=""
                  label="CBU"
                  value={transaction.cuentaDestino}
                  onChange={(e) =>
                    setTransaction({
                      ...transaction,
                      cuentaDestino: e.target.value,
                    })
                  }
                  sx={{ width: "50%" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={12}>
            <Chip
              avatar={
                <Avatar
                  sx={{
                    backgroundColor: "#646cff",
                    color: "#ffffff !important",
                    fontWeight: "bold",
                    fontSize: "23px",
                  }}
                >
                  LT
                </Avatar>
              }
              label="Lucca Trovato"
              variant="outlined"
              sx={{
                fontSize: "30px",
                color: "#646cff",
                borderColor: "#646cff",
                "&:hover": {
                  backgroundColor: "#f3eaff",
                },
              }}
            />
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
            {console.log(transaction.amount)}
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
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  onClick={handleGoHome}
                  sx={{
                    cursor: "pointer",
                    color: "#646cff",
                    fontSize: "30px",
                    fontWeight: "bold",
                    margin: 2,
                  }}
                >
                  ← Volver
                </Typography>
              </Grid>
              <Grid item>
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
                  Continuar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
