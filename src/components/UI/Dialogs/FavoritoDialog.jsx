import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box, Tooltip, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';

function FavoritoDialog({mostrarDetalleFavorito, favorito, closeDetalleFavorito}) {

    const navigate = useNavigate ();

    const handleNavigateSendMoney = (cbu, tipoCuenta) => {
        navigate(`/sendmoney/${cbu}/${tipoCuenta}`);
    }

  return (
    <Dialog
    onClose={closeDetalleFavorito}
    aria-labelledby="customized-dialog-title"
    open={mostrarDetalleFavorito}
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
      <GradeIcon sx={{ fontSize: "40px", color: "gold" }}/>
      <Typography variant="h4" color="initial" sx={{fontWeight:"bold", color:"#6655D9"}}>
        {favorito.firstName + " " + favorito.lastName}
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={closeDetalleFavorito}
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
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
          - Email:
        </Typography>
        <Typography variant="h7" sx={{color:"black"}}>
         {favorito.email}
        </Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"3px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
        - CBU cuenta ARS:
        </Typography>
          <Tooltip title="Enviar ARS" arrow placement="right"
              slotProps={{popper: {modifiers:[{name: 'offset', options:{offset:[0,-9]}}]}}}>
                  <Button size="medium" sx={{"&:hover":{fontWeight:"bold"}, color:"#00aae4"}}
                      onClick={()=> handleNavigateSendMoney(favorito.cuentaArs, "ARS")}>
                      {favorito.cuentaArs}
                  </Button>
          </Tooltip>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"7px"}}>
        <Typography variant="h7" sx={{fontWeight:"bold"}}>
            - CBU cuenta USD:
        </Typography>
        {favorito.cuentaUsd != null ? (
            <Tooltip title="Enviar USD" arrow placement="right"
                slotProps={{popper: {modifiers:[{name: 'offset', options:{offset:[0,-9]}}]}}}>
                    <Button size="small" sx={{"&:hover":{fontWeight:"bold"}, color:"#228B22"}}
                        onClick={()=> handleNavigateSendMoney(favorito.cuentaUsd, "USD")}>
                        {favorito.cuentaUsd}
                    </Button>
                </Tooltip>
            ) : ( "No tiene")}
        </Box>
    </DialogContent>
  </Dialog>
  );
}


FavoritoDialog.propTypes = {
  mostrarDetalleFavorito: PropTypes.bool.isRequired,
  favorito: PropTypes.object.isRequired,
  closeDetalleFavorito: PropTypes.func.isRequired
};

export default FavoritoDialog;