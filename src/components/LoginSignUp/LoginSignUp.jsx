import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import ChairIcon from "@mui/icons-material/Chair";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginSignUp({ isLogin }) {
  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };

  const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#6655D9",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#6655D9",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#6655D9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6655D9",
      },
    },
  });

  return (
    <Grid
      container
      sx={{
        background:
          "linear-gradient(30deg, rgba(122,15,244,1) 30%, rgba(171,107,249,1) 70%)",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
      }}
    >
      
        <Grid item size={7}>
          <Grid
            container
            spacing={4}
            sx={{
              flexDirection: "column",
              p: 5,
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Typography
                variant="h3"
                color="white"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src="/public/assets/iconoPaginaVioleta.png"
                  alt=""
                  style={{ height: "45px" }}
                />
                DiMo
              </Typography>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{ flexDirection: "row", alignItems: "baseline" }}
            >
              <SecurityIcon
                sx={{ color: "white", fontSize: "20px" }}
              ></SecurityIcon>

              <Grid container spacing={1} sx={{ flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  Seguridad
                </Typography>

                <Typography variant="p" color="white">
                  Seguridad en cada transacción, garantizando la protección de
                  tus datos.
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{ flexDirection: "row", alignItems: "baseline" }}
            >
              <ChairIcon sx={{ color: "white", fontSize: "20px" }}></ChairIcon>

              <Grid container spacing={1} sx={{ flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  Comodidad
                </Typography>

                <Typography variant="p" color="white">
                  Accede a tu dinero con comodidad desde cualquier lugar, en
                  cualquier momento, con DiMo.
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{ flexDirection: "row", alignItems: "baseline" }}
            >
              <AssuredWorkloadIcon
                sx={{ color: "white", fontSize: "20px" }}
              ></AssuredWorkloadIcon>

              <Grid container spacing={1} sx={{ flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  Confiabilidad
                </Typography>

                <Typography variant="p" color="white">
                  La billetera digital confiable que te acompaña de manera
                  constante y precisa.
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{ flexDirection: "row", alignItems: "baseline" }}
            >
              <AutoFixHighIcon
                sx={{ color: "white", fontSize: "20px" }}
              ></AutoFixHighIcon>

              <Grid container spacing={1} sx={{ flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  Versatilidad
                </Typography>

                <Typography variant="p" color="white">
                  Con DiMo, disfruta de la versatilidad para adaptarte a
                  múltiples opciones de pago y servicios.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      

      <Grid item size={5} >
        <Grid container sx={{ p: 3 }}>
          <Card
            variant="elevation"
            elevation={20}
            sx={{ backgroundColor: "#e8e8e8", width:"90%" }}
          >
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: isLogin ? "40px" : "30px" }}
            >
              <Typography
                variant="h4"
                color="#6655D9"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {isLogin == true ? "Iniciar Sesión": "Registrarse"}
              </Typography>
              {!isLogin && (
                <>
                <CustomTextField id="" label="Nombre" size="small" />
                <CustomTextField id="" label="Apellido" size="small" />
                </>
              )}
              <CustomTextField id="" label="E-mail" size="small" />
              <CustomTextField id="" label="Password" size="small" />
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#6655D9" }}
              >
                {isLogin == true ? "Ingresar": "Crear Cuenta"}
              </Button>
              

              {isLogin && (
              
              <Grid
                container
                spacing={1.5}
                alignItems="center"
                flexDirection="column"
              >
                
                <Typography
                  variant="p"
                  color="#373738"
                  sx={{ fontSize: "medium" }}
                >
                  Todavía no tenes una cuenta?
                </Typography>
                <Typography
                  variant="p"
                  fontWeight="bold"
                  color="#6655D9"
                  sx={{ cursor: "pointer" }}
                  onClick={handleNavigateSignUp}
                >
                  Registrate acá
                </Typography>
                
                
              </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

LoginSignUp.propTypes = {
  isLogin: PropTypes.string.isRequired,
};
