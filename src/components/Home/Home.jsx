import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, IconButton, Typography, Link as MuiLink, List, ListItem } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Home() {

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/accounts", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    return (

        <Grid container sx={{ height: "100vh", textAlign: "center" }}>
            <Grid item size={12} sx={{ height: "30vh" }} border={1}>
                <Grid container sx={{ height: "30vh", alignItems: "center" }}>
                    <Grid item size={6}>
                        <Grid container sx={{ justifyContent: "center" }}>
                            <Card sx={{ width: "70%" }}>
                                <CardContent sx={{ background: "#A599F2" }}>
                                    <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                                        Cuenta en ARS
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography>
                                        Balance:
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography>
                                        CBU:
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item size={6}>
                        <Grid container sx={{ justifyContent: "center" }}>
                            <Card sx={{ width: "70%" }} >
                                <CardContent sx={{ background: "#8DC989" }}>
                                    <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                                        Cuenta en USD
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography>
                                        Balance:
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography>
                                        CBU:
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item size={12}>
                <Grid container sx={{ textAlign: 'center', height: "10vh" }}>
                    <Grid item size={4}>
                        <Grid container sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <MuiLink component={Link} to="/#" sx={{ textDecoration: "none" }}>
                                <Card>
                                    <CardContent>
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
                            <MuiLink component={Link} to="/#" sx={{ textDecoration: "none" }}>
                                <Card>
                                    <CardContent>
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
                        <Grid container sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Grid container sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <MuiLink component={Link} to="/#" sx={{ textDecoration: "none" }}>
                                    <Card>
                                        <CardContent>
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
            </Grid>
            <Grid item size={12}>
                <Grid container sx={{ textAlign: 'center', height: "50vh", border: 1 }}>
                    <Grid item size={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                                    Transferencias
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <List>
                                <ListItem sx={{ padding: 0 }}>
                                    <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%" }}>
                                            <Card sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0'} }}>
                                                <CardContent>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Nombre de transferencia
                                                    </Typography>
                                                    <Typography>
                                                        Movimiento
                                                    </Typography>
                                                    <Typography>
                                                        Monto:
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </MuiLink>
                                    </ListItem>
                                    <ListItem sx={{ padding: 0 }}>
                                    <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%" }}>
                                            <Card sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0'} }}>
                                                <CardContent>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Nombre de transferencia
                                                    </Typography>
                                                    <Typography>
                                                        Movimiento
                                                    </Typography>
                                                    <Typography>
                                                        Monto:
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </MuiLink>
                                    </ListItem>
                                </List>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={6}>
                        <Card>
                            <CardContent>
                                <CardContent>
                                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                                        Transferencias
                                    </Typography>
                                </CardContent>
                                <List>
                                    <ListItem sx={{ padding: 0}}>
                                        <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%" }}>
                                            <Card sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0'} }}>
                                                <CardContent>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Nombre de transferencia
                                                    </Typography>
                                                    <Typography>
                                                        Movimiento
                                                    </Typography>
                                                    <Typography>
                                                        Monto:
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </MuiLink>
                                    </ListItem>
                                    <ListItem sx={{ padding: 0 }}>
                                    <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%" }}>
                                            <Card sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0'} }}>
                                                <CardContent>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Nombre de transferencia
                                                    </Typography>
                                                    <Typography>
                                                        Movimiento
                                                    </Typography>
                                                    <Typography>
                                                        Monto:
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </MuiLink>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>


    );
}