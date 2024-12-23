import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { NumericFormat } from "react-number-format";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography,TextField, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';

function EditarLimiteTransaccionDialog({mostrarDialogEditarLimiteTransaccion, funcionEditar, transactionLimitAnterior, cerrarDialogEditarLimiteTransaccion}) {

    const[nuevoLimiteTransaccion, setNuevoLimiteTransaccion] = useState({
      transactionLimit: ""
    });

    useEffect(()=> {
      setNuevoLimiteTransaccion({
        transactionLimit: transactionLimitAnterior
      });
    }, [transactionLimitAnterior])
    
    const [errores, setErrores] = useState({});
    
    const presenciaDeErrores = Object.values(errores).some(
      (valor) => valor != null
    );
    
    const validarCampo = (campo, valor) => {

    if (campo === "limiteDeTransaccion") {

        const limiteDeTransaccion = parseFloat(
          valor.replace(/\./g, "").replace(",", ".")
        );

        if (limiteDeTransaccion == 0) {
          setErrores((errores) => ({
            ...errores,
            limiteDeTransaccion:
              "El límite de transacción no puede ser igual a 0.",
          }));
        } else {
          setErrores((errores) => ({
            ...errores,
            limiteDeTransaccion: null,
          }));
        }
      }
    }

    const handleCloseEditarLimiteDeTransaccion = () => {
      setNuevoLimiteTransaccion({
        transactionLimit: transactionLimitAnterior
      })
      setErrores((errores) => ({
        ...errores,
        limiteDeTransaccion: null,
      }));
      cerrarDialogEditarLimiteTransaccion ();
    }

    const textFieldStyle = {
      width: "75%",
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#6655D9",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#505050",
        },
      },
      "& .MuiInputLabel-root": {
        color: "black",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#6655D9",
      },
      "& .MuiOutlinedInput-root.Mui-error fieldset": {
        borderColor: "red",
      },
      "& .MuiInputBase-input": {
        color: "black",
        "&:focus": {
          color: "black",
        },
      },
      "& .MuiInputLabel-root.Mui-error": {
        color: "red",
      },
    };

  return (
    <Dialog
    onClose={() => handleCloseEditarLimiteDeTransaccion ()}
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
        Editar Límite de Transacción
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={() => handleCloseEditarLimiteDeTransaccion ()}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent dividers sx={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
        <NumericFormat
            thousandSeparator="."
            name='limiteDeTransaccion'
            customInput={TextField}
            error={Boolean(errores.limiteDeTransaccion)}
            helperText={errores.limiteDeTransaccion}
            value={nuevoLimiteTransaccion.transactionLimit}
            onValueChange={(values) => {
              const { value } = values;
              setNuevoLimiteTransaccion({...nuevoLimiteTransaccion, transactionLimit: value });
            }}
            label="Límite de Transacción "
            decimalSeparator=","
            decimalScale={0}
            fixedDecimalScale
            allowNegative={false}
            displayType="input"
            size="small"
            onBlur={(e) => validarCampo("limiteDeTransaccion", e.target.value)}
            sx={textFieldStyle}
            />
    </DialogContent>
    <DialogActions sx={{justifyContent:"center", gap:"25px", pt:2}}>
        <Button onClick={() => handleCloseEditarLimiteDeTransaccion ()} variant='outlined' color="error">
            Cancelar
        </Button>
            <Button
            onClick={() => funcionEditar(nuevoLimiteTransaccion.transactionLimit)}
            disabled={presenciaDeErrores}
            variant='contained'
            sx={{background:"#6655D9"}}
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
    transactionLimitAnterior: PropTypes.number.isRequired,
    cerrarDialogEditarLimiteTransaccion: PropTypes.func.isRequired,
};

export default EditarLimiteTransaccionDialog;