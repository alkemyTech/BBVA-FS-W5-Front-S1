import { Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import {logout} from "../../Redux/Slices/userAuthenticatedSlice";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () =>{
    navigate("/")
    localStorage.clear();
    dispatch(logout());
  };
  const redirect = (page) =>{
    navigate(page)
  };
  const userAuthenticated = useSelector((state) => state.userAuthenticated);

  const handleNavigate = () =>{
    navigate("/home")
    
  };

  const handleNavegar = (ruta) => {
    navigate(ruta);
  }


  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background:
          "linear-gradient(153deg, rgba(36,8,70,1) 0%, rgba(63,15,119,1) 10%, rgba(82,32,142,1) 20%, rgba(106,48,168,1) 30%, rgba(114,65,173,1) 40%, rgba(135,82,199,1) 50%, rgba(114,65,173,1) 60%, rgba(93,39,150,1) 70%, rgba(82,32,142,1) 80%, rgba(63,15,119,1) 90%, rgba(36,8,70,1) 100%)",
        padding: "10px 20px",
        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Grid item size={6}>
        <Grid container alignItems="center" flexDirection="row" spacing={3}>
          <Grid item>
            <img
              src="/assets/navidad1.png"
              alt="Logo"
              style={{ height: "40px" }}
              onClick={handleNavigate}
            />
          </Grid>

          <Grid item>
            <Button
              sx={{
                color: "#ffffff",
                fontSize: "16px",
                alignItems: "center",
              }}
              startIcon={<HomeIcon />}
              onClick={()=>redirect("/home")}
            >
              <Typography variant="p" color="#ffffff">
                Inicio
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                color: "#ffffff",
                fontSize: "16px",
                alignItems: "center",
              }}
              startIcon={<AccountBalanceIcon />}
              onClick={()=>redirect("/plazosFijos")}
            >
              <Typography variant="p" color="#ffffff">
                Plazos Fijos
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                color: "#ffffff",
                fontSize: "16px",
              }}
              startIcon={<CurrencyExchangeIcon />}
              onClick={()=>redirect("/prestamos")}
            >
              <Typography variant="p" color="#ffffff">
                Préstamos
              </Typography>
            </Button>
          </Grid>
          {userAuthenticated.role == "Admin" ? (
            <Grid item>
            <Button
              sx={{
                color: "#ffffff",
                fontSize: "16px",
              }}
              startIcon={<ManageAccountsIcon />}
              onClick={()=>redirect("/gestionUsuarios")}
            >
              <Typography variant="p" color="#ffffff">
                Gestion de usuarios
              </Typography>
            </Button>
          </Grid>
          ) : null
          }
          
        </Grid>
      </Grid>
      <Grid item size={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            flexDirection:"row",
            alignItems:"center",
            gap:"10px"
          }}
        >
          <Box sx={{display:"flex", flexDirection:"column", textAlign:"center"}}>
            <Typography variant="p" color="#BBBBBB">
                Bienvenido/a
            </Typography>
            <Typography variant="p" color="#BBBBBB">
                {userAuthenticated.firstName}!
            </Typography>
          </Box>
          <IconButton
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon sx={{ color: "white", fontSize: "40px" }} />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => navigate("/userProfile")} sx={{ fontSize: "14px" }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" sx={{ color: "#6655D9" }} />
              </ListItemIcon>
              Mi cuenta
            </MenuItem>
            <Divider />
            <MenuItem sx={{ fontSize: "14px" }} onClick={handleLogout}>
              <ListItemIcon>
                <Logout
                  fontSize="small"
                  fontColor="#6655D9"
                  sx={{ color: "#6655D9" }}
                  
                />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
}
