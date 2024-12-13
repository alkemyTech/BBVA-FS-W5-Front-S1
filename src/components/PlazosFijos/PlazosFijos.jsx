import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { NumericFormat } from "react-number-format";
import { TextField, ToggleButton, ToggleButtonGroup, Button, LinearProgress, Box, Card, CardContent, Divider } from "@mui/material";
import { useState } from "react";
import apiConfig from "../../Config/axiosConfig";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";

export default function PlazosFijos() {
  const [plazoFijo, setPlazoFijo] = useState({
    amount: "",
    cantidadDias: "",
    interest: "",
    creationDate: "",
    closingDate: "",
    settled: "",
    interestEarned: "",
    finalAmount: ""
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

  let datosLlenos = plazoFijo.amount != "" && plazoFijo.cantidadDias != "";

  const cotizarPlazo = async () => {  

    setCotizando(true);

    setTimeout(() => {
      setCotizando(false);
      setCotizacionCompleta(true);
    }, 3000)

    try {
      const response = await apiConfig.post("fixedTerm/simulate", {
        amount: plazoFijo.amount,
        cantidadDias: plazoFijo.cantidadDias
      });
      
      setPlazoFijo((prevState) => ({
        ...prevState,
        ...response.data
      }));

    } catch (error) {

      console.log(error);
    }
  }

  const realizarInversion = async () => {

    try {
      await apiConfig.post("/fixedTerm", {
        amount: plazoFijo.amount,
        cantidadDias: plazoFijo.cantidadDias
      });
      
      setLoadingScreen({
        message: "Creando Plazo Fijo...",
        duration: "3000",
      });

      setIsLoading(true);
      
      setCotizacionCompleta(false);

      setTimeout(() => {
        setSnackbar({
          status:"success",
          message: "Plazo Fijo creado con éxito!"
        })
        setSnackbarVisibility(true);
      }, 3000)

    } catch (error) {

      console.log(error);
    }
  
    setPlazoFijo ({
      amount: "",
      cantidadDias: "",
      interest: "",
      creationDate: "",
      closingDate: "",
      settled: "",
      interestEarned: "",
      finalAmount: ""
    })
  }

  return (
    <Grid container flexDirection="row" sx={{ p: 4 }} spacing={4}>
      <Grid item size={12}>
        <Grid container justifyContent="center">
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#6655D9" }}
          >
            PLAZOS FIJOS
          </Typography>
        </Grid>
      </Grid>
      <Grid item size={12}>
        <Grid container flexDirection="row">
          <Grid item size={4}>
            <Grid container flexDirection="column" justifyContent="center" alignItems="center" spacing={5}>
              <Grid item>
                <Grid container flexDirection="column" spacing={2}>
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
                    sx={{ width: "50%" }}
                    disabled={cotizacionCompleta || cotizando}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Grid container flexDirection="column" spacing={2}>
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={4}>
           <Grid container justifyContent="center" flexDirection="column" spacing={4}>
             <Button variant="contained" disabled={!datosLlenos || cotizando || cotizacionCompleta} onClick={cotizarPlazo} sx={{backgroundColor:"#6655D9", cursor:"pointer"}}>Calcular Plazo</Button>
              {cotizando && (
                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", pt:5}}>
                  <img src="/assets/iconoPaginaVioleta.png" alt="" style={{height:"30px"}}/>
                  <LinearProgress color="secondary" sx={{width:"20%"}} />
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
                      <Typography variant="body1" color="#6655D9">{plazoFijo.cantidadDias}</Typography>
                    </Typography>
                    <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Monto invertido: 
                      <Typography variant="body1" color="#6655D9">${plazoFijo.amount}</Typography>
                    </Typography>
                    <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Interes: 
                      <Typography variant="body1" color="#6655D9">{plazoFijo.interest}</Typography>
                    </Typography>
                    <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Interes ganado 
                      <Typography variant="body1" color="#6655D9">${plazoFijo.interestEarned}</Typography>
                    </Typography>
                    <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Monto final: 
                      <Typography variant="body1" color="#6655D9">${plazoFijo.finalAmount}</Typography>
                    </Typography>
                    <Typography variant="p" color="black" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px"}}>- Fecha de cierre: 
                      <Typography variant="body1" color="#6655D9">{plazoFijo.closingDate}</Typography>
                    </Typography>
                    <Box sx={{display:"flex", flexDirection:"row", gap:"10px", alignItems:"center", justifyContent:"space-around", pt:1}}>
                      <Button variant="contained" size="small" onClick={()=> setCotizacionCompleta(false)} sx={{backgroundColor:"#6655D9", cursor:"pointer"}}>Cerrar cotización</Button>
                      <Button variant="contained" size="small" onClick={()=> realizarInversion()} sx={{backgroundColor:"#228B22", cursor:"pointer"}}>Realizar inversión</Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
