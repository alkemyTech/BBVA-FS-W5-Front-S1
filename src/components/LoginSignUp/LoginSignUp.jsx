import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import ChairIcon from "@mui/icons-material/Chair";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LoginIcon from "@mui/icons-material/Login";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

export default function LoginSignUp({ isLogin }) {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [usuarioRegister, setUsuarioRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState([]);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };

  const datosCompletos = (formulario) => {
    return Object.values(formulario).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  const presenciaDeErrores = Object.values(errores).some(
    (valor) => valor != null
  );

  const validarCampo = (campo, valor) => {
    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (campo === "email" && !patronEmail.test(valor) && valor != "") {
      setErrores((errores) => ({
        ...errores,
        email: "El formato del email no es válido.",
      }));
    } else {
      setErrores((errores) => ({
        ...errores,
        email: null,
      }));
    }
  };

  const manejarEnvio = async () => {
    let response;

    if (isLogin == true) {
      try {
        response = await axios.post("http://localhost:8080/auth/login", {
          email: usuario.email,
          password: usuario.password,
        });
        alert(`Credenciales correctas!`);
        localStorage.setItem("token", response.data.token);
      } catch (e) {
        console.log(e);
        alert(`Credenciales invalidas!`);
        setUsuario({
          email: "",
          password: "",
        });
      }
    } else {
      //Registro de usuario.
      try {
        response = await axios.post("http://localhost:8080/auth/register", {
          firstName: usuarioRegister.firstName,
          lastName: usuarioRegister.lastName,
          email: usuarioRegister.email,
          password: usuarioRegister.password,
        });
        alert(`Usuario Creado Correctamente!`);
        navigate("/");
      } catch (e) {
        console.log(e);
        alert(`Formato Invalido de datos`);
        setUsuarioRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    }
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
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: "red",
    },
  });

  return (
    <Grid
      container
      sx={{
        background:
          "radial-gradient(circle, rgba(147,92,201,1) 0%, rgba(114,65,173,1) 20%, rgba(93,39,150,1) 38%, rgba(82,32,142,1) 55%, rgba(63,15,119,1) 73%, rgba(36,8,70,1) 100%)",
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
            p: 6.5,
          }}
        >
          <Grid item>
            <Typography
              variant="h3"
              color="#e8e8e8"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src="assets/prueba1.png"
                alt=""
                style={{ height: "200px" }}
              />
              
            </Typography>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ flexDirection: "row", alignItems: "baseline" }}
          >
            <SecurityIcon
              sx={{ color: "#A599F2", fontSize: "20px" }}
            ></SecurityIcon>

            <Grid container spacing={1} sx={{ flexDirection: "column" }}>
              <Typography
                variant="h5"
                color="#e8e8e8"
                sx={{ fontWeight: "bold" }}
              >
                Seguridad
              </Typography>

              <Typography variant="p" color="#e8e8e8">
                Seguridad en cada transacción, garantizando la protección de tus
                datos.
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ flexDirection: "row", alignItems: "baseline" }}
          >
            <ChairIcon sx={{ color: "#A599F2", fontSize: "20px" }}></ChairIcon>

            <Grid container spacing={1} sx={{ flexDirection: "column" }}>
              <Typography
                variant="h5"
                color="#e8e8e8"
                sx={{ fontWeight: "bold" }}
              >
                Comodidad
              </Typography>

              <Typography variant="p" color="#e8e8e8">
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
              sx={{ color: "#A599F2", fontSize: "20px" }}
            ></AssuredWorkloadIcon>

            <Grid container spacing={1} sx={{ flexDirection: "column" }}>
              <Typography
                variant="h5"
                color="#e8e8e8"
                sx={{ fontWeight: "bold" }}
              >
                Confiabilidad
              </Typography>

              <Typography variant="p" color="#e8e8e8">
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
              sx={{ color: "#A599F2", fontSize: "20px" }}
            ></AutoFixHighIcon>

            <Grid container spacing={1} sx={{ flexDirection: "column" }}>
              <Typography
                variant="h5"
                color="#e8e8e8"
                sx={{ fontWeight: "bold" }}
              >
                Versatilidad
              </Typography>

              <Typography variant="p" color="#e8e8e8">
                Con DiMo, disfruta de la versatilidad para adaptarte a múltiples
                opciones de pago y servicios.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item size={5}>
        <Grid container sx={{ p: 3 }}>
          <Card
            variant="elevation"
            elevation={20}
            sx={{
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "90%",
              maxWidth: "500px", 
              backdropFilter: "blur(10px)",
              borderRadius: "15px", 
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #505050",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <Typography
                variant="h4"
                color="#e8e8e8"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {isLogin == true ? "Iniciar Sesión" : "Registrarse"}
              </Typography>
              {!isLogin && (
                <>
                  <TextField
                    id=""
                    label="Nombre"
                    value={usuarioRegister.firstName}
                    onChange={(e) =>
                      setUsuarioRegister({
                        ...usuarioRegister,
                        firstName: e.target.value,
                      })
                    }
                    size="small"
                  />
                  <TextField
                    id=""
                    label="Apellido"
                    value={usuarioRegister.lastName}
                    onChange={(e) =>
                      setUsuarioRegister({
                        ...usuarioRegister,
                        lastName: e.target.value,
                      })
                    }
                    size="small"
                  />
                </>
              )}
              <TextField
                id=""
                type="text"
                label="E-mail"
                name="email"
                size="small"
                value={isLogin == true ? usuario.email : usuarioRegister.email}
                helperText={errores.email}
                error={Boolean(errores.email)}
                onChange={(e) =>
                  isLogin == true
                    ? setUsuario({ ...usuario, email: e.target.value })
                    : setUsuarioRegister({
                        ...usuarioRegister,
                        email: e.target.value,
                      })
                }
                onBlur={(e) => validarCampo("email", e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#FFFFFF",
                    backgroundColor: "rgba(0,0,0, 0.5)",
                  },
                  "& .MuiInputLabel-root": { color: "#BBBBBB" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#505050",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a1a1a1",
                    borderWidth: "1px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6655D9",
                    borderWidth: "1px",
                  },
                }}
              />

              <TextField
                id=""
                type={passwordVisibility ? "text" : "password"}
                label="Contraseña"
                size="small"
                value={
                  isLogin == true ? usuario.password : usuarioRegister.password
                }
                onChange={(e) =>
                  isLogin == true
                    ? setUsuario({ ...usuario, password: e.target.value })
                    : setUsuarioRegister({
                        ...usuarioRegister,
                        password: e.target.value,
                      })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={changePasswordVisibility}
                        edge="end"
                        sx={{ p: 1, color:"#5F49D7" }}
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
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#FFFFFF",
                    backgroundColor: "rgba(0,0,0, 0.5)",
                  },
                  "& .MuiInputLabel-root": { color: "#BBBBBB" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#505050",
                    borderWidth: "1px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a1a1a1",
                    borderWidth: "1px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6655D9",
                    borderWidth: "1px",
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#5F49D7",
                  "&.Mui-disabled": {
                    backgroundColor: "#cdcdcd",
                    color: "#666",
                  },
                }}
                disabled={
                  !datosCompletos(
                    isLogin == true ? usuario : usuarioRegister
                  ) || presenciaDeErrores
                }
                endIcon={<LoginIcon />}
                onClick={manejarEnvio}
              >
                {isLogin == true ? "Ingresar" : "Crear Cuenta"}
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
                    color="#e8e8e8"
                    sx={{ fontSize: "medium" }}
                  >
                    Todavía no tenes una cuenta?
                  </Typography>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    color="#6655D9"
                    sx={{ cursor: "pointer", textDecoration:"underline" }}
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
