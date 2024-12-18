import Grid from "@mui/material/Grid2";
import { Typography, Button, TextField, LinearProgress, Box, Avatar, Card, CardContent, Pagination, Table, TableHead, TableRow, TableCell, 
    TableBody, TableContainer, Paper} from '@mui/material/'
import { useState, useEffect } from "react";
import apiConfig from "../../Config/axiosConfig";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import {obtenerIniciales } from "../../utils/helpers";
import { useNavigate } from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';

export default function Favoritos() {
    
    const [usuarioFavorito, setUsuarioFavorito] = useState({
        firstName: "",
        lastName: "",
        email: "",
        cuentUsd: "",
        cuentaArs: ""
    })

    const [snackbar, setSnackbar] = useState({
        status: "",
        message: "",
      });
    const [snackbarVisibility, setSnackbarVisibility] = useState(false);

    const [loadingScreen, setLoadingScreen] = useState({
        message: "",
        duration: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const [buscandoUsuario, setBuscandoUsuario] = useState(false);

    const[mostrarDatosUsuario, setMostrarDatosUsuario] = useState(false);

    const [errores, setErrores] = useState({});

    const [cargaFinalizada, setCargaFinalizada] = useState(false);

    const [favoritos, setFavoritos] = useState([]);
    
    const [totalPages, setTotalPages] = useState(0);

    const presenciaDeErrores = Object.values(errores).some(
        (valor) => valor != null
    );

    const navigate = useNavigate();
    const handleRowClick = (fixedTermId)=>{
        navigate(`/fixedTerm/${fixedTermId}`);
    }
    
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    }; 

    const validarCampo = (campo, valor) => {
        
        const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

        if (campo === "email" && !patronEmail.test(valor) && valor != "") {
          setErrores((errores) => ({
            ...errores,
            email: "El formato del email no es válido.",
          }));
        } 
    
        if(campo === "email" && (patronEmail.test(valor) || valor === "")) {
          setErrores((errores) => ({
            ...errores,
            email: null,
          }));
        }
    }

    const buscarUsuario = async () => {    
        setSnackbarVisibility(false);
        try {    
            const response = await apiConfig.get(`/users/favUser/${usuarioFavorito.email}`);    
            setUsuarioFavorito({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                cuentaUsd: response.data.cuentaUsd,
                cuentaArs: response.data.cuentaArs
            })
            setBuscandoUsuario(true);
            setTimeout(() => {
                setMostrarDatosUsuario(true);
                setBuscandoUsuario(false);
            }, 3000);
        } catch (error) {
            setSnackbar({
                status: "error",
                message: error.response.data.Mensaje,
            })
            setSnackbarVisibility(true);
        }
    };

    const agregarUsuarioFavorito = async () => {
        setCargaFinalizada(false);
        setMostrarDatosUsuario(false);    
        try {    
            const response = await apiConfig.post(`/users/favList/${usuarioFavorito.email}`);    
            setUsuarioFavorito({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                cuentaUsd: response.data.cuentaUsd,
                cuentaArs: response.data.cuentaArs
            })
            setLoadingScreen({
                message:"Agregando usuario a Favoritos...",
                duration:3000
            })
            setIsLoading(true);
            setSnackbar({
                status:"success",
                message:"Usuario agregado a favoritos con éxito!"
            })
            setTimeout(() => {
                setCargaFinalizada(true);
                setSnackbarVisibility(true);
                setIsLoading(false);
            }, 3000);
        } catch (error) {
            console.log(error);
            setSnackbar({
                status: "error",
                message: error.response.data.Mensaje,
            })
            setSnackbarVisibility(true);
        }

        setUsuarioFavorito({
            firstName: "",
            lastName: "",
            email: "",
            cuentaUsd: "",
            cuentaArs: ""
        })
    };

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const response = await apiConfig.get(`/users/favList?page=${page - 1}&size=${itemsPerPage}`);
                setFavoritos(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log(response.data.content); 
            } catch (error) {
                console.error('Error fetching fixedTerms:', error);
            }
        };
        fetchFavoritos();
    }, [page, cargaFinalizada]);

    const textFieldStyle = {
        width: "60%",
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
    
    <Grid container spacing={2} sx={{p:5}}>
        <Grid item size={5} sx={{textAlign:"center"}}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>AGREGAR UN NUEVO USUARIO FAVORITO</Typography>
        </Grid>
        <Grid item size={7} sx={{textAlign:"center"}}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>MIS FAVORITOS</Typography>
        </Grid>
        <Grid item size={5} sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px"}}>
            <label htmlFor="">Ingrese el correo electronico del usuario que desea agregar como favorito:</label>
            <TextField
                name="email"
                label="E-mail"
                value={usuarioFavorito.email}
                error={Boolean(errores.email)}
                helperText={errores.email}
                onChange={(e)=>{
                    setUsuarioFavorito({
                        ...usuarioFavorito,   
                        email: e.target.value
                    })
                }}
                size="small"
                onBlur={(e) => validarCampo("email", e.target.value)}
                sx={textFieldStyle}
                disabled={buscandoUsuario || mostrarDatosUsuario}
            />
            <Button variant="contained" disabled={usuarioFavorito.email == "" || presenciaDeErrores || buscandoUsuario || mostrarDatosUsuario} 
                sx={{fontWeight:"bold", backgroundColor:"#6655D9", width:"40%"}} onClick={() => buscarUsuario()}>
                Buscar usuario
            </Button>
            {buscandoUsuario &&(
                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:"15px", pt:2}}>
                    <img src="/assets/iconoPaginaVioleta.png" alt="" style={{height:"45px"}}/>
                    <LinearProgress color="secondary" sx={{width:"100%"}} />
                    <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>Buscando Usuario...</Typography>
                </Box>
            )}
            {mostrarDatosUsuario && (
                <Card variant="elevation" elevation={15} sx={{width:"80%", borderRadius:"10px"}}>
                    <Grid container spacing={1} flexDirection="row" sx={{borderBottom:"solid 2px #6655D9"}}>
                        <Grid item size={2} sx={{display:"flex", justifyContent:"center", alignItems:"center" , borderRight:"solid 2px #6655D9"}}>
                            <Avatar sx={{backgroundColor:"#6655D9"}}>{obtenerIniciales(usuarioFavorito.firstName + " " + usuarioFavorito.lastName)}</Avatar>
                        </Grid>
                        <Grid item size={10}>
                            <Grid container spacing={1} flexDirection="column" sx={{p:3}}>
                                <Grid item size={12} sx={{display:"flex", flexDirection:"row", gap:"5px"}}>
                                    <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>
                                        . Nombre completo: 
                                    </Typography>
                                    <Typography variant="p" color="#A599F2" sx={{fontWeight:"bold"}}>
                                        {usuarioFavorito.firstName + " " + usuarioFavorito.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item size={12} sx={{display:"flex", flexDirection:"row", gap:"5px"}}>
                                    <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>
                                        . Email:
                                    </Typography>
                                    <Typography variant="p" color="#A599F2" sx={{fontWeight:"bold"}}>
                                        {usuarioFavorito.email}
                                    </Typography>
                                </Grid>
                                <Grid item size={12} sx={{display:"flex", flexDirection:"row", gap:"5px"}}>
                                    <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>
                                        . CBU cuenta ARS: 
                                    </Typography>
                                    <Typography variant="p" color="#00aae4" sx={{fontWeight:"bold"}}>
                                        {usuarioFavorito.cuentaArs}
                                    </Typography>
                                </Grid>
                                <Grid item size={12} sx={{display:"flex", flexDirection:"row", gap:"5px"}}>
                                    <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>
                                        . CBU cuenta USD: 
                                    </Typography>
                                    <Typography variant="p" color= {usuarioFavorito.cuentaUsd != null ? "#228B22" : "black"} sx={{fontWeight:"bold"}}>
                                        {usuarioFavorito.cuentaUsd == null ? "No tiene cuenta en USD" :  usuarioFavorito.cuentaUsd}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" sx={{p:3}}>
                        <Grid item size={12} sx={{display:"flex", justifyContent:"center", gap:"30px"}}>
                            <Button variant="contained" size="small" sx={{fontWeight:"bold", backgroundColor:"#8B0000"}} onClick={()=> setMostrarDatosUsuario(false)}>Cancelar</Button>
                            <Button variant="contained" size="small" sx={{fontWeight:"bold", backgroundColor:"#008000"}} onClick={()=> agregarUsuarioFavorito()}>Agregar a Favoritos</Button>
                        </Grid>
                    </Grid>
                </Card>
            )}
        </Grid>
        <Grid item size={7}>
            <Card variant="elevation" elevation={5} sx={{ height: "100%" }}>
                <CardContent sx={{background: "#6655D9", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography variant='h6' color="#e8e8e8" sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                        <GradeIcon sx={{ fontSize: "25px", color: "gold" }}/>
                        Mis favoritos
                    </Typography>
                </CardContent>
                <CardContent>
                {favoritos.length > 0 ? (
                    <>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Nombre</TableCell>
                                    <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Email</TableCell>
                                    <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>CBU cuenta ARS</TableCell>
                                    <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>CBU cuenta USD</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favoritos.map((favorito) => (
                                    <TableRow key={favorito.id} sx={{cursor:"pointer"}} onClick={()=>handleRowClick(favorito.id)}>
                                        <TableCell align="center" sx={{color:"black", verticalAlign:"top"}}>
                                            {favorito.firstName + "\n"}
                                            {favorito.lastName}
                                        </TableCell>
                                        <TableCell align="center" sx={{color:"black", verticalAlign:"top"}}>
                                            {favorito.email}
                                        </TableCell>
                                        <TableCell align="center" sx={{color:"black", verticalAlign:"top"}}>
                                            {favorito.cuentaArs}
                                            <Button size="small" variant="contained" sx={{fontWeight:"bold", backgroundColor:"#00aae4", m:1}}>Transferir</Button>
                                        </TableCell>
                                        <TableCell align="center" sx={{color:"black", verticalAlign:"top"}}>
                                            {favorito.cuentaUsd != null ? favorito.cuentaUsd : "No tiene"}
                                            {favorito.cuentaUsd != null && (
                                                <Button size="small" variant="contained" sx={{fontWeight:"bold", backgroundColor:"#228B22", m:1}}>Transferir</Button>
                                            )}
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
                    <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes Favoritos</Typography>
                }
                </CardContent>
            </Card>
        </Grid>
        {snackbarVisibility && (
            <GenericSnackbar
                status={snackbar.status}
                message={snackbar.message}
                visibility={snackbarVisibility}
            />
        )}
        {isLoading && (
            <LoadingScreen
                message={loadingScreen.message}
                duration={loadingScreen.duration}
            />
        )}
    </Grid>
  )
}
