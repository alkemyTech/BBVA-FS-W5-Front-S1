import React, { useState } from 'react';
import { Grid2, Typography, Avatar, IconButton, Menu, MenuItem, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PaymentIcon from '@mui/icons-material/Payment';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [anchorElSettings, setAnchorElSettings] = useState(null);

    const handleClickNotifications = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };

    const handleClickSettings = (event) => {
        setAnchorElSettings(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorElSettings(null);
    };

    return (
        <Grid2
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{

                background: "linear-gradient(153deg, rgba(36,8,70,1) 0%, rgba(63,15,119,1) 10%, rgba(82,32,142,1) 20%, rgba(106,48,168,1) 30%, rgba(114,65,173,1) 40%, rgba(135,82,199,1) 50%, rgba(114,65,173,1) 60%, rgba(93,39,150,1) 70%, rgba(82,32,142,1) 80%, rgba(63,15,119,1) 90%, rgba(36,8,70,1) 100%)",
                padding: '10px 20px',
                boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
                width: '100%',
                
            }}
        >
            {/* Sección Logo y botones */}
            <Grid2 container alignItems="center" spacing={3}>
                <Grid2>
                    <img
                        src="/public/assets/prueba1.png"
                        alt="Logo"
                        style={{ height: "40px" }}
                    />
                </Grid2>

                <Grid2>
                    <Button
                        
                        sx={{
                            color: '#ffffff',
                            fontSize: '17px',
                            '&:hover': { color: '#ffffff' },
                        }}
                    >
                        Inicio
                    </Button>
                </Grid2>
                <Grid2>
                    <Button
                        
                        sx={{
                            color: '#ffffff',
                            fontSize: '17px',                        
                            '&:hover': { color: '#ffffff' },
                        }}
                    >
                        Transferencias
                    </Button>
                </Grid2>
                <Grid2>
                    <Button
                        
                        sx={{
                            color: '#ffffff',
                            fontSize: '17px',
                            '&:hover': { color: '#ffffff' },
                        }}
                    >
                        Pagos
                    </Button>
                </Grid2>
                <Grid2>
                    <Button
                        
                        sx={{
                            color: '#ffffff',
                            fontSize: '17px',
                            '&:hover': { color: '#ffffff'},
                        }}
                    >
                        Actividad
                    </Button>
                </Grid2>
            </Grid2>

            {/* Sección derecha: Notificaciones y configuración */}
            <Grid2 container alignItems="center" spacing={2}>

                <Grid2>
                    <IconButton onClick={handleClickNotifications} sx={{ color: '#ffffff' }}>
                        <NotificationsIcon sx={{ '&:hover': { color: '#ffffff' } }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNotifications}
                        open={Boolean(anchorElNotifications)}
                        onClose={handleCloseNotifications}
                    >
                        <MenuItem onClick={handleCloseNotifications}>Notificación 1</MenuItem>
                        <MenuItem onClick={handleCloseNotifications}>Notificación 2</MenuItem>
                        <MenuItem onClick={handleCloseNotifications}>Notificación 3</MenuItem>
                    </Menu>
                </Grid2>


                <Grid2>
                    <IconButton onClick={handleClickSettings} sx={{ color: '#ffffff' }}>
                        <SettingsIcon sx={{ '&:hover': { color: '#ffffff' } }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElSettings}
                        open={Boolean(anchorElSettings)}
                        onClose={handleCloseSettings}
                    >
                        <MenuItem onClick={handleCloseSettings}>Opción 1</MenuItem>
                        <MenuItem onClick={handleCloseSettings}>Opción 2</MenuItem>
                        <MenuItem onClick={handleCloseSettings}>Opción 3</MenuItem>
                    </Menu>
                </Grid2>

                {/* Foto de perfil */}
                <Grid2>
                    <Avatar sx={{ bgcolor: '#1976d2' }}>A</Avatar>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

