import Grid from '@mui/material/Grid2';
import Carrousel from '../Carrousel/Carrousel';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, IconButton, Typography, Link as MuiLink } from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link } from 'react-router-dom';


export default function Home() {

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
                            <MuiLink component={Link} to="/sendmoney" sx={{ textDecoration: "none" }}>
                                <Card sx={{
                                    transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }
                                }}>
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
                            <MuiLink component={Link} to="/depositmoney" sx={{ textDecoration: "none" }}>
                                <Card sx={{
                                    transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }
                                }}>
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
                                    <Card sx={{
                                        transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }
                                    }}>
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
                <Grid container sx={{ textAlign: 'center', height: "50vh",alignItems: "center" , border:1}}>
                    <Grid item size={6}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    cOLUMNA A
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={6}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    cOLUMNA A
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>


    );
}