import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { NumericFormat } from "react-number-format";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  LinearProgress,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useState} from "react";
import apiConfig from "../../Config/axiosConfig";
import {formatearFechaPrestamo, sumarMeses } from "../../utils/helpers";

export default function Prestamos() {
  const [prestamo, setPrestamo] = useState({
    montoInvertido: 0,
    plazo: 0,
    interesMensual: "",
    cuotaMensual: "",
    fechaDeCierre: "",
    totalADevolver: "",
  });

  const fechaActual = new Date ();

  const [cotizando, setCotizando] = useState(false);

  const [cotizacionCompleta, setCotizacionCompleta] = useState(false);

  const [errores, setErrores] = useState({});

  const presenciaDeErrores = Object.values(errores).some(
    (valor) => valor != null
  );

  const validarCampo = (campo, valor) => {

    if (campo === "montoInvertido") {

      const montoAInvertir = parseFloat(
        valor.replace(/\./g, "").replace(",", ".")
      );

      if (montoAInvertir < 10000 || montoAInvertir > 10000000 ) {
        setErrores((errores) => ({
          ...errores,
          montoInvertido:
            "El monto a invertir no puede estar vacío y debe estar entre los $10.000 y 10.000.000",
        }));
      } else {
        setErrores((errores) => ({
          ...errores,
          montoInvertido: null,
        }));
      }
    }
  }

  const datosCompletos = (objeto, atributos) => {
    return atributos.every(
      (clave) => objeto[clave] !== null && objeto[clave] !== undefined && objeto[clave] !== ""
    );
  };

  const cotizarPrestamo = async () => {

    setCotizando(true);

    setTimeout(() => {
      setCotizando(false);
      setCotizacionCompleta(true);
    }, 3000);

    try {
      const response = await apiConfig.post("loan/simulate", {
        monto: prestamo.montoInvertido,
        plazo: prestamo.plazo
      })

        setPrestamo({
            montoInvertido: response.data.monto,
            plazo: response.data.plazo,
            interesMensual: response.data.interes,
            cuotaMensual: response.data.cuotaMensual,
            fechaDeCierre: formatearFechaPrestamo(sumarMeses(fechaActual, prestamo.plazo)),
            totalADevolver: response.data.total
        })

      console.log(prestamo)

    } catch (error) {
      console.log(error);
    }
  };

  const textFieldStyle = {
    width: "50%",
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
    <Grid container flexDirection="row" sx={{ p: 3 }} spacing={3}>
      <Grid item size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>
          CALCULAR PRÉSTAMO
        </Typography>
      </Grid>
      <Grid item size={6}></Grid>
      <Grid item size={6} sx={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
        <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
          Ingresá el monto que te gustaría invertir en el Préstamo:
        </Typography>
        <NumericFormat
          thousandSeparator="."
          customInput={TextField}
          label="Monto"
          name="montoInvertido"
          value={prestamo.montoInvertido}
          error={Boolean(errores.montoInvertido)}
          helperText={errores.montoInvertido}
          decimalSeparator=","
          decimalScale={0}
          fixedDecimalScale
          allowNegative={false}
          displayType="input"
          onValueChange={(values) => {
            const { value } = values;
            setPrestamo({ ...prestamo, montoInvertido: value });
          }}
          onBlur={(e) => validarCampo("montoInvertido", e.target.value)}
          size="small"
          sx={textFieldStyle}
          disabled={cotizacionCompleta || cotizando} />
        <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
          Ingresá el plazo del Préstamo:
        </Typography>
        <ToggleButtonGroup
          value={prestamo.plazo}
          exclusive
          onChange={(e) =>
            setPrestamo({
              ...prestamo,
              plazo: e.target.value,
            })
          }
          sx={{ gap: "10px" }}
          disabled={cotizacionCompleta || cotizando}
        >
          <ToggleButton
            value={12}
            sx={{
              backgroundColor:
                prestamo.plazo == "12"
                  ? "#6655D9"
                  : "#A599F2",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor:
                  prestamo.plazo == "12"
                    ? "#6655D9"
                    : "#A599F2",
              },
            }}
          >
            12 meses
          </ToggleButton>
          <ToggleButton
            value={24}
            sx={{
              backgroundColor:
                prestamo.plazo == "24"
                  ? "#6655D9"
                  : "#A599F2",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor:
                  prestamo.plazo == "24"
                    ? "#6655D9"
                    : "#A599F2",
              },
            }}
          >
            24 meses
          </ToggleButton>
          <ToggleButton
            value={36}
            sx={{
              backgroundColor:
              prestamo.plazo == "36"
                  ? "#6655D9"
                  : "#A599F2",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor:
                  prestamo.plazo == "36"
                    ? "#6655D9"
                    : "#A599F2",
              },
            }}
          >
            36 meses
          </ToggleButton>
        </ToggleButtonGroup>
        {(datosCompletos(prestamo, ["montoInvertido", "plazo"]) && !presenciaDeErrores) && (
          <Card variant="elevation" elevation={2} sx={{ width: "75%" }}>
            <CardContent sx={{ color: "gray", display: "flex", flexDirection: "column", gap: "5px" }}>
              <Typography variant="p" color="gray">
                Fecha de vencimiento del Préstamo:
              </Typography>
              <Typography variant="p" color="#6655D9">
                {formatearFechaPrestamo(sumarMeses(fechaActual, prestamo.plazo))}
              </Typography>
            </CardContent>
          </Card>
        )}
        <Button variant="contained" disabled={presenciaDeErrores || !datosCompletos(prestamo, ["montoInvertido", "plazo"]) || cotizando || cotizacionCompleta} 
         sx={{ backgroundColor: "#6655D9", cursor: "pointer", width: "60%" }} onClick={cotizarPrestamo}>Calcular Prestamo</Button>
      </Grid>
      <Grid item size={6} sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
      {cotizando && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px"}}>
            <img src="/assets/iconoPaginaVioleta.png" alt="" style={{ height: "80px" }} />
            <LinearProgress color="secondary" sx={{ width: "100%" }} />
            <Typography variant="h6" color="initial" sx={{ fontWeight: "bold" }}>Calculando Préstamo...</Typography>
          </Box>
        )}
        {cotizacionCompleta && (
          <Card variant="elevation" elevation={20} sx={{ width: "75%" }}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h7" color="#6655D9" fontWeight="bold">COTIZACIÓN DEL PRÉSTAMO</Typography>
            </CardContent>
            <Divider />
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Monto invertido:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">${prestamo.montoInvertido}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Plazo:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">{prestamo.plazo} meses</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Fecha de Vencimiento:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">{prestamo.fechaDeCierre}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Interes:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">5%</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Cuota mensual:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">${prestamo.cuotaMensual}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Total a devolver:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">${prestamo.totalADevolver}</Typography>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", justifyContent: "space-around", pt: 1 }}>
                <Button variant="contained" size="small" onClick={() => setCotizacionCompleta(false)} sx={{
                  backgroundColor: "#6655D9", cursor: "pointer",
                  fontWeight: "bold"
                }}>Cerrar cotización</Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}










