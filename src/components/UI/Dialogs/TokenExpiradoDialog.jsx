import DialogContent from '@mui/material/DialogContent';
import {logout} from "../../../Redux/Slices/userAuthenticatedSlice";
import {Typography, Box, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

function TokenExpiradoDialog({mostrarAlerta, cerrarAlerta}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirigirLogin = () => {
        navigate("/")
        localStorage.clear();
        dispatch(logout());
        cerrarAlerta ()
    }

  return (
    <Dialog
    aria-labelledby="customized-dialog-title"
    open={mostrarAlerta}
    onClose={(_, reason) => {
      if (reason !== "backdropClick") cerrarAlerta();
    }}
    disableEscapeKeyDown
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: "16px",
        padding: "16px", 
        backgroundColor: "#f0f0f0",
        width: "500px",
      },
    }}
  >
    <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Box sx={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
            <img src="assets/iconoPaginaVioleta.png" alt="" 
                style={{height:"80px"}}
            />
            <img src="assets/alerta.gif" alt="" 
                style={{height:"100px"}}/>
        </Box>
        <Typography variant="h4" color="error" sx={{fontWeight:"bold"}}>LA SESIÓN EXPIRÓ!</Typography>
        <Typography variant="h6" color="black" sx={{fontWeight:"bold"}}>Serás redirigido al login.</Typography>
        <Box sx={{display:"flex", gap:"20px", pt:2}}>
            <Button variant='contained' sx={{backgroundColor:"#6655D9"}} onClick={()=> redirigirLogin()}>Ok</Button>
        </Box>
    </DialogContent>
  </Dialog>
  );
}

TokenExpiradoDialog.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    cerrarAlerta: PropTypes.func.isRequired
};

export default TokenExpiradoDialog;