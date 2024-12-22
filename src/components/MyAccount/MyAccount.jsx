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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import AlertaDialog from "../UI/Dialogs/AlertaDialog";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import EditIcon from "@mui/icons-material/Edit";

export default function MyAccount() {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({});
    const [staticUserProfile, setStaticUserProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        creationDate: ""    
    });
    const [userUpdate, setUserUpdate] = useState({
        firstName: "",
        lastName: "",
        password: "",
    });

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [habilitarEdicion, setHabilitarEdicion] = useState(false);
    const [editando, setEditando] = useState(false)

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

    const abrirEdicion = () => {
        setHabilitarEdicion(true);
        setEditando(true);
    }

    const cerrarEdicion = () => {
        setHabilitarEdicion(false);
        setEditando(false);
        setUserUpdate({
            firstName: "",
            lastName: "",
            password: "",
        })
    }

    const changePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };

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
                setUserProfile(response.data);
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
    }, []);

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
                                                disabled={!habilitarEdicion}
                                                placeholder="Ingrese su nombre"
                                                value={userProfile.firstName}
                                                onChange={(e) =>
                                                    setUserProfile({ ...userProfile, firstName: e.target.value })
                                                }
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        backgroundColor: "#ebebeb", 
                                                    },
                                                    width:"100%"
                                                }}
                                            />
                                            <IconButton>
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
                                                disabled={!habilitarEdicion}
                                                placeholder="Ingrese su apellido"
                                                value={userProfile.lastName}
                                                onChange={(e) =>
                                                    setUserProfile({ ...userProfile, lastName: e.target.value })
                                                }
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        backgroundColor: "#ebebeb", 
                                                    },
                                                    width:"100%"
                                                }}
                                            />
                                            <IconButton>
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
                                                disabled={!habilitarEdicion}
                                                placeholder={habilitarEdicion ? "Nueva contraseña" : "*********"}
                                                value={userUpdate.password || ""}
                                                onChange={(e) =>
                                                    setUserUpdate({ ...userUpdate, password: e.target.value })
                                                }
                                                size="small"
                                                type={passwordVisibility ? "text" : "password"}
                                                sx={{
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        backgroundColor: "#ebebeb", 
                                                    },
                                                    width:"100%"
                                                }}
                                            />
                                            <IconButton>
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
        </Grid>
    );
}

