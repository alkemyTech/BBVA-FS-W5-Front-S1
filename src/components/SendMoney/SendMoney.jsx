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
import apiConfig from "../../Config/axiosConfig";

export default function SendMoney({ send }) {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    cuentaDestino: "",
  });

  const handleGoHome = () => {
    navigate("/home"); // Navegar a la ruta "/home"
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
              {send ? "Transferencia" : "Deposito"}
            </Typography>
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
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        cuentaDestino: e.target.value,
                      })
                    }
                    sx={{ width: "50%" }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item size={12}>
            {send ? (
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
                    <div>LT</div>
                  </Avatar>
                }
                label="Lucca Trovato"
                variant="outlined"
                sx={{
                  fontSize: "20px",
                  color: "#646cff",
                  borderColor: "#646cff",
                  "&:hover": { backgroundColor: "#f3eaff" },
                  p: 3,
                }}
              />
            ) : (
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
                    LT
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
                      Lucca Trovato
                    </Typography>
                    <Typography variant="p" color="textSecondary">
                      CBU: 123411234512343213
                    </Typography>
                    <Typography variant="p" color="textSecondary">
                      Balance: $ 120.00,00
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
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
