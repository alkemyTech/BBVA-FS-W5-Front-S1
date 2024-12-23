import {formatearFechaSimple, formatearNumero } from '../../../utils/helpers';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function detalleTransaccionDialog({mostrarDetalleTransaccion, transaccion, closeDetalleTransaccion}) {

  return (
    <Dialog
    onClose={closeDetalleTransaccion}
    aria-labelledby="customized-dialog-title"
    open={mostrarDetalleTransaccion}
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
        Detalle de la Transacción
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={closeDetalleTransaccion}
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
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - Monto:
        </Typography>
        <Typography variant="h7" sx={{color:"#228B22"}}>
         ${formatearNumero(transaccion.amount)}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
        - Moneda:
        </Typography>
        <Typography variant="h7" sx={{color: transaccion.currencyType == "USD" ? "#228B22" : "#00aae4"}}>
         {transaccion.currencyType}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - Tipo de Transacción:
        </Typography>
        <Typography variant="h7" color="black">
          {transaccion.type == "deposit" ? "Depósito" : "Pago"}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - Descripción:
        </Typography>
        <Typography variant="h7" color="black">
          {transaccion.description}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - Fecha:
        </Typography>
        <Typography variant="h7" color="black">
          {formatearFechaSimple(transaccion.transactionDate)}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - Titular cuenta:
        </Typography>
        <Typography variant="h7" color="black">
          {transaccion.titular}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - CBU origen:
        </Typography>
        <Typography variant="h7" color="black">
          {transaccion.cuenta}
        </Typography>
      </Box>
      {transaccion.cuentaDestino != null && (
        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"7px"}}>
            <Typography variant="h7" sx={{fontWeight:"bold"}}>
            - CBU destino:
            </Typography>
            <Typography variant="h7" color="black">
            {transaccion.cuentaDestino}
            </Typography>
        </Box>
      )}
    </DialogContent>
  </Dialog>
  );
}


detalleTransaccionDialog.propTypes = {
  mostrarDetalleTransaccion: PropTypes.bool.isRequired,
  transaccion: PropTypes.object.isRequired,
  closeDetalleTransaccion: PropTypes.func.isRequired
};

export default detalleTransaccionDialog;