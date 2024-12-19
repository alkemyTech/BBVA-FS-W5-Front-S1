import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, Typography, List, ListItem, Divider, Box, Button, Tooltip } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MovingIcon from '@mui/icons-material/Moving';
import GradeIcon from '@mui/icons-material/Grade';
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GrTransaction } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import CotizacionDolarDialog from "../UI/Dialogs/CotizacionDolarDialog";
import AlertaDialog from "../UI/Dialogs/AlertaDialog";
import FavoritoDialog from "../UI/Dialogs/FavoritoDialog";
import DetalleTransaccionDialog from "../UI/Dialogs/DetalleTransaccionDialog";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios"
import { formatearFechaSimple } from '../../utils/helpers';
import ContactsIcon from '@mui/icons-material/Contacts';

export default function Home() {

    const [accounts, setAccounts] = useState([]);
    const [favList, setFavList] = useState([]);
    const [favUser, setFavUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        cuentaArs: "",
        cuentaUsd: ""
    })
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({
        amount: "",
        currencyType: "",
        type: "",
        description: "",
        transactionDate: "",
        titular: "",
        cuenta: "",
        cuentaDestino: "",
    });
    const [balanceVisibility, setBalanceVisibility] = useState(true);
    const changeBalanceVisibility = () => {
        setBalanceVisibility(!balanceVisibility);
    };
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
    const [cargaFinalizada, setCargaFinalizada] = useState(false);
    
    const [infoDolar, setInfoDolar] = useState({
        compra: "",
        venta: "",
        fechaActualizacion: ""
    });
    
    const [mostrarInfoDolar, setMostrarInfoDolar] = useState(false);
    const closeInfoDolar = () => {
        setMostrarInfoDolar(false);
    }
    const openInfoDolar = () => {
        setMostrarInfoDolar(true);
    }

    const [mostrarDialogCrearCuentaDolar, setMostrarDialogCrearCuentaDolar] = useState(false);
    const closeDialogCuentaDolar = () => {
        setMostrarDialogCrearCuentaDolar(false);
    }
    const openDialogCuentaDolar = () => {
        setMostrarDialogCrearCuentaDolar(true);
    }

    const [mostrarDetalleTransaccion, setMostrarDetalleTransaccion] = useState(false);
    const closeDetalleTransaccion = () => {
        setMostrarDetalleTransaccion(false);
    }
    const openDetalleTransaccion = (transaction) => {

        setTransaction({
            amount: transaction.amount,
            currencyType: transaction.currencyType,
            type: transaction.type,
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            titular: transaction.titular,
            cuenta: transaction.cuenta,
            cuentaDestino: transaction.cuentaDestino
        })
        
        setMostrarDetalleTransaccion(true);
    }

    const [mostrarDetalleFavorito, setMostrarDetalleFavorito] = useState(false);
    const closeDetalleFavorito = () => {
        setMostrarDetalleFavorito(false);
    }
    const openDetalleFavorito = (favorito) => {

        setFavUser({
            firstName: favorito.firstName,
            lastName: favorito.lastName,
            email: favorito.email,
            cuentaArs: favorito.cuentaArs,
            cuentaUsd: favorito.cuentaUsd
        })
        
        setMostrarDetalleFavorito(true);
    }

    const navigate = useNavigate();

    const handleNavegar = (ruta) => {
        navigate(ruta);
    }

    const fetchCotizacionDolar = async () => {
        try {
            const response = await axios.get("https://dolarapi.com/v1/dolares/oficial")
            setInfoDolar({
                compra: response.data.compra,
                venta: response.data.venta,
                fechaActualizacion: response.data.fechaActualizacion
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await apiConfig.get("/accounts/");
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        const fetchTransactions = async () => {
            try {
                const response = await apiConfig.get("/transactions?page=0&size=100");

                const sortedTransactions = response.data.content
                    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
                    .slice(0, 3);

                console.log(response.data.content);

                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        fetchCotizacionDolar();   
        fetchAccounts();
        fetchTransactions();

    }, [cargaFinalizada]);

    useEffect(() => {
        let token = localStorage.getItem("token");
        console.log(token); 
        if (token == null) {
            navigate("/")
        }
        const fetchFavList = async () => {
            try {
                const response = await apiConfig.get("/users/favList?page=0&size=3");
                setFavList(response.data.content);
            } catch (error) {
                console.error('Error fetching favUsers:', error);
            }
        };

        fetchFavList();
    }, []);

    const crearCuentaUsd = async () => {
        setMostrarDialogCrearCuentaDolar(false);
        try {
            await apiConfig.post("/accounts/", {
                tipoDeCuenta: "USD",
            }
            )
            setLoadingScreen({
                message: "Creando cuenta en USD...",
                duration: "3000",
            });

            setIsLoading(true);

            setTimeout(() => {
                setSnackbar({
                    status: "success",
                    message: "Cuenta en USD creada con éxito!"
                })
                setSnackbarVisibility(true);
                setCargaFinalizada(true);
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
        <Grid container sx={{ p: 4, alignItems: "start" }} spacing={5}>
            {accounts.map((account) => (
                <Grid item size={5} key={account.cbu}>
                    <Card variant="elevation" elevation={5}>
                        <CardContent sx={{
                            background: account.currency == "ARS" ? "#00aae4" : "#228B22", display: "flex", flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Typography variant="h4" color="#e8e8e8" sx={{ textAlign: "left", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src={account.currency == "ARS" ? "assets/argentina.png" : "assets/estadosUnidos.png"} alt="" style={{ height: "40px" }} />
                                {account.currency}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Grid container>
                                <Grid item size={6}>
                                    <Typography sx={{ color: "gray", textAlign: "left" }}>
                                        Dinero disponible:
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                                        <AttachMoneyIcon />
                                        <Typography sx={{ fontSize: "45px", color: "#12a14b" }}>
                                            {balanceVisibility ? account.balance.toLocaleString("es-AR", { minimumFractionDigits: 0 })
                                                : "**"}
                                        </Typography>
                                        <IconButton
                                            onClick={changeBalanceVisibility}
                                            edge="end"
                                        >
                                            {balanceVisibility ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item size={6} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                    <Typography sx={{ color: "gray" }}>
                                        Limite de Transacción:
                                        <Typography sx={{ fontWeight: "bold", fontSize: "25px", display: "flex", alignSelf: "center", color: "black" }}>
                                            ${account.transactionLimit.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                        </Typography>
                                    </Typography>

                                </Grid>
                                <Grid item size={12}>
                                    <Typography color="gray" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        CBU:
                                        <Typography color="black" sx={{ fontWeight: "bold", fontSize: "16px", fontStyle: "italic" }}>
                                            {account.cbu}
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {accounts.length == 1 && (
                <Grid item size={5}>
                    <Card variant="elevation" elevation={5} sx={{minHeight:"33vh"}}>
                        <CardContent sx={{ background: "#E0E0E0" }}>
                            <Typography variant="h4" color="inital" sx={{ textAlign: "left", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src="assets/estadosUnidos.png" alt="" style={{ height: "40px" }} />
                                USD
                            </Typography>
                        </CardContent>
                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "" }}>
                            <IconButton aria-label="" onClick={openDialogCuentaDolar}>
                                <AddCircleOutlineIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                            </IconButton>
                            <Typography variant="p">Crear Cuenta</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
            <Grid item size={2} sx={{ display: "flex", alignSelf: "center" }}>
                <Card variant="elevation" elevation={5} sx={{ borderRadius: "5%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                        <Box flexDirection="column" justifyContent="center" alignItems="center">
                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center", 
                            "&:hover": {backgroundColor:"transparent"}}}
                                onClick={openInfoDolar}>
                                <AttachMoneyIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Cotizacion Dolar
                            </IconButton>

                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center", 
                                "&:hover": {backgroundColor:"transparent"}} } onClick={() => handleNavegar("/depositmoney")}>
                                <AssuredWorkloadIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Ingresar dinero
                            </IconButton>
                        </Box>
                        <Box flexDirection="column" justifyContent="center" alignItems="center">
                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center", 
                                "&:hover": {backgroundColor:"transparent"}}} onClick={() => handleNavegar("/payment")}>
                                <RequestQuoteIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Pagar servicios
                            </IconButton>

                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", 
                            "&:hover": {backgroundColor:"transparent"}}} 
                            onClick={() => handleNavegar("/sendmoney/0/0")}>
                                <SendIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Enviar dinero
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item size={6}>
                <Card variant="elevation" elevation={5}>
                    <CardContent sx={{
                        background: "#6655D9", display: "flex", flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Typography variant='h6' color="#e8e8e8" sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                            <MovingIcon sx={{ fontSize: "25px", color: "red" }} />
                            Movimientos
                        </Typography>
                        <Button endIcon={<KeyboardArrowRightIcon />} sx={{ backgroundColor: "none", color: "white", fontWeight: "bold", fontSize: "12px" }} 
                        onClick={() => navigate("/transactions")}>
                            Ver todos
                        </Button>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        {transactions.length > 0 ? (
                            <List>
                                {transactions.map((transaction) => (
                                    <>
                                        <ListItem key={transaction.id} sx={{padding: 0}}>
                                            <CardContent sx={{ width: "100%"}}>
                                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "start" }}>
                                                        <Box>
                                                            {transaction.type === "payment" ?

                                                                <GrTransaction style={{
                                                                    color: "white", background: "red", fontSize: "30px",
                                                                    borderRadius: "15px", padding: "5px"
                                                                }} /> :

                                                                <FaArrowDown style={{
                                                                    color: "white", background: "green", fontSize: "30px",
                                                                    borderRadius: "15px", padding: "5px"
                                                                }} />
                                                            }
                                                        </Box>
                                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                                            <Typography variant='p' sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                                {transaction.type == "deposit" ? "DEPÓSITO" : "PAGO"}
                                                                <Typography variant="p" color="grey">
                                                                    {formatearFechaSimple(transaction.transactionDate)}
                                                                </Typography>
                                                                </Typography>
                                                                <Typography variant='p' color='#A599F2'>
                                                                    {transaction.description}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ display: "flex", flexDirection: "row", gap:"10px"}}>
                                                            <Typography variant='p' sx={{
                                                                color: transaction.type == "payment" ? "red" : "green", display: "flex",
                                                                flexDirection: "row", alignItems: "center", gap: "10px"
                                                            }}>
                                                                {transaction.type == "payment" ? "-$" : "+$"}
                                                                {transaction.amount.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                                                <Typography variant="body1" color="grey" fontWeight="bold">
                                                                    {transaction.currencyType == "ARS" ? " ARS" : " USD"}
                                                                </Typography>
                                                            </Typography>
                                                            <Tooltip title="Ver detalle" arrow placement="top"
                                                                slotProps={{popper: {modifiers:[{name: 'offset', options:{offset:[0,-9]}}]}}}>
                                                                <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center" }} 
                                                                    onClick={()=> openDetalleTransaccion(transaction)}>
                                                                    <ReceiptIcon sx={{ fontSize: "30px", color: "#6655D9" }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}
                            </List>
                        ) :
                            <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes movimientos</Typography>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item size={6} >
                <Card variant="elevation" elevation={5} sx={{ height: "100%" }}>
                    <CardContent sx={{
                        background: "#6655D9", display: "flex", flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Typography variant='h6' color="#e8e8e8" sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                            <GradeIcon sx={{ fontSize: "25px", color: "gold" }}/>
                            Mis favoritos
                        </Typography>
                        <Button endIcon={<KeyboardArrowRightIcon />} sx={{ backgroundColor: "none", color: "white", fontWeight: "bold", fontSize: "12px" }} 
                        onClick={() => navigate("/favoritos")}>
                            Ver todos
                        </Button>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        {favList.length > 0 ? (
                            <List>
                                {favList.map((favUser) => (
                                    <>
                                        <ListItem key={favUser.id} sx={{padding: 0}}>
                                                <CardContent sx={{ width: "100%", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                                                        <PersonIcon style={{
                                                            color: "white", background: "grey", fontSize: "30px",
                                                            borderRadius: "15px", padding: "5px"
                                                        }} />
                                                        <Typography variant='p'>
                                                            {(favUser.firstName + " " + favUser.lastName).toUpperCase()}
                                                        </Typography>
                                                    </Box>
                                                    <Tooltip title="Informacion de Contacto" arrow placement="top"
                                                                slotProps={{popper: {modifiers:[{name: 'offset', options:{offset:[0,-9]}}]}}}>
                                                        <IconButton  onClick={()=> openDetalleFavorito(favUser)}> 
                                                            <ContactsIcon sx={{ fontSize: "30px", color: "#6655D9" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </CardContent>
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}
                            </List>
                        ) :
                            <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes favoritos</Typography>
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

            {mostrarInfoDolar && (
                <CotizacionDolarDialog
                    mostrarCotizacion={mostrarInfoDolar}
                    infoDolar={infoDolar}
                    closeInfoDolar={closeInfoDolar}
                />
            )}

            {mostrarDetalleTransaccion && (
                <DetalleTransaccionDialog
                    mostrarDetalleTransaccion={mostrarDetalleTransaccion}
                    transaccion={transaction}
                    closeDetalleTransaccion={closeDetalleTransaccion}
                />
            )}

            <AlertaDialog
                mostrarAlerta={mostrarDialogCrearCuentaDolar}
                accion={crearCuentaUsd}
                closeAlerta={closeDialogCuentaDolar}
                mensajeAlerta="Vas a crear una cuenta en USD"
            />  
            
            <FavoritoDialog
                mostrarDetalleFavorito={mostrarDetalleFavorito}
                favorito={favUser}
                closeDetalleFavorito={closeDetalleFavorito}
            />
        </Grid>
    </>
    );
}