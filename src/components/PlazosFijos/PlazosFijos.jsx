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

  const [cotizando, setCotizando] = useState(false);

  const [cotizacionCompleta, setCotizacionCompleta] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
  const handleRowClick = (fixedTermId)=>{
    navigate(`/fixedTerm/${fixedTermId}`);
  } 

  const datosLlenos = plazoFijo.amount != "" && plazoFijo.cantidadDias != "";

  const fechaActual = new Date ();

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
        setSnackbarVisibility(true);
      }, 3000);
    } catch (error) {
      console.log(error);
    }

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
  };

  useEffect(() => {
    const fetchFixedTermDeposits = async () => {
        try {
            const response = await apiConfig.get(`/fixedTerm?page=${page - 1}&size=${itemsPerPage}`);  // Parámetro page y size
            
            const sortedFixedTerms = response.data.content
            .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
            setFixedTerms(sortedFixedTerms);
            setTotalPages(response.data.totalPages); 
        } catch (error) {
            console.error('Error fetching fixedTerms:', error);
        }
    };
    fetchFixedTermDeposits();
}, [page]);

  return (
    <Grid container flexDirection="row" sx={{ p: 3 }} spacing={4}>
      <Grid item size={7} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>
          CALCULAR PLAZO FIJO
        </Typography>
      </Grid>
      <Grid item size={5} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>
          TUS PLAZOS FIJOS
        </Typography>
      </Grid>
      <Grid item size={3} sx={{ display: "flex", flexDirection: "column", gap:"18px" }}>
        <Typography variant="body1" color="initial">
          Ingresá cuanto te gustaría invertir:
        </Typography>
        <NumericFormat
          thousandSeparator="."
          customInput={TextField}
          label="Monto"
          decimalSeparator=","
          decimalScale={0}
          fixedDecimalScale
          allowNegative={false}
          displayType="input"
          onValueChange={(values) => {
            const { value } = values;
            setPlazoFijo({ ...plazoFijo, amount: value });
          }}
          size="small"
          sx={{ width: "75%" }}
          disabled={cotizacionCompleta || cotizando}
        />
         <Typography variant="body1" color="initial">
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
          {datosLlenos && (
            <Card variant="elevation" elevation={2} sx={{width:"75%"}}>
              <CardContent sx={{color:"gray", display:"flex", flexDirection:"column", gap:"5px"}}>
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
      </Grid>
      <Grid item size={4} sx={{ display: "flex", flexDirection: "column"}}>
        <Button variant="contained" disabled={!datosLlenos || cotizando || cotizacionCompleta} onClick={cotizarPlazo} 
        sx={{backgroundColor:"#6655D9", cursor:"pointer"}}>Calcular Plazo</Button>
        {cotizando && (
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"15px", pt:5}}>
            <img src="/assets/iconoPaginaVioleta.png" alt="" style={{height:"45px"}}/>
            <LinearProgress color="secondary" sx={{width:"40%"}} />
            <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>Calculando Plazo...</Typography>
          </Box>
        )}
        {cotizacionCompleta && (
        <Card variant="elevation" elevation={20}> 
          <CardContent sx={{display:"flex", justifyContent:"center"}}>
            <Typography variant="h7" color="#6655D9" fontWeight="bold">COTIZACIÓN DEL PLAZO FIJO</Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Cantidad de días del Plazo: 
              <Typography variant="body1" color="#6655D9" fontWeight="bold">{plazoFijo.cantidadDias}</Typography>
            </Typography>
            <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Monto invertido: 
              <Typography variant="body1" color="#6655D9" fontWeight="bold">${plazoFijo.amount}</Typography>
            </Typography>
            <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Interes: 
              <Typography variant="body1" color="#6655D9" fontWeight="bold">{plazoFijo.interest}</Typography>
            </Typography>
            <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Interes ganado 
              <Typography variant="body1" color="#6655D9" fontWeight="bold">${plazoFijo.interestEarned}</Typography>
            </Typography>
            <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Monto final: 
              <Typography variant="body1" color="#6655D9" fontWeight="bold">${plazoFijo.finalAmount}</Typography>
            </Typography>
            <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Fecha de cierre: 
              <Typography variant="body1" color="#6655D9" fontWeight="bold">{plazoFijo.closingDate}</Typography>
            </Typography>
            <Box sx={{display:"flex", flexDirection:"row", gap:"10px", alignItems:"center", justifyContent:"space-around", pt:1}}>
              <Button variant="contained" size="small" onClick={()=> setCotizacionCompleta(false)} sx={{backgroundColor:"#6655D9", cursor:"pointer", 
                fontWeight:"bold"}}>Cerrar cotización</Button>
              <Button variant="contained" size="small" onClick={()=> realizarInversion()} sx={{backgroundColor:"#228B22", cursor:"pointer", 
                fontWeight:"bold"}}>Realizar inversión</Button>
            </Box>
          </CardContent>
        </Card>
        )}
      </Grid>
      <Grid item size={5}>
        <Card variant="elevation" elevation={5}>
          <CardContent sx={{ background: "#6655D9" }}>
              <Typography variant='h6' color="white" sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                  <CurrencyExchangeIcon sx={{ fontSize: "25px", color: "orange" }} />
                  Plazos Fijos
              </Typography>
          </CardContent>
          <CardContent>
          {fixedTerms.length > 0 ? (
          <>
          <TableContainer component={Paper}>
              <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Monto invertido</TableCell>
                        <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Fecha de Creación</TableCell>
                        <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Fecha de Vencimiento</TableCell>
                        <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fixedTerms.map((fixedTerm) => (
                        <TableRow 
                          key={fixedTerm.id}
                          sx={{cursor:"pointer"}}
                          onClick={()=>handleRowClick(fixedTerm.id)}
                        >
                          <TableCell sx={{textAlign:"center", color:"green", fontWeight:"bold"}}>
                            ${fixedTerm.amount}
                          </TableCell>

                          <TableCell sx={{textAlign:"center", color:"gray", fontWeight:"bold"}}>
                            {formatearFecha(fixedTerm.creationDate)}
                          </TableCell>
                          
                          <TableCell sx={{textAlign:"center", color:"gray", fontWeight:"bold"}}>
                            {formatearFecha(fixedTerm.closingDate)}
                          </TableCell>
                          
                          <TableCell sx={{textAlign:"center", color: fixedTerm.settled == 0 ? "red" : "#6655D9", fontWeight:"bold"}}>
                            {fixedTerm.settled == 0 ? "En progreso..." : "Liquidado"}
                          </TableCell>
                                                           
                        </TableRow>
                      ))}
                    </TableBody>
              </Table>
          </TableContainer>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            />
          </>
          ) :
            <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes Plazos Fijos</Typography>
          }
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
