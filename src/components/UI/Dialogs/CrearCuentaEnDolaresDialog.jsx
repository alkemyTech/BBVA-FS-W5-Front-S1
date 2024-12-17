import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function CrearCuentaEnDolaresDialog({mostrarDialogCrearCuentaDolares, crearCuentaDolar, closeDialogCrearCuentaDolares}) {

  return (
    <Dialog
    onClose={closeDialogCrearCuentaDolares}
    aria-labelledby="customized-dialog-title"
    open={mostrarDialogCrearCuentaDolares}
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: "16px",
        padding: "16px", 
        backgroundColor: "#f0f0f0",
        width: "500px",
      },
    }}
  >
    <IconButton
      aria-label="close"
      onClick={closeDialogCrearCuentaDolares}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Box sx={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
            <img src="assets/iconoPaginaVioleta.png" alt="" 
                style={{height:"80px"}}
            />
            <img src="assets/alerta.gif" alt="" 
                style={{height:"100px"}}/>
        </Box>
        <Typography variant="h4" color="error" sx={{fontWeight:"bold"}}>ATENCION!</Typography>
        <Typography variant="h6" color="black" sx={{fontWeight:"bold"}}>Vas a crear una cuenta en USD</Typography>
        <Typography variant="h6" color="black" sx={{fontWeight:"bold"}}>Estás seguro?</Typography>
        <Box sx={{display:"flex", gap:"20px", pt:2}}>
            <Button variant='contained' sx={{backgroundColor:"#6655D9"}} onClick={closeDialogCrearCuentaDolares}>Cancelar</Button>
            <Button variant='contained' sx={{backgroundColor:"#228B22"}} onClick={crearCuentaDolar}>Crear cuenta</Button>
        </Box>
    </DialogContent>
  </Dialog>
  );
}


CrearCuentaEnDolaresDialog.propTypes = {
    mostrarDialogCrearCuentaDolares: PropTypes.bool.isRequired,
    crearCuentaDolar: PropTypes.func.isRequired,
    closeDialogCrearCuentaDolares: PropTypes.func.isRequired
};

export default CrearCuentaEnDolaresDialog;