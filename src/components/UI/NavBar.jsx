import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Menu, MenuItem, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = (event, menu) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(menu);
    };

    const handleClose = () => {
        setAnchorEl(false);
        setOpenMenu(false);
    };

    return (
        <Grid container direction="column" sx={{ backgroundColor: "#5F49D7", color: 'white', height: '100vh', width: '250px', paddingTop: "2vh" }}>
            <Grid item>
                <Avatar src="\src\DiMoIcon.jpeg">
                    
                </Avatar>
                <Typography variant="h6" component="div" paddingLeft={"2vh"}>
                    DiMo
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant="body1"
                    sx={{ color: 'white', textDecoration: 'none', cursor: 'pointer', padding: '10px' }}
                    onClick={(event) => handleClick(event, 'plazoFijos')}
                >
                    Plazo fijos
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu === 'plazoFijos'}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'plazo-fijos-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemText primary="Opción 1" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemText primary="Opción 2" />
                    </MenuItem>
                </Menu>
            </Grid>
            <Grid item>
                <Typography
                    variant="body1"
                    sx={{ color: 'white', textDecoration: 'none', cursor: 'pointer', padding: '10px' }}
                    onClick={(event) => handleClick(event, 'transferencias')}
                >
                    Transferencias
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu === 'transferencias'}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'transferencias-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Opción 1" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Opción 2" />
                    </MenuItem>
                </Menu>
            </Grid>
            <Grid item>
                <Typography
                    variant="body1"
                    sx={{ color: 'white', textDecoration: 'none', cursor: 'pointer', padding: '10px' }}
                    onClick={(event) => handleClick(event, 'misPagos')}
                >
                    Mis pagos
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu === 'misPagos'}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'mis-pagos-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Opción 1" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Opción 2" />
                    </MenuItem>
                </Menu>
            </Grid>
            <Grid item>
                <Button variant="contained" color="error">
                    Log out
                </Button>
            </Grid>
        </Grid>
    );
}