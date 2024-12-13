import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, Typography, Link as MuiLink, List, ListItem, Divider, Box } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MovingIcon from '@mui/icons-material/Moving';
import GradeIcon from '@mui/icons-material/Grade';
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GrTransaction } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";


export default function Home() {

    const [accounts, setAccounts] = useState([]);
    const [favList, setFavList] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [balanceVisibility, setBalanceVisibility] = useState(true);
    const changeBalanceVisibility = () => {
        setBalanceVisibility(!balanceVisibility);
    };
    const navigate = useNavigate();


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

    const handleNavegar = (ruta) => {
        navigate(ruta);
    }

    return (
        
            <Grid container sx={{ p: 3, m:10 }} spacing={4}>
                <Grid item size={12}>
                    <Grid container justifyContent="center">
                        <Typography variant="h4" color="initial" sx={{ fontWeight: "bold", color: "#6655D9" }}>Mis cuentas</Typography>
                    </Grid>
                </Grid>
                {accounts.map((account) => (
                    <Grid item size={4} key={account.cbu}>
                        <Card>
                            <CardContent  sx={{ background: account.currency == "ARS" ? "#00aae4" : "#228B22" }}>
                                <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: "20px" }}>
                                    Cuenta en {account.currency}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{textAlign:"center"}}>
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
                                    <Grid item size={6}>
                                        <Typography sx={{ color: "gray" }}>
                                            Limite de Transacción:
                                        </Typography>
                                        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                                            ${account.transactionLimit.toLocaleString("es-AR", { minimumFractionDigits: 0 })}

                                        </Typography>
                                    </Grid>
                                    <Grid item size={12}>
                                        <Typography sx={{ color: "gray" }}>
                                            CBU:
                                        </Typography>
                                        <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                                            {account.cbu}
                                        </Typography>
                                    </Grid>
                                </Grid>


                            </CardContent>
                        </Card>
                    </Grid>

                ))}

                <Grid item size={4}>
                    <Grid container flexDirection="row" justifyContent="center" spacing={10}>
                        <Grid item>

                            <IconButton sx={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "15px", fontWeight: "bold" }} onClick={() => handleNavegar("/sendmoney")}>
                                <SendIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Enviar dinero
                            </IconButton>
                        </Grid>
                        <Grid item>

                            <IconButton sx={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "15px", fontWeight: "bold" }} onClick={() => handleNavegar("/depositmoney")}>
                                <AssuredWorkloadIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Ingresar dinero
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton sx={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "15px", fontWeight: "bold" }} onClick={() => handleNavegar("/payment")}>
                                <RequestQuoteIcon sx={{ fontSize: "40px", color: "#6655D9" }} />
                                Pagar servicios
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item size={6}>
                    <Card variant="elevation" elevation={5}>
                        <CardContent sx={{ background: "#A599F2" }}>
                            <Typography variant='h6' sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                                <MovingIcon sx={{ fontSize: "25px", color: "red" }} />
                                Movimientos
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardContent sx={{ alignContent: "center" }}>
                            {console.log(transactions)}
                            {transactions.length > 0 ? (
                                <List>
                                    {transactions.map((transaction) => (
                                        <>
                                            <ListItem sx={{ padding: 0 }} key={transaction.id}>
                                                <MuiLink component={Link} to="/Transactions" sx={{ textDecoration: "none", width: "100%", color: "black" }}>
                                                    <CardContent sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "240px" }}>
                                                            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                                                                <Box>
                                                                    {transaction.type === "payment" ?

                                                                        <GrTransaction style={{
                                                                            color: "white", background: "grey", fontSize: "30px",
                                                                            borderRadius: "15px", padding: "5px"
                                                                        }} /> :

                                                                        <FaArrowDown style={{
                                                                            color: "white", background: "grey", fontSize: "30px",
                                                                            borderRadius: "15px", padding: "5px"
                                                                        }} />
                                                                    }
                                                                </Box>
                                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                    <Typography variant='p'>
                                                                        {(transaction.type).toUpperCase()}
                                                                    </Typography>
                                                                    <Typography variant='p'>
                                                                        {transaction.transactionDate}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                <Typography variant='p' sx={{
                                                                    color: transaction.type == "payment" ? "red" : "green", display: "flex",
                                                                    flexDirection: "row", alignItems: "center", gap: "10px"
                                                                }}>
                                                                    {transaction.type == "payment" ? "-" : "+"}
                                                                    {transaction.amount.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                                                    <Typography variant="body1" color="grey" fontWeight="bold">
                                                                        {transaction.currencyType == "ARS" ? " ARS" : " USD"}
                                                                    </Typography>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </MuiLink>
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
                <Grid item size={6}>
                    <Card variant="elevation" elevation={5}>
                        <CardContent sx={{ background: "#A599F2" }}>
                            <Typography variant='h6' sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                                <GradeIcon sx={{ fontSize: "25px", color: "gold" }} />
                                Mis favoritos
                            </Typography>
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

            </Grid>
    );
}