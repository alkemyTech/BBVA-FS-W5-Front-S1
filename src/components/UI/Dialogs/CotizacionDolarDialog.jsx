import { formatearFechaSimple } from '../../../utils/helpers';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function CotizacionDolarDialog({mostrarCotizacion, infoDolar, closeInfoDolar}) {

  return (
    <Dialog
    onClose={closeInfoDolar}
    aria-labelledby="customized-dialog-title"
    open={mostrarCotizacion}
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: "16px",
        padding: "16px", 
        backgroundColor: "#f0f0f0",
        width: "500px",
      },
    }}
  >
    <DialogTitle sx={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
      <img src="assets/iconoPaginaVioleta.png" alt="" 
        style={{height:"50px"}}
      />
      <Typography variant="h5" color="initial" sx={{fontWeight:"bold", color:"#6655D9"}}>
        Cotización del Dólar Oficial
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={closeInfoDolar}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent dividers sx={{display:"flex", flexDirection:"column", gap:"8px"}}>
      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"10px"}}>
        <Typography variant="h6" sx={{fontWeight:"bold"}}>
          Valor de compra:
        </Typography>
        <Typography variant="h6" sx={{color:"#228B22"}}>
          ${infoDolar.compra}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"10px"}}>
        <Typography variant="h6" sx={{fontWeight:"bold"}}>
          Valor de Venta:
        </Typography>
        <Typography variant="h6" sx={{color:"#228B22"}}>
          ${infoDolar.venta}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"10px"}}>
        <Typography variant="h6" sx={{fontWeight:"bold"}}>
          Fecha de Actualización:
        </Typography>
        <Typography variant="h6" color="#00aae4">
          {formatearFechaSimple(infoDolar.fechaActualizacion)}
        </Typography>
      </Box>
    </DialogContent>
  </Dialog>
  );
}


CotizacionDolarDialog.propTypes = {
  mostrarCotizacion: PropTypes.bool.isRequired,
  infoDolar: PropTypes.object.isRequired,
  closeInfoDolar: PropTypes.func.isRequired
};

export default CotizacionDolarDialog;