import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography,TextField, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function EditarDatosDePerfilDialog({mostrarDialogEditarDatosDePerfil, funcionEditar, cerrarDialogEditarDatosDePerfil, datoAnterior, datoAeditar}) {

    const[nuevoDato, setNuevoDato] = useState({
      dato: ""
    });

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    
    const changePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };

    useEffect(()=> {
      setNuevoDato({
        dato: datoAnterior
      });
    }, [datoAnterior])
    
    const [errores, setErrores] = useState({});
    
    const presenciaDeErrores = Object.values(errores).some(
      (valor) => valor != null
    );

    const validarCampo = (campo, valor) => {
        
          if (campo === "contraseña" && (valor.length < 6 || valor.length > 20) && valor != ""
          ) {
            setErrores((errores) => ({
              ...errores,
              contraseña: "La contraseña debe ser de entre 6 y 20 caracteres.",
            }));
          }
      
          if (campo === "contraseña" && ((valor.length >= 6 && valor.length <= 20) || valor === "")
          ) {
            setErrores((errores) => ({
              ...errores,
              contraseña: null,
            }));
          }

          if (campo === "contraseñaConfirmacion" && (valor.length < 6 || valor.length > 20) && valor != ""
          ) {
            setErrores((errores) => ({
              ...errores,
              contraseñaConfirmacion: "La contraseña debe ser de entre 6 y 20 caracteres.",
            }));
          }
      
          if (campo === "contraseñaConfirmacion" && ((valor.length >= 6 && valor.length <= 20) || valor === "")
          ) {
            setErrores((errores) => ({
              ...errores,
              contraseñaConfirmacion: null,
            }));
          }


          if (campo === "contraseñaConfirmacion" && valor != nuevoDato.dato && valor != "") {
            setErrores((errores) => ({
              ...errores,
              contraseñaConfirmacion: "Las contraseñas no coinciden!",
            }));
          }
          
          if (campo === "contraseñaConfirmacion" && (valor == nuevoDato.dato || valor === "")) {
            setErrores((errores) => ({
              ...errores,
              contraseñaConfirmacion: null
            }));
          }
    };

    const handleCloseEditarDatosDePerfil= () => {
      setNuevoDato({
        dato: datoAnterior
      })
      setErrores((errores) => ({
        ...errores,
        nombre: null,
      }));
      cerrarDialogEditarDatosDePerfil ();
    }

    const textFieldStyle = {
      width: "85%",
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
    onClose={() => handleCloseEditarDatosDePerfil ()}
    aria-labelledby="customized-dialog-title"
    open={mostrarDialogEditarDatosDePerfil}
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
        {"Editar " + datoAeditar + " de Usuario"}
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={() => handleCloseEditarDatosDePerfil ()}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent dividers sx={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap: datoAeditar == "Contraseña" ? "30px" : "none"}}> 
       {datoAeditar == "Nombre" && (
           <TextField
            type="text"
            label="Nombre de Usuario"
            size="small"
            value={nuevoDato.dato}
            onChange={(e) => setNuevoDato({...nuevoDato, dato: e.target.value})}
            sx={textFieldStyle}
        />
       )}
       {datoAeditar == "Apellido" && (
           <TextField
            type="text"
            label="Apellido"
            size="small"
            value={nuevoDato.dato}
            onChange={(e) => setNuevoDato({...nuevoDato, dato: e.target.value})}
            sx={textFieldStyle}
        />
       )}
       {datoAeditar == "Contraseña" && (
        <>
         <TextField
           type={passwordVisibility ? "text" : "password"}
          label="Contraseña"
          name="contraseña"
          size="small"
          value={nuevoDato.dato}
          error={Boolean(errores.contraseña)}
          helperText={errores.contraseña}
          onChange={(e) => setNuevoDato({...nuevoDato, dato: e.target.value})}
          onBlur={(e) => validarCampo("contraseña", e.target.value)}
          sx={textFieldStyle}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={changePasswordVisibility}
                  edge="end"
                  sx={{ p: 1, color: "#5F49D7" }}
                >
                  {passwordVisibility ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type={passwordVisibility ? "text" : "password"}
          label="Repetir contraseña"
          name="contraseñaConfirmacion"
          size="small"
          error={Boolean(errores.contraseñaConfirmacion)}
          helperText={errores.contraseñaConfirmacion}
          onBlur={(e) => validarCampo("contraseñaConfirmacion", e.target.value)}
          sx={textFieldStyle}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={changePasswordVisibility}
                  edge="end"
                  sx={{ p: 1, color: "#5F49D7" }}
                >
                  {passwordVisibility ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </>
       )}
    </DialogContent>
    <DialogActions sx={{justifyContent:"center", gap:"25px", pt:2}}>
        <Button onClick={() => handleCloseEditarDatosDePerfil ()} variant='outlined' color="error">
            Cancelar
        </Button>
            <Button
              onClick={() => funcionEditar(nuevoDato.dato)}
              disabled={presenciaDeErrores || nuevoDato.dato == ""}
              variant='contained'
              sx={{background:"#6655D9"}}
            >
              Confirmar
            </Button>
        </DialogActions>
  </Dialog>
  )
}


EditarDatosDePerfilDialog.propTypes = {
    mostrarDialogEditarDatosDePerfil: PropTypes.bool.isRequired,
    funcionEditar: PropTypes.func.isRequired,
    cerrarDialogEditarDatosDePerfil: PropTypes.func.isRequired,
    datoAnterior: PropTypes.string.isRequired,
    datoAeditar: PropTypes.string.isRequired,
};

export default EditarDatosDePerfilDialog;