import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, Typography, Link as MuiLink, List, ListItem, Divider, Box } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MovingIcon from '@mui/icons-material/Moving';
import GradeIcon from '@mui/icons-material/Grade';
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function Home() {

    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [balanceVisibility, setBalanceVisibility] = useState(true);
    const changeBalanceVisibility = () => {
        setBalanceVisibility(!balanceVisibility);
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
                const response = await apiConfig.get("/transactions");

                const sortedTransactions = response.data.content
                    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
                    .slice(0, 3);
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
        fetchTransactions();
    }, []);

    return (
    <Grid item size = {12}>
        <Grid container flexDirection="column" sx={{p:3}} spacing={4}>
            <Grid item size={12}>
                <Grid container justifyContent="center">
                    <Typography variant="h4" color="initial" sx={{fontWeight:"bold", color:"#6655D9"}}>Mis cuentas</Typography>
                </Grid>
            </Grid>
            <Grid item size={12}>
                <Grid container flexDirection="row" alignItems="center" spacing={10}>
                    {accounts.map((account) => (
                        <Grid item size={6} key={account.cbu}>
                            <Grid container sx={{ justifyContent: account.currency == "ARS" ? "right" : "left" }}>
                                <Card sx={{ width: "70%", borderRadius:"10px" }} variant="elevation" elevation={5}>
                                    <CardContent sx={{ background: account.currency == "ARS" ? "#00aae4" : "#228B22" }}>
                                        <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: "20px" }}>
                                            Cuenta en {account.currency}
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
                                                    <Typography sx={{fontSize: "45px", color:"#12a14b" }}>
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
                                            <Grid item size={6}>
                                                <Box sx={{ textAlign: "left", ml:2 }}>
                                                    <Typography sx={{ color: "gray" }}>
                                                        Limite de Transacción:
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                                                        ${account.transactionLimit.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                                        
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Box sx={{ textAlign: "left", display:"flex", flexDirection:"row", alignItems:"center", gap:"5px" }}>
                                                    <Typography sx={{ color: "gray" }}>
                                                        CBU:
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                                                        {account.cbu}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    ))}
                    {accounts.length == 1 && (
                        <>
                    <Grid item size={6}>
                        <Grid container sx={{ justifyContent: "left" }}>
                            <Card sx={{ width: "70%", borderRadius:"10px" }} variant="elevation" elevation={5}>
                                <CardContent sx={{ backgroundColor: "#dfdedb" }}>
                                    <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: "20px" }}>
                                        Cuenta en USD
                                    </Typography>
                                </CardContent>
                                <CardContent sx={{height:"28.1vh", display:"flex", alignItems:"center", justifyContent:"center", 
                                    flexDirection:"column"}}>
                                    <IconButton aria-label="" >
                                        <AddCircleOutlineIcon sx={{fontSize:"40px", color:"#6655D9"}}/>
                                    </IconButton>
                                    <Typography variant="p">Crear Cuenta</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    </>
                    )}
                </Grid>
            </Grid>
            <Grid item size={12}>
                <Grid container flexDirection="row" justifyContent="center" spacing={15}>
                    <Grid item>
                        <Grid container flexDirection="column" alignItems="center">
                            <IconButton sx={{display:"flex", flexDirection:"column", gap:"5px", fontSize:"15px", fontWeight:"bold"}}>
                                <SendIcon sx={{ fontSize: "40px", color:"#6655D9" }} />
                                Enviar dinero
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container flexDirection="column" alignItems="center">
                            <IconButton sx={{display:"flex", flexDirection:"column", gap:"5px", fontSize:"15px", fontWeight:"bold"}}>
                                <AssuredWorkloadIcon sx={{ fontSize: "40px", color:"#6655D9" }} />
                                Ingresar dinero
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container flexDirection="column" alignItems="center">
                            <IconButton sx={{display:"flex", flexDirection:"column", gap:"5px", fontSize:"15px", fontWeight:"bold"}}>
                                <RequestQuoteIcon sx={{ fontSize: "40px", color:"#6655D9" }} />
                                Pagar servicios
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item size={12}>
                <Grid container spacing={15}>
                    <Grid item size={6}>
                        <Card>
                            <CardContent sx={{ background: "#A599F2" }}>
                                <Typography variant='h6' sx={{ fontWeight: "bold", display:"flex", flexDirection:"row", alignItems:"center", gap:"5px" }}>
                                    <MovingIcon sx={{fontSize:"25px", color:"red"}}/>
                                    Movimientos
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardContent sx={{ alignContent: "center" }}>
                            {transactions.length > 0 ? (
                                    <List>
                                    {transactions.map((transaction) => (
                                        <ListItem sx={{ padding: 0 }} key={transaction.cuenta}>
                                            <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%", color: "black" }}>
                                                <CardContent sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Nombre de transferencia: {transaction.titular}
                                                    </Typography>
                                                    <Typography>
                                                        Tipo: {transaction.type}
                                                    </Typography>
                                                    <Typography>
                                                        Monto: {transaction.amount}
                                                    </Typography>
                                                </CardContent>
                                            </MuiLink>
                                        </ListItem>
                                    ))}
                                </List>
                                ):
                                    <Typography variant="body1" color="grey" fontWeight="bold" sx={{textAlign:"center"}}>Aún no tienes movimientos</Typography> 
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={6}>
                        <Card>
                            <CardContent sx={{ background: "#A599F2" }}>
                            <Typography variant='h6' sx={{ fontWeight: "bold", display:"flex", flexDirection:"row", alignItems:"center", gap:"5px" }}>
                                <GradeIcon sx={{fontSize:"25px", color:"gold"}}/>
                                Mis favoritos
                            </Typography>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                {transactions.length > 0 ? (
                                    <List>
                                    {transactions.map((transaction) => (
                                        <ListItem sx={{ padding: 0 }} key={transaction.cuenta}>
                                            <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%", color: "black" }}>
                                                <CardContent sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Nombre de transferencia: {transaction.titular}
                                                    </Typography>
                                                    <Typography>
                                                        Tipo: {transaction.type}
                                                    </Typography>
                                                    <Typography>
                                                        Monto: {transaction.amount}
                                                    </Typography>
                                                </CardContent>
                                            </MuiLink>
                                        </ListItem>
                                    ))}
                                </List>
                                ):
                                    <Typography variant="body1" color="grey" fontWeight="bold" sx={{textAlign:"center"}}>Aún no tienes favoritos</Typography> 
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
}