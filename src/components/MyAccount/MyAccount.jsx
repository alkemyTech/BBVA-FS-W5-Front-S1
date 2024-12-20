import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    CardActions,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
} from "@mui/material";
import { formatearFechaCompleta } from "../../utils/helpers";
import apiConfig from "../../Config/axiosConfig";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { use } from "react";

export default function MyAccount() {
    const [userProfile, setUserProfile] = useState({});
    const [staticUserProfile, setStaticUserProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        creationDate: ""    
    });
    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [userUpdate, setUserUpdate] = useState({
        firstName: "",
        lastName: "",
        password: "",
    });
    const [transactionLimitUpdate, setTransactionLimitUpdate] = useState({
        transactionLimit: "",
    })
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [imagenLocalUrl, setImagenLocalUrl] = useState('');
    const [igmurImagenUrl, setIgmurImagenUrl] = useState('');


    const manejarCambioDeImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setImagenLocalUrl(reader.result); 
            setImagenSeleccionada(file);
        };
        reader.readAsDataURL(file); 
    }
  };
    
  const cargarImagen = async () => {
        
    const formData = new FormData();
    formData.append('image', imagenSeleccionada);

    try {
        const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            Authorization: 'Client-ID 78ace87ca84ed65', 
        },
    });
        
        setIgmurImagenUrl(response.data.data.link);
        console.log(igmurImagenUrl);
        
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

    const [habilitarEdicion, setHabilitarEdicion] = useState(false);
    const [editando, setEditando] = useState(false)
    const [habilitarEdicionTransaction, setHabilitarEdicionTransaction] = useState(false);
    const [editandoTransaction, setEditandoTransaction] = useState(false)


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
    
    const abrirEdicionTransaction = () => {
        setHabilitarEdicionTransaction(true);
        setEditandoTransaction(true);
    }

    const cerrarEdicionTransaction = () => {
        setHabilitarEdicionTransaction(false);
        setEditandoTransaction(false);
        setTransactionLimitUpdate({
            transactionLimit: "",
        })
    }

    const changePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };

    const [open, setOpen] = useState(false);
    const [openTransaction, setOpenTransaction] = useState(false);
    const [password, setPassword] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenTransaction = () => setOpenTransaction(true);
    const handleCloseTransaction = () => setOpenTransaction(false);

    const handleDeactivate = () => {
        handleDelete();
        console.log("Cuenta desactivada con la contraseña:", password);
        setOpen(false);
    };

    const handleDelete = () => {
        deleteAccount();
    };

    useEffect(() => {
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

    const deleteAccount = async () => {
        try {
            const response = await apiConfig.delete("/users");
            console.log(response.data); 
        } catch (error) {
            console.error("Falla al eliminar", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await apiConfig.get("/accounts/");
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);

    const updateUser = async () => {
        try {
            const response = await apiConfig.patch("/users/update", {
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                password: userUpdate.password,
            });

            console.log(response.data)

        } catch (error) {
            console.error("Error fetching fechUpdate:", error);
        }
        window.location.reload();
    };

    return (
        <Grid container sx={{ p: 5, pb: 5, pl: 2, pr: 2, alignItems: "start" }} spacing={5}>
            {/* Columna izquierda */}
            <Grid item size={6}>
                <Grid container spacing={3}>
                    {/* Tarjeta de Perfil */}
                    <Grid item size={6}>
                        <Card variant="elevation" elevation={5} sx={{ height: "100%" }}>
                            <CardHeader
                                title={
                                    staticUserProfile.firstName + " " + staticUserProfile.lastName
                                }
                                sx={{
                                    backgroundColor: "#6a0dad",
                                    color: "#ffffff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                }}
                            />
                            <CardContent sx={{textAlign:"center", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                                {imagenSeleccionada == null ? (
                                    <>
                                        <Input type="file" id="carga-de-archivo" style={{display:"none"}} onChange={manejarCambioDeImagen} />
                                        <Button id="carga-de-archivo" sx={{p:5, color:"gray"}} onClick={() => document.getElementById('carga-de-archivo').click()}>
                                            <AddAPhotoIcon sx={{fontSize:"80px"}} />
                                        </Button>
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                            Miembro desde: {staticUserProfile.creationDate}
                                        </Typography>
                                        
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{ mt: 3 }}
                                            onClick={handleOpen}
                                        >
                                            Desactivar cuenta
                                        </Button>
                                    </>
                                ) 
                                : 
                                (
                                    <>
                                        <Avatar src={imagenLocalUrl} sx={{ width: 200, height: 200}}></Avatar>
                                        <Button endIcon={<CloudUploadIcon />} variant="contained" sx={{width:"70%", m:2}} 
                                        onClick={() => cargarImagen ()}>Cargar imagen</Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Diálogo de confirmación */}
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Desactivar cuenta</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Por favor, ingresa tu contraseña para confirmar que deseas desactivar tu cuenta.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Contraseña"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleDeactivate}
                                    color="error"
                                    disabled={!password}
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                                title="Información del Usuario"
                                sx={{
                                    backgroundColor: "#6a0dad",
                                    color: "#ffffff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                }}
                            />
                            <CardContent sx={{ textAlign: "center", mt: 1 }}>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 3, fontSize: "1.3rem" }}>
                                    {staticUserProfile.email || "email@example.com"}
                                </Typography>
                                {/* Contenedor principal */}
                                <Grid container spacing={2}>

                                    {/* Nombre */}
                                    <Grid item size={4} sx={{ textAlign: "right", display: "flex", alignItems: "center" }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Nombre:
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8}>
                                        <TextField
                                            disabled={!habilitarEdicion}
                                            placeholder="Ingrese su nombre"
                                            value={userProfile.firstName}
                                            onChange={(e) =>
                                                setUserProfile({ ...userProfile, firstName: e.target.value })
                                            }
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root.Mui-disabled': {
                                                    backgroundColor: "#ebebeb", // Fondo del campo deshabilitado
                                                },
                                            }}
                                        />
                                    </Grid>

                                    {/* Apellido */}
                                    <Grid item size={4} sx={{ textAlign: "right", display: "flex", alignItems: "center" }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Apellido:
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8}>
                                        <TextField
                                            disabled={!habilitarEdicion}
                                            placeholder="Ingrese su apellido"
                                            value={userProfile.lastName}
                                            onChange={(e) =>
                                                setUserProfile({ ...userProfile, lastName: e.target.value })
                                            }
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root.Mui-disabled': {
                                                    backgroundColor: "#ebebeb", // Fondo del campo deshabilitado
                                                },
                                            }}
                                        />
                                    </Grid>

                                    {/* Contraseña */}
                                    <Grid item size={4} sx={{ textAlign: "right", display: "flex", alignItems: "center" }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: "bold",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Contraseña:
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8} sx={{ position: "relative" }}>
                                        <TextField
                                            disabled={!habilitarEdicion}
                                            placeholder={habilitarEdicion ? "Nueva contraseña" : "*********"}
                                            value={userUpdate.password || ""}
                                            onChange={(e) =>
                                                setUserUpdate({ ...userUpdate, password: e.target.value })
                                            }
                                            fullWidth
                                            type={passwordVisibility ? "text" : "password"}
                                            sx={{
                                                '& .MuiInputBase-root.Mui-disabled': {
                                                    backgroundColor: "#ebebeb", // Fondo del campo deshabilitado
                                                },
                                            }}
                                        />
                                        {habilitarEdicion && (
                                            <IconButton
                                                onClick={changePasswordVisibility}
                                                sx={{
                                                    position: "absolute",
                                                    right: "8px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    color: "#5F49D7",
                                                }}
                                            >
                                                {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                    padding: "16px",
                                }}
                            >
                                {!editando && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => abrirEdicion()}
                                    >
                                        Editar
                                    </Button>
                                )}
                                {habilitarEdicion && (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => updateUser()}
                                        >
                                            Confirmar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => cerrarEdicion()}
                                        >
                                            Cancelar
                                        </Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                {/* Tabla de Cuentas */}
                <Card variant="elevation" elevation={5} sx={{ mt: 3 }}>
                    <CardHeader
                        title="Cuentas"
                        sx={{
                            backgroundColor: "#6a0dad",
                            color: "#ffffff",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}
                    />
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Moneda
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Balance
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            CBU
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Límite de Transacción
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {accounts.map((account) => (
                                        <>
                                        <TableRow key={account.cbu}>
                                            <TableCell align="center">{account.currency || "N/A"}</TableCell>
                                            <TableCell align="center">${account.balance || "0.00"}</TableCell>
                                            <TableCell align="center">{account.cbu || "N/A"}</TableCell>
                                            <TableCell align="center">
                                                <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                    <Typography variant="body2" sx={{ m: "auto" }}>
                                                        ${account.transactionLimit || "Sin límite"}
                                                    </Typography>
                                                    <Button color="primary" sx={{ p: 0 }} onClick={() => handleOpenTransaction()} >
                                                        <EditIcon />
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <Dialog open={openTransaction} onClose={handleCloseTransaction}>
                                        <DialogTitle>Editar Limite de Transaccion</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Por favor, Ingrese el nuevo limite de transaccion!
                                            </DialogContentText>
                                            <NumericFormat
                                                    thousandSeparator="."
                                                    customInput={TextField}
                                                    label="Limite de Transaccion"
                                                    value={transactionLimitUpdate.transactionLimit}
                                                    onValueChange={(values) => {
                                                        const { value } = values;
                                                        setTransactionLimitUpdate({ ...transactionLimitUpdate, transactionLimit: value });
                                                        }}
                                                    decimalSeparator=","
                                                    decimalScale={0}
                                                    fixedDecimalScale
                                                    allowNegative={false}
                                                    displayType="input"
                                                    size="small"
                                                    />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseTransaction} color="primary">
                                                Cancelar
                                            </Button>
                                            <Button
                                                onClick={() => handleEdit(account.cbu)}
                                                color="error"
                                            >
                                                Confirmar
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    </>))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </CardContent>
                </Card>
                
                    
                
            </Grid>

            {/* Columna derecha */}
            <Grid item size={6}>
                {/* Contactos Agendados */}
                <Card variant="elevation" elevation={5}>
                    <CardHeader
                        title="Contactos Agendados"
                        sx={{
                            backgroundColor: "#6a0dad",
                            color: "#ffffff",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}
                    />
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Nombre
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            CBU
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Moneda
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contacts.map((contact) => (
                                        <TableRow key={contact.email}>
                                            <TableCell align="center">{contact.name || "Nombre"}</TableCell>
                                            <TableCell align="center">{contact.phone || "+54 123 456"}</TableCell>
                                            <TableCell align="center">{contact.email || "email@example.com"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

