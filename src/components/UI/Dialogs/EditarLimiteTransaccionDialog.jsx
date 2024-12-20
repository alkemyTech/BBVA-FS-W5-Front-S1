import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { NumericFormat } from "react-number-format";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography,TextField, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import { useState } from 'react';

function EditarLimiteTransaccionDialog({mostrarDialogEditarLimiteTransaccion, funcionEditar ,cerrarDialogEditarLimiteTransaccion}) {

    const[nuevoLimiteTransaccion, setNuevoLimiteTransaccion] = useState({
        transactionLimit:"",
    });

  return (
    <Dialog
    onClose={cerrarDialogEditarLimiteTransaccion}
    aria-labelledby="customized-dialog-title"
    open={mostrarDialogEditarLimiteTransaccion}
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
        Editar Limite de Transacción
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={cerrarDialogEditarLimiteTransaccion}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
        <Typography variant="p" color="error" sx={{fontWeight:"bold"}}>Ingresá el nuevo límite de transacción</Typography>
        <NumericFormat
            thousandSeparator="."
            customInput={TextField}
            value={nuevoLimiteTransaccion.transactionLimit}
            onValueChange={(values) => {
                const { value } = values;
                setNuevoLimiteTransaccion({...nuevoLimiteTransaccion, transactionLimit: value });
                }}
            label="Limite de Transaccion"
            decimalSeparator=","
            decimalScale={0}
            fixedDecimalScale
            allowNegative={false}
            displayType="input"
            size="small"
            />
    </DialogContent>
    <DialogActions>
        <Button onClick={cerrarDialogEditarLimiteTransaccion} color="primary">
            Cancelar
        </Button>
            <Button
            onClick={() => funcionEditar(nuevoLimiteTransaccion.transactionLimit)}
            color="error"
        >
            Confirmar
            </Button>
        </DialogActions>
  </Dialog>
  );
}


EditarLimiteTransaccionDialog.propTypes = {
    mostrarDialogEditarLimiteTransaccion: PropTypes.bool.isRequired,
    funcionEditar: PropTypes.func.isRequired,
    cerrarDialogEditarLimiteTransaccion: PropTypes.func.isRequired,
};

export default EditarLimiteTransaccionDialog;