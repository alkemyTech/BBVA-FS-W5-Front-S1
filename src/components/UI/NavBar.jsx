import React, { useState } from 'react';
import { Typography, Menu, MenuItem, ListItemText, ListItemIcon, Avatar, Card, CardContent, AppBar, Toolbar, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    const handleClick = (event, menu) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(menu);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenu(null);
    };

    return (
        <Grid container>
            <Grid item size={12}>
                {/* Header */}
                <Grid item xs={12}>
                    <AppBar position="static" sx={{ backgroundColor: "#6655D9", boxShadow: 'none' }}>
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "30px" }}>
                                <Typography
                                    variant="h3"
                                    color="white"
                                    sx={{
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <img
                                        src="/public/assets/iconoPaginaVioleta.png"
                                        alt=""
                                        style={{ height: "45px" }}
                                    />
                                    DiMo
                                </Typography>
                                <Typography
                                    variant="h4"

                                >
                                    Bienvenido jhon!
                                </Typography>
                            </Box>
                            <Box>
                                <Button color='white'>
                                    <NotificationsIcon/>
                                </Button>
                                <Button color='white'>
                                    <SettingsIcon/>
                                </Button>
                                <Button sx={{ cursor: 'pointer' }} color="inherit" onClick={(event) => handleClick(event, 'fotoPerfil')}>
                                    <Avatar src="/src/asd.png" sx={{ margin: "10px auto", width: 56, height: 56 }} />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu === 'fotoPerfil'}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'foto-perfil-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <ListItemText primary="Mi perfil" />
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemText primary="Mis ajustes" />
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemText primary="Mis pagos" />
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Grid>

            </Grid>
            <Grid item size={12}>
                <Grid container sx={{ height: '100vh' }}>
                    {/* Navbar Lateral */}
                    <Grid item size={1.5} sx={{ backgroundColor: "#6655D9", color: 'white', boxShadow: "2px 0px 0px 0px rgba(0, 0, 0, 0.3)" }}>
                        <Grid container direction="column" sx={{ p:3 , height: '80vh', alignItems:"center", textAlign:"center"}} spacing={3}>
                            <Grid item size={12}>
                            <Divider sx={{backgroundColor:"white"}}/>
                                <Button
                                    variant="body1"
                                    sx={{ color: 'white', textDecoration: 'none', padding: '10px' }}
                                    startIcon=<HomeOutlinedIcon/>
                                >
                                    Inicio
                                </Button>
                                <Divider sx={{backgroundColor:"white"}}/>
                            </Grid>
                            
                            <Grid item size={12}>
                                <Button
                                    variant="body1"
                                    sx={{ color: 'white', textDecoration: 'none'}}
                                    startIcon=<CurrencyExchangeOutlinedIcon/>
                                >
                                    Transferencias
                                </Button>
                                <Divider sx={{backgroundColor:"white"}}/>
                            </Grid>
                            <Grid item size={12}>
                                <Button
                                    variant="body1"
                                    sx={{ color: 'white', textDecoration: 'none' }}
                                    startIcon=<PaymentsOutlinedIcon/>
                                >
                                    pagos
                                </Button>
                                <Divider sx={{backgroundColor:"white"}}/>
                            </Grid>
                            <Grid item size={12} >
                                <Button
                                    variant="body1"
                                    sx={{ color: 'white', textDecoration: 'none'}}
                                    startIcon=<AccountBalanceOutlinedIcon/>
                                >
                                    Plazo fijos
                                </Button>
                                <Divider sx={{backgroundColor:"white"}}/>
                            </Grid>
                            <Grid item sx={{ flexGrow: 1 }} />
                            <Grid item sx={{ paddingBottom: '10px' }} >
                                <Button variant="contained" sx={{color:"black"}}
                                        startIcon=<LogoutOutlinedIcon/>
                                >
                                    Log out
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Contenido Principal */}
                    <Grid item size={10.5} sx={{ padding: "2vh" }}>
                        <Card sx={{ background: "#e8e8e8" }}>
                            <CardContent>
                                <Typography>
                                    AAAAAAAAA
                                </Typography>
                                <Typography>
                                    AAAAAAAAA
                                </Typography>
                                <Typography>
                                    AAAAAAAAA
                                </Typography>
                                <Typography>
                                    AAAAAAAAA
                                </Typography>
                                <Typography>
                                    AAAAAAAAA
                                </Typography>
                                <Typography>
                                    AAAAAAAAA
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>



    );
}