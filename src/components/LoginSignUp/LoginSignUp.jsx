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
        background: "radial-gradient(circle, rgba(68,48,119,1) 0%, rgba(64,38,111,1) 20%, rgba(53,25,101,1) 37%, rgba(47,18,96,1) 55%, rgba(27,9,61,1) 73%, rgba(8,1,25,1) 100%)",
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


      <Grid item size={5}>
  <Grid container sx={{ justifyContent: "center", p: 3 }}>
    <Card
      variant="elevation"
      elevation={20}
      sx={{
        backgroundColor: "rgba(34, 34, 34, 0.5)", // Color #222222 con 90% de opacidad
        width: "90%",
        maxWidth: "500px", // Limita el ancho del formulario
        backdropFilter: "blur(10px)", // Efecto de desenfoque
        borderRadius: "15px", // Bordes redondeados
        padding: "30px", // Espacio interno del formulario
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centra el contenido horizontalmente
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isLogin ? "40px" : "30px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          color="#FFFFFF" // Texto blanco para contraste
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </Typography>
        {!isLogin && (
          <>
            <CustomTextField
              id=""
              label="Nombre"
              size="small"
              InputProps={{
                sx: { color: "#FFFFFF" }, // Texto blanco
              }}
              InputLabelProps={{
                sx: { color: "#BBBBBB" }, // Color del placeholder
              }}
            />
            <CustomTextField
              id=""
              label="Apellido"
              size="small"
              InputProps={{
                sx: { color: "#FFFFFF" },
              }}
              InputLabelProps={{
                sx: { color: "#BBBBBB" },
              }}
            />
          </>
        )}
        <CustomTextField
          id=""
          label="E-mail"
          size="small"
          InputProps={{
            sx: { color: "#FFFFFF" },
          }}
          InputLabelProps={{
            sx: { color: "#BBBBBB" },
          }}
        />
        <CustomTextField
          id=""
          label="Password"
          size="small"
          InputProps={{
            sx: { color: "#FFFFFF" },
          }}
          InputLabelProps={{
            sx: { color: "#BBBBBB" },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#6655D9",
            "&:hover": {
              backgroundColor: "#5544C9",
            },
            width: "100%",
          }}
        >
          {isLogin ? "Ingresar" : "Crear Cuenta"}
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
              color="#FFFFFF" // Texto blanco para contraste
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
