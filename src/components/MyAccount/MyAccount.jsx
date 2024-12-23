import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    TextField,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import { formatearFechaCompleta } from "../../utils/helpers";
import apiConfig from "../../Config/axiosConfig";
import { useNavigate } from "react-router-dom";
import AlertaDialog from "../UI/Dialogs/AlertaDialog";
import EditarDatosDePerfilDialog from "../UI/Dialogs/EditarDatosDePerfilDialog";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { updateUserAttribute } from "../../Redux/Slices/userAuthenticatedSlice";

export default function MyAccount() {
    const navigate = useNavigate()
    const [cargaFinalizada, setCargaFinalizada] = useState(false);
    const [staticUserProfile, setStaticUserProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        creationDate: ""    
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState({
        message: "",
        duration: null,
    });
    const [snackbar, setSnackbar] = useState({
        status: "",
        message: "",
    });
    const dispatch = useDispatch();
    const [snackbarVisibility, setSnackbarVisibility] = useState(false);


    const [datoAmodificar, setDatoAmodificar] = useState("");
    const [datoAnterior, setDatoAnterior] = useState("");
    const [mostrarDialogEdicion, setMostrarDialogEdicion] = useState(false);
    const abrirEdicion = (dato, datoAnterior) => {
        setDatoAmodificar(dato);
        setDatoAnterior(datoAnterior);
        setMostrarDialogEdicion(true);
    }
    const cerrarEdicion = () => {
        setMostrarDialogEdicion(false);
    }
    const handleEdit = (nuevaAsignacion) => {
        editUser(nuevaAsignacion);
        setMostrarDialogEdicion(false);
    }

    const [mostrarDialog, setMostrarDialog] = useState(false);
    const closeDialog = () => {
        setMostrarDialog(false);
    };
    const openDialog = () => {
        setMostrarDialog(true);
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token == null) {
            navigate("/")
        }   
        const fetchUserProfile = async () => {
            try {
                const response = await apiConfig.get("/users/userProfile");
                console.log("User Profile Response:", response.data);
                setStaticUserProfile({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    creationDate: formatearFechaCompleta(response.data.creationDate)
                });
            } catch (error) {
                console.error("Error fetching userProfile:", error);
            }
        };
        fetchUserProfile();
    }, [cargaFinalizada, navigate]);

    const desactivarUsuario = async () => {
        setMostrarDialog(false);
        setSnackbarVisibility(false);
        setIsLoading(false);
        try {
            const response = await apiConfig.delete("/users");
            console.log(response.data);
            setLoadingScreen({
                message:"Desactivando usuario",
                duration: 3000,
            })
            setIsLoading(true);
            setSnackbar({
                status:"success",
                message:"Has sido dado de baja con éxito."
            })
            setTimeout(() => {
                setSnackbarVisibility(true);
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const editUser = async (nuevaAsignacion) => {
        setSnackbarVisibility(false)
        setIsLoading(false)
        setCargaFinalizada(false)
        try {
            if (datoAmodificar == "Nombre") {
                await apiConfig.patch("/users/update/firstName", {
                    firstName: nuevaAsignacion
                });
                setLoadingScreen({
                    message: "Actualizando Nombre de Usuario",
                    duration: 3000,
                });
                setIsLoading(true);
                setTimeout(() => {
                    setSnackbar({
                        status: "success",
                        message: "¡Nombre de usuario actualizado con éxito!",
                    });
                    setSnackbarVisibility(true);
                    setCargaFinalizada(true);
                    dispatch(updateUserAttribute({key: "firstName", value: nuevaAsignacion}));
                }, 3000);
            } else if (datoAmodificar == "Apellido") {
                await apiConfig.patch("/users/update/lastName", {
                    lastName: nuevaAsignacion
                });
                setLoadingScreen({
                    message: "Actualizando Apellido",
                    duration: 3000,
                });
                setIsLoading(true);
                setTimeout(() => {
                    setSnackbar({
                        status: "success",
                        message: "¡Apellido actualizado con éxito!",
                    });
                    setSnackbarVisibility(true);
                    setCargaFinalizada(true);
                    dispatch(updateUserAttribute({key: "lastName", value: nuevaAsignacion}));
                }, 3000);
            } else {
                await apiConfig.patch("/users/update/password", {
                    password: nuevaAsignacion
                });
                setLoadingScreen({
                    message: "Actualizando Contraseña",
                    duration: 3000,
                });
                setIsLoading(true);
                setTimeout(() => {
                    setSnackbar({
                        status: "success",
                        message: "¡Contraseña actualizada con éxito!",
                    });
                    setSnackbarVisibility(true);
                    setCargaFinalizada(true);
                }, 3000);
            }
            } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid container sx={{p:3}} spacing={5} justifyContent={"center"}>
            <Grid item size={12}>
                <Typography variant="h5" color="#6655D9" sx={{fontWeight:"bold", textAlign:"center"}}>MI PERFIL</Typography>
            </Grid>
            {/* Columna izquierda */}
            <Grid item size={10}>
                <Grid container spacing={20}>
                    {/* Tarjeta de Perfil */}
                    <Grid item size={6}>
                        <Card variant="elevation" elevation={5} sx={{ height: "100%" }}>
                            <CardHeader
                                title={
                                    staticUserProfile.firstName + " " + staticUserProfile.lastName
                                }
                                sx={{
                                    backgroundColor: "#6655D9",
                                    color: "#ffffff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            />
                            <CardContent sx={{textAlign:"center", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                                <Avatar sx={{ width: 200, height: 200}}></Avatar>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                    Miembro desde: {staticUserProfile.creationDate}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ mt: 3 }}
                                    onClick={() => openDialog ()}
                                >   
                                    Desactivar cuenta
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* informacion de usuario*/}
                    <Grid item size={6}>
                        <Card
                            variant="elevation"
                            elevation={5}
                            sx={{
                                height: "100%",
                            }}
                        >
                            <CardHeader
                                title="Datos personales"
                                sx={{
                                    backgroundColor: "#6655D9",
                                    color: "#ffffff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                }}
                            />
                            <CardContent>
                                <Grid container spacing={2} sx={{ml:3}}>
                                    <Grid item size={12} sx={{textAlign:"center"}}>
                                        <Typography variant="body2" color="textSecondary" sx={{fontSize: "1.3rem" }}>
                                            {staticUserProfile.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item size={12} sx={{display:"flex", flexDirection:"column", justifyContent:"center", gap:"10px"}}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{fontWeight: "bold"}}
                                        >
                                            Nombre:
                                        </Typography>
                                        <Box sx={{display:"flex", alignItems:"center"}}>
                                            <TextField
                                                disabled="true"
                                                value={staticUserProfile.firstName}
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        backgroundColor: "#ebebeb", 
                                                    },
                                                    width:"100%"
                                                }}
                                            />
                                            <IconButton onClick={() => abrirEdicion("Nombre", staticUserProfile.firstName)}>
                                                <EditIcon sx={{width:"90%",mb:"4px", color:"#535bf2" }}/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item size={12} sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{fontWeight: "bold"}}
                                        >
                                            Apellido:
                                        </Typography>
                                        <Box sx={{display:"flex", alignItems:"center"}}>
                                            <TextField
                                                disabled="true"
                                                value={staticUserProfile.lastName}
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        backgroundColor: "#ebebeb", 
                                                    },
                                                    width:"100%"
                                                }}
                                            />
                                            <IconButton onClick={()=> abrirEdicion ("Apellido", staticUserProfile.lastName)}>
                                                <EditIcon sx={{width:"90%",mb:"4px", color:"#535bf2" }}/>
                                            </IconButton>
                                        </Box>     
                                    </Grid>
                                    <Grid item size={12} sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Contraseña:
                                        </Typography>
                                        <Box sx={{display:"flex", alignItems:"center"}}>
                                            <TextField
                                                disabled="true"
                                                value="*******************"
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        backgroundColor: "#ebebeb", 
                                                    },
                                                    width:"100%"
                                                }}
                                            />
                                            <IconButton onClick={()=> abrirEdicion("Contraseña", "")}>
                                                <EditIcon sx={{width:"90%",mb:"4px", color:"#535bf2" }}/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
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
            <AlertaDialog
                mostrarAlerta={mostrarDialog}
                accion={desactivarUsuario}
                closeAlerta={closeDialog}
                mensajeAlerta="Vas a darte de baja del sistema"
            />
            <EditarDatosDePerfilDialog
                mostrarDialogEditarDatosDePerfil={mostrarDialogEdicion}
                funcionEditar={handleEdit}
                cerrarDialogEditarDatosDePerfil={cerrarEdicion}
                datoAnterior={datoAnterior}
                datoAeditar={datoAmodificar}
            />
        </Grid>
    );
}

