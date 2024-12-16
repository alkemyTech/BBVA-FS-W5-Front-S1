import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, Typography, Link as MuiLink, List, ListItem, Divider, Box, Button } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link, useNavigate } from 'react-router-dom';
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
import Swal from "sweetalert2";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import axios from "axios"

export default function Home() {

    const [accounts, setAccounts] = useState([]);
    const [favList, setFavList] = useState([]);
    const [transactions, setTransactions] = useState([]);
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

    const navigate = useNavigate();

    const formatearFecha = (fechaOriginal) => {

        const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm:ss", {
            locale: es,
        }).toUpperCase();

        return fechaFormateada;
    };

    const handleNavegar = (ruta) => {
        navigate(ruta);
    }

    const crearCuentaUsdAlerta = () => {
        Swal.fire({
            title: "Vas a crear una cuenta en USD",
            text: "Estas seguro? No va a ser posible revertir la operación.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6655D9",
            cancelButtonColor: "#228B22",
            cancelButtonText: "Crear cuenta",
            confirmButtonText: "Cancelar",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isDismissed) {
                crearCuentaUsd();
            }
        });
    }

    const infoDolarAlerta = () => {

        Swal.fire({
            title: `<div style="display: flex; align-items: center; gap: 2px; justify-content:center">
                        <img src="assets/iconoPaginaVioleta.png" alt="Icono" style="height: 60px;">
                        <span style="color: #6655D9;">Cotización del Dólar</span>
                    </div>`,
            html: `
            <Div style="display: flex; flex-direction:column; gap:10px; align-items:center;">
                <h3 style="display: flex; flex-direction: row; gap: 10px">Valor de Compra: <p style="font-weight:bold; color: #228B22">$${infoDolar.compra}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px">Valor de Venta: <p style="font-weight:bold; color: #228B22">$${infoDolar.venta}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px">Fecha de Actualización: <p style="font-weight:bold; color:00aae4">${formatearFecha(infoDolar.fechaActualizacion)}</p></h3>
            </Div>
            `
        })
    }

    const infoTransactionsDetail = (amount,currencyType,type,description,transactionDate,cuenta,titular,cuentaDestino) => {
        Swal.fire({
            title: `<div style="display: flex; align-items: center; gap: 2px; justify-content:center">
                        <img src="assets/iconoPaginaVioleta.png" alt="Icono" style="height: 60px;">
                        <span style="color: #6655D9;">Detalles de la transacción</span>
                    </div>`,
            html: `
            <Div style="display: flex; flex-direction:column; gap:15px;">
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Monto: <p style="font-weight:bold; color: #228B22; font-size: 20px;">$${amount}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Tipo de cuenta: <p style="font-weight:bold; color: ${currencyType == "USD" ? "green" : "#00aae4"}; font-size: 20px;">${currencyType}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Tipo de transaccion: <p style="font-weight:bold; color: black; font-size: 20px;">${type == "deposit" ? "Depósito" : "Pago"}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Descripcion: <p style="font-weight:bold; color: black; font-size: 20px;">${description}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Fecha: <p style="font-weight:bold; color: black; font-size: 20px;">${formatearFecha(transactionDate)}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- CBU origen: <p style="font-weight:bold; color: black; font-size: 20px">${cuenta}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Titular cuenta: <p style="font-weight:bold; color: black; font-size: 20px;">${titular}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- CBU destino: <p style="font-weight:bold; color: black; font-size: 20px">${type == "payment" ? cuentaDestino : "-------"}</p></h3>
            </Div>
            `
        })
    }

    const cotizacionDolar = async () => {
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
    }



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

        cotizacionDolar();
        fetchAccounts();
        fetchTransactions();
    }, [cargaFinalizada]);

    useEffect(() => {
        const fetchFavList = async () => {
            try {
                const response = await apiConfig.get("/users/favList");
                setFavList(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchFavList();
    }, []);

    const crearCuentaUsd = async () => {
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
        <Grid container sx={{ p: 2, m: 5, alignItems: "start" }} spacing={5}>
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
                            <Button endIcon={<KeyboardArrowRightIcon />} sx={{ backgroundColor: "none", color: "white", fontWeight: "bold", fontSize: "12px" }}>
                                Ver mi cuenta
                            </Button>
                        </CardContent>
                        <CardContent>
                            <Grid container >
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
                            <IconButton aria-label="" onClick={crearCuentaUsdAlerta}>
                                <AddCircleOutlineIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                            </IconButton>
                            <Typography variant="p">Crear Cuenta</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}

            <Grid item size={2} sx={{ display: "flex", alignSelf: "center" }}>
                <Card variant="elevation" elevation={5} sx={{ borderRadius: "20%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                        <Box flexDirection="column" justifyContent="center" alignItems="center">
                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center" }}
                                onClick={() => infoDolarAlerta()}>
                                <AttachMoneyIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Cotizacion Dolar
                            </IconButton>

                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center" }} onClick={() => handleNavegar("/depositmoney")}>
                                <AssuredWorkloadIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Ingresar dinero
                            </IconButton>
                        </Box>
                        <Box flexDirection="column" justifyContent="center" alignItems="center">
                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center" }} onClick={() => handleNavegar("/payment")}>
                                <RequestQuoteIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Pagar servicios
                            </IconButton>

                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center" }} onClick={() => handleNavegar("/sendmoney")}>
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
                        <Button endIcon={<KeyboardArrowRightIcon />} sx={{ backgroundColor: "none", color: "white", fontWeight: "bold", fontSize: "12px" }} onClick={()=>navigate("/transactions")}>
                            Ver todos
                        </Button>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        {transactions.length > 0 ? (
                            <List>
                                {transactions.map((transaction) => (
                                    <>
                                        <ListItem sx={{ padding: 0, margin: 0 }} key={transaction.id}>
                                            <CardContent sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0' } }}>
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
                                                                    {formatearFecha(transaction.transactionDate)}
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
                                                            <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center" }} 
                                                            onClick={()=> infoTransactionsDetail(transaction.amount,transaction.currencyType,transaction.type,transaction.description,transaction.transactionDate,transaction.cuenta,transaction.titular,transaction.cuentaDestino)}>
                                                                <ReceiptIcon sx={{ fontSize: "30px", color: "#6655D9" }} />
                                                            </IconButton>
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
                            <GradeIcon sx={{ fontSize: "25px", color: "gold" }} />
                            Mis favoritos
                        </Typography>
                        <Button endIcon={<KeyboardArrowRightIcon />} sx={{ backgroundColor: "none", color: "white", fontWeight: "bold", fontSize: "12px" }}>
                            Ver todos
                        </Button>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        {favList.length > 0 ? (
                            <List>
                                {favList.map((favUser) => (
                                    <>
                                        <ListItem key={favUser.email}>
                                            <MuiLink component={Link} to="/Transactions" sx={{ textDecoration: "none", width: "100%", color: "black" }}>
                                                <CardContent sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                                                        <PersonIcon style={{
                                                            color: "white", background: "grey", fontSize: "30px",
                                                            borderRadius: "15px", padding: "5px"
                                                        }} />
                                                        <Typography variant='p'>
                                                            {(favUser.firstName + " " + favUser.lastName).toUpperCase()}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </MuiLink>
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
        </Grid>
    );
}