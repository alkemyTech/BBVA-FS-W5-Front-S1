import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, IconButton, Typography, Link as MuiLink, List, ListItem, Divider, Box } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


export default function Home() {

    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await apiConfig.get("accounts/");
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

        <Grid container sx={{ height: "100vh", textAlign: "center", background: "#eee" }}>
            <Grid item size={12}>
                <Grid container sx={{ alignItems: "center", marginTop: "1vh", height: "15vh" }}>
                    {accounts.map((account) => (
                        <Grid item size={6} key={account.cbu}>
                            <Grid container sx={{ justifyContent: "center" }}>
                                <Card sx={{ width: "70%" }}>
                                    <CardContent sx={{ background: "#A599F2" }}>
                                        <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: "30px" }}>
                                            Cuenta en {account.currency}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item size={6}>
                                                <Typography sx={{ color: "gray", textAlign: "left", marginLeft: "2vh" }}>
                                                    Dinero disponible:
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                                                    <AttachMoneyIcon sx={{ fontSize: "50px" }} />
                                                    <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "45px" }}>
                                                        {account.balance}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item size={6}>
                                                <Box sx={{ textAlign: "left", marginLeft: "2vh" }}>
                                                    <Typography sx={{ color: "gray" }}>
                                                        CBU:
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                                                        {account.cbu}
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                        </Grid>

                                    </CardContent>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item size={12} sx={{ height: "1vh" }}>
                <Grid container sx={{ textAlign: 'center', alignContent: "center" }}>
                    <Grid item size={4}>
                        <Grid container sx={{  justifyContent:"end" }}>
                            <MuiLink component={Link} to="/sendMoney" sx={{ textDecoration: "none" }}>
                                <Card>
                                    <CardContent sx={{'&:hover': { backgroundColor: '#00bcb0' }}}>
                                        <Grid container>
                                            <Grid item size={12}>
                                                <SendIcon sx={{ fontSize: "30px" }} />
                                            </Grid>
                                            <Grid item size={12}>
                                                <Typography variant='p'>
                                                    Enviar dinero
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </MuiLink>
                        </Grid>
                    </Grid>
                    <Grid item size={4}>
                        <Grid container sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <MuiLink component={Link} to="/depositMoney" sx={{ textDecoration: "none" }}>
                                <Card>
                                    <CardContent sx={{'&:hover': { backgroundColor: '#00bcb0' }}}>
                                        <Grid container>
                                            <Grid item size={12}>
                                                <AssuredWorkloadIcon sx={{ fontSize: "30px" }} />
                                            </Grid>
                                            <Grid item size={12}>
                                                <Typography variant='p'>
                                                    Ingresar dinero
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </MuiLink>
                        </Grid>
                    </Grid>
                    <Grid item size={4}>
                        <Grid container sx={{ justifyContent:"start" }}>
                                <MuiLink component={Link} to="/#" sx={{ textDecoration: "none" }}>
                                    <Card>
                                        <CardContent sx={{'&:hover': { backgroundColor: '#00bcb0' }}}>
                                            <Grid container>
                                                <Grid item size={12}>
                                                    <RequestQuoteIcon sx={{ fontSize: "30px" }} />
                                                </Grid>
                                                <Grid item size={12}>
                                                    <Typography variant='p'>
                                                        Pagar servicios
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </MuiLink>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item size={12}>
                <Grid container sx={{ textAlign: 'center' }}>
                    <Grid item size={6}>
                        <Card>
                            <CardContent sx={{ background: "#A599F2" }}>
                                <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                                    Transferencias
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardContent sx={{ alignContent: "center" }}>
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

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={6}>
                        <Card>
                            <CardContent sx={{ background: "#A599F2" }}>
                                <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                                    Transferencias
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardContent>
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

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>


    );
}