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
  Pagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import apiConfig from "../../Config/axiosConfig";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function PlazosFijos() {
  const [plazoFijo, setPlazoFijo] = useState({
    amount: "",
    cantidadDias: "",
    interest: "",
    creationDate: "",
    closingDate: "",
    settled: "",
    interestEarned: "",
    finalAmount: "",
  });

  const [totals, setTotals] = useState({
    totalInvertido: 0,
    totalInteres: 0,
    totalGeneral: 0,
  });

  const [cotizando, setCotizando] = useState(false);
  const [cotizacionCompleta, setCotizacionCompleta] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cargaFinalizada, setCargaFinalizada] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });
  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const navigate = useNavigate();
  const [fixedTerms, setFixedTerms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowClick = (fixedTermId) => {
    navigate(`/fixedTerm/${fixedTermId}`);
  }

  const [errores, setErrores] = useState({});

  const presenciaDeErrores = Object.values(errores).some(
    (valor) => valor != null
  );

  const validarCampo = (campo, valor) => {

    if (campo === "monto") {

      const montoAInvertir = parseFloat(
        valor.replace(/\./g, "").replace(",", ".")
      );

      if (montoAInvertir < 1000) {
        setErrores((errores) => ({
          ...errores,
          monto:
            "El monto a invertir no puede estar vacío y debe ser mayor o igual a 1000.",
        }));
      } else {
        setErrores((errores) => ({
          ...errores,
          monto: null,
        }));
      }
    }
  }

  const calcularDatosTabla = (fixedTerms) => {
    const porcentaje = 2; 

    return fixedTerms.map((fixedTerm) => {
      const interes = fixedTerm.amount * (porcentaje / 100);
      const montoConInteres = fixedTerm.amount + interes;

      return {
        ...fixedTerm,
        interes,
        montoConInteres,
      };
    });
  };

  const fixedTermsWithData = calcularDatosTabla(fixedTerms);


  const datosCompletos = (objeto, atributos) => {
    return atributos.every(
      (clave) => objeto[clave] !== null && objeto[clave] !== undefined && objeto[clave] !== ""
    );
  };

  const fechaActual = new Date();

  const formatearFecha = (fechaOriginal) => {

    const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm:ss", {
      locale: es,
    }).toUpperCase();

    return fechaFormateada;
  };

  const cotizarPlazo = async () => {
    setCotizando(true);

    setTimeout(() => {
      setCotizando(false);
      setCotizacionCompleta(true);
    }, 3000);

    try {
      const response = await apiConfig.post("fixedTerm/simulate", {
        amount: plazoFijo.amount,
        cantidadDias: plazoFijo.cantidadDias,
      });

      setPlazoFijo((prevState) => ({
        ...prevState,
        ...response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const realizarInversion = async () => {
    setSnackbarVisibility(false);
    setCargaFinalizada(false);
    setIsLoading(false);
    try {
      await apiConfig.post("/fixedTerm", {
        amount: plazoFijo.amount,
        cantidadDias: plazoFijo.cantidadDias,
      });

      setLoadingScreen({
        message: "Creando Plazo Fijo...",
        duration: "3000",
      });

      setIsLoading(true);
      setCotizacionCompleta(false);

      setTimeout(() => {
        setSnackbar({
          status: "success",
          message: "Plazo Fijo creado con éxito!",
        });
        setCargaFinalizada(true);
        setSnackbarVisibility(true);     
      }, 3000);

      setPlazoFijo({
        amount: "",
        cantidadDias: "",
        interest: "",
        creationDate: "",
        closingDate: "",
        settled: "",
        interestEarned: "",
        finalAmount: "",
      });
    } catch (error) {
      console.log(error)
      setSnackbar({
        status: "error",
        message: "No tenes el balance suficiente para poder crear el Plazo Fijo!",
      });
      setCotizacionCompleta(false);
      setSnackbarVisibility(true);
    }
  };

  useEffect(() => {
    const fetchFixedTermDeposits = async () => {
      try {
        const response = await apiConfig.get(`/fixedTerm?page=${page - 1}&size=${itemsPerPage}`);
        const sortedFixedTerms = response.data.content
          .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        setFixedTerms(sortedFixedTerms);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching fixedTerms:', error);
      }
    };

    const fetchTotals = async () => {
      try {
        const response = await apiConfig.get("/fixedTerm/totals");
        if (response.data) {
          setTotals({
            totalInvertido: response.data.totalInvertido,
            totalInteres: response.data.interesAcumulado,
            totalGeneral: response.data.totalGeneral,
          });
        } else {
          console.error("La respuesta no contiene datos válidos");
        }
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
    fetchFixedTermDeposits();

    const fetchFixedTermDepositsInterval = setInterval(fetchFixedTermDeposits, 10000); 
    return () => {
      clearInterval(fetchFixedTermDepositsInterval);
    }; 

  }, [page, cargaFinalizada]);

  useEffect(() => {
    let token = localStorage.getItem("token");
      if (token == null) {
          navigate("/")
      }   
    }, [navigate]);

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
    <Grid container flexDirection="row" sx={{ p: 3 }} spacing={4}>
      <Grid item size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>
          CALCULAR PLAZO FIJO
        </Typography>
      </Grid>
      <Grid item size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>
          TUS PLAZOS FIJOS
        </Typography>
      </Grid>
      <Grid item size={6} sx={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
        <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
          Ingresá el monto que te gustaría invertir:
        </Typography>
        <NumericFormat
          thousandSeparator="."
          customInput={TextField}
          label="Monto"
          name="monto"
          value={plazoFijo.amount}
          error={Boolean(errores.monto)}
          helperText={errores.monto}
          decimalSeparator=","
          decimalScale={0}
          fixedDecimalScale
          allowNegative={false}
          displayType="input"
          onValueChange={(values) => {
            const { value } = values;
            setPlazoFijo({ ...plazoFijo, amount: value });
          }}
          onBlur={(e) => validarCampo("monto", e.target.value)}
          size="small"
          sx={textFieldStyle}
          disabled={cotizacionCompleta || cotizando} />
        <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
          Ingresá la cantidad de días:
        </Typography>
        <ToggleButtonGroup
          value={plazoFijo.cantidadDias}
          exclusive
          onChange={(e) =>
            setPlazoFijo({
              ...plazoFijo,
              cantidadDias: e.target.value,
            })
          }
          sx={{ gap: "10px" }}
          disabled={cotizacionCompleta || cotizando}
        >
          <ToggleButton
            value={30}
            sx={{
              backgroundColor:
                plazoFijo.cantidadDias == "30"
                  ? "#6655D9"
                  : "#A599F2",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor:
                  plazoFijo.cantidadDias == "30"
                    ? "#6655D9"
                    : "#A599F2",
              },
            }}
          >
            30 días
          </ToggleButton>
          <ToggleButton
            value={60}
            sx={{
              backgroundColor:
                plazoFijo.cantidadDias == "60"
                  ? "#6655D9"
                  : "#A599F2",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor:
                  plazoFijo.cantidadDias == "60"
                    ? "#6655D9"
                    : "#A599F2",
              },
            }}
          >
            60 días
          </ToggleButton>
          <ToggleButton
            value={90}
            sx={{
              backgroundColor:
                plazoFijo.cantidadDias == "90"
                  ? "#6655D9"
                  : "#A599F2",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor:
                  plazoFijo.cantidadDias == "90"
                    ? "#6655D9"
                    : "#A599F2",
              },
            }}
          >
            90 días
          </ToggleButton>
        </ToggleButtonGroup>
        {(datosCompletos(plazoFijo, ["amount", "cantidadDias"]) && !presenciaDeErrores) && (
          <Card variant="elevation" elevation={2} sx={{ width: "75%" }}>
            <CardContent sx={{ color: "gray", display: "flex", flexDirection: "column", gap: "5px" }}>
              <Typography variant="p" color="gray">
                Fecha de cierre estimada:
              </Typography>
              <Typography variant="p" color="#6655D9">
                {
                  plazoFijo.cantidadDias == 30 ? formatearFecha(new Date(fechaActual.getTime() + 1 * 60 * 1000)) :
                    plazoFijo.cantidadDias == 60 ? formatearFecha(new Date(fechaActual.getTime() + 2 * 60 * 1000)) :
                      formatearFecha(new Date(fechaActual.getTime() + 3 * 60 * 1000))
                }
              </Typography>
            </CardContent>
          </Card>
        )}
        <Button variant="contained" disabled={presenciaDeErrores || !datosCompletos(plazoFijo, ["amount", "cantidadDias"]) || cotizando || cotizacionCompleta} onClick={cotizarPlazo}
          sx={{ backgroundColor: "#6655D9", cursor: "pointer", width: "60%" }}>Calcular Plazo</Button>
        {cotizando && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", pt: 5 }}>
            <img src="/assets/iconoPaginaVioleta.png" alt="" style={{ height: "45px" }} />
            <LinearProgress color="secondary" sx={{ width: "40%" }} />
            <Typography variant="p" color="initial" sx={{ fontWeight: "bold" }}>Calculando Plazo...</Typography>
          </Box>
        )}
        {cotizacionCompleta && (
          <Card variant="elevation" elevation={20} sx={{ width: "75%" }}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h7" color="#6655D9" fontWeight="bold">COTIZACIÓN DEL PLAZO FIJO</Typography>
            </CardContent>
            <Divider />
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Cantidad de días del Plazo:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">{plazoFijo.cantidadDias}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Monto invertido:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">${plazoFijo.amount}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Interes:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">{plazoFijo.interest}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Interes ganado
                <Typography variant="body1" color="#6655D9" fontWeight="bold">${plazoFijo.interestEarned}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Monto final:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">${plazoFijo.finalAmount}</Typography>
              </Typography>
              <Typography variant="p" color="black" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>- Fecha de cierre:
                <Typography variant="body1" color="#6655D9" fontWeight="bold">{formatearFecha(plazoFijo.closingDate)}</Typography>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", justifyContent: "space-around", pt: 1 }}>
                <Button variant="contained" size="small" onClick={() => setCotizacionCompleta(false)} sx={{
                  backgroundColor: "#6655D9", cursor: "pointer",
                  fontWeight: "bold"
                }}>Cerrar cotización</Button>
                <Button variant="contained" size="small" onClick={() => realizarInversion()} sx={{
                  backgroundColor: "#228B22", cursor: "pointer",
                  fontWeight: "bold"
                }}>Realizar inversión</Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      <Grid item size={6}>
        <Card variant="elevation" elevation={5}>
          <CardContent sx={{ background: "#6655D9" }}>
            <Typography
              variant="h6"
              color="white"
              sx={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CurrencyExchangeIcon sx={{ fontSize: "25px", color: "orange" }} />
              Plazos Fijos
            </Typography>
          </CardContent>
          <CardContent>
            {fixedTerms.length > 0 ? (
              <>
                {/* Tabla de Totales */}
                  <TableContainer component={Paper}>
                    <Table aria-label="totals table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#6655D9" }}>
                            Total Invertido:{" "}
                            <span style={{ color: "green", fontWeight: "bold" }}>
                              ${totals.totalInvertido.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#6655D9" }}>
                            Total Interés:{" "}
                            <span style={{ color: "blue", fontWeight: "bold" }}>
                              ${totals.totalInteres.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#6655D9" }}>
                            Total General:{" "}
                            <span style={{ color: "blue", fontWeight: "bold" }}>
                              ${totals.totalGeneral.toFixed(2)}
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                {/* Tabla Principal */}
                <TableContainer component={Paper}>
                  <Table aria-label="main table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                          Monto invertido
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                          Fecha de Creación
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                          Fecha de Vencimiento
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                          Estado
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                          Interés Diario (2%)
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                          Importe con Interés
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fixedTermsWithData.map((fixedTerm) => (
                        <TableRow key={fixedTerm.id} sx={{ cursor: "pointer" }} onClick={() => handleRowClick(fixedTerm.id)}>
                          <TableCell sx={{ textAlign: "center", color: "green", fontWeight: "bold" }}>
                            ${fixedTerm.amount}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", color: "gray", fontWeight: "bold" }}>
                            {formatearFecha(fixedTerm.creationDate)}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", color: "gray", fontWeight: "bold" }}>
                            {formatearFecha(fixedTerm.closingDate)}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", color: fixedTerm.settled == 0 ? "red" : "#228B22", fontWeight: "bold" }}>
                            {fixedTerm.settled == 0 ? "En progreso..." : "Liquidado"}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
                            ${fixedTerm.interes.toFixed(2)}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
                            ${fixedTerm.montoConInteres.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Paginación */}
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                />
              </>
            ) : (
              <Typography
                variant="body1"
                color="grey"
                fontWeight="bold"
                sx={{ textAlign: "center" }}
              >
                Aún no tienes Plazos Fijos
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
      {snackbarVisibility && (
        <GenericSnackbar
          status={snackbar.status}
          message={snackbar.message}
          visibility={snackbarVisibility}
        />
      )}
    </Grid>
  );
}










