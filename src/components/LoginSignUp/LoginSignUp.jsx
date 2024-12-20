import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import ChairIcon from "@mui/icons-material/Chair";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserAuthenticated } from "../../Redux/Slices/userAuthenticatedSlice";
import GenericSnackbar from "../UI/Snackbar/Snackbar";
import apiConfig from "../../Config/axiosConfig";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";
import CheckIcon from "@mui/icons-material/Check";

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
  const [usuarioReactivar, setUsuarioReactivar] = useState({
    email: "",
  });

  const [errores, setErrores] = useState({});

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNavigateSignUp = () => {
    navigate("/signUp");
  };

  const handleNavigateReactivate = () => {
    navigate("/reactivate");
  };

  const datosCompletos = (objeto) => {
    return Object.values(objeto).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  const presenciaDeErrores = Object.values(errores).some(
    (valor) => valor != null
  );

  const validarCampo = (campo, valor) => {
    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

    if (campo === "email" && !patronEmail.test(valor) && valor != "") {
      setErrores((errores) => ({
        ...errores,
        email: "El formato del email no es válido.",
      }));
    }

    if (campo === "email" && (patronEmail.test(valor) || valor === "")) {
      setErrores((errores) => ({
        ...errores,
        email: null,
      }));
    }

    if (
      campo === "contraseña" &&
      (valor.length < 6 || valor.length > 20) &&
      valor != ""
    ) {
      setErrores((errores) => ({
        ...errores,
        contraseña: "La contraseña debe ser de entre 6 y 20 caracteres.",
      }));
    }

    if (
      campo === "contraseña" &&
      ((valor.length >= 6 && valor.length <= 20) || valor === "")
    ) {
      setErrores((errores) => ({
        ...errores,
        contraseña: null,
      }));
    }
  };

  const manejarEnvio = async () => {
    let response;
    let tokenPayload;
    const duration = 2000;
    setSnackbarVisibility(false);
    setIsLoading(false);

    if (isLogin == true) {
      try {
        response = await apiConfig.post("/auth/login", {
          email: usuario.email,
          password: usuario.password,
        });
        tokenPayload = jwtDecode(response.data.token);
        dispatch(
          setUserAuthenticated({
            id: tokenPayload.jti,
            role: tokenPayload.role,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: tokenPayload.sub,
          })
        );
        localStorage.setItem("token", response.data.token);
        setLoadingScreen({
          message: "Iniciando Sesión",
          duration: duration,
        });
        setIsLoading(true);
        setTimeout(() => {
          navigate("/home");
        }, duration);
      } catch (e) {
        console.log(e);
        setSnackbar({
          status: "error",
          message: "ERROR! Credenciales inválidas!",
        });
        setSnackbarVisibility(true);
      }
      setUsuario({
        email: "",
        password: "",
      });
    }
    if (isLogin == false) {
      try {
        response = await apiConfig.post("/auth/register", {
          firstName: usuarioRegister.firstName,
          lastName: usuarioRegister.lastName,
          email: usuarioRegister.email,
          password: usuarioRegister.password,
        });

        setLoadingScreen({
          message: "Creando cuenta",
          duration: duration,
        });
        setIsLoading(true);

        setTimeout(() => {
          setSnackbar({
            status: "success",
            message: "Cuenta creada con éxito!",
          });
          setSnackbarVisibility(true);
          navigate("/");
        }, duration);
      } catch (e) {
        console.log(e);
      }
      setUsuarioRegister({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
    if (isLogin == "reactivate") {
      try {
        response = await apiConfig.post("/auth/reactivate", {
          email: usuarioReactivar.email,
        });
        setLoadingScreen({
          message: "Reactivando cuenta",
          duration: "2000",
        });
        setIsLoading(true);
        setTimeout(() => {
          navigate("/");
        }, duration);

        setTimeout(() => {
          setSnackbar({
            status: "success",
            message: "Cuenta reactivada con éxito!",
          });
          setSnackbarVisibility(true);
        }, duration + 100);
      } catch (e) {
        console.log(e);
        setSnackbar({
          status: "error",
          message: "Esta cuenta no esta dada de baja!",
        });
        setSnackbarVisibility(true);
      }
      setUsuarioReactivar({
        email: "",
      });
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#6655D9",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#505050",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#BBBBBB",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6655D9",
    },
    "& .MuiOutlinedInput-root.Mui-error fieldset": {
      borderColor: "red",
    },
    "& .MuiInputBase-input": {
      color: "#BBBBBB",
      "&:focus": {
        color: "#BBBBBB",
      },
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "red",
    },
  };

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
            <img
              src="/assets/navidad1.png"
              alt=""
              style={{ height: "170px" }}
            />
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ flexDirection: "row", alignItems: "baseline" }}
          >
            <SecurityIcon sx={{ color: "#A599F2", fontSize: "20px" }} />

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
            <AssuredWorkloadIcon sx={{ color: "#A599F2", fontSize: "20px" }} />

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
                {isLogin === true
                  ? "Iniciar Sesión"
                  : isLogin === false
                  ? "Registrarse"
                  : "Reactivación"}
              </Typography>
              {!isLogin && (
                <>
                  <TextField
                    id="firstName"
                    label="Nombre"
                    value={usuarioRegister.firstName}
                    onChange={(e) =>
                      setUsuarioRegister({
                        ...usuarioRegister,
                        firstName: e.target.value.replace(
                          /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                          ""
                        ),
                      })
                    }
                    size="small"
                    sx={textFieldStyle}
                    inputProps={{
                      inputMode: "text", 
                      pattern: "[a-zA-ZáéíóúÁÉÍÓÚñÑs]*", 
                    }}
                  />
                  <TextField
                    id="lastName"
                    label="Apellido"
                    value={usuarioRegister.lastName}
                    onChange={(e) =>
                      setUsuarioRegister({
                        ...usuarioRegister,
                        lastName: e.target.value.replace(
                          /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                          ""
                        ), 
                      })
                    }
                    size="small"
                    sx={textFieldStyle}
                    inputProps={{
                      inputMode: "text",
                      pattern: "[a-zA-ZáéíóúÁÉÍÓÚñÑs]*",
                    }}
                  />
                </>
              )}
              <TextField
                id=""
                type="text"
                label="E-mail"
                name="email"
                size="small"
                value={
                  isLogin === true
                    ? usuario.email
                    : isLogin === false
                    ? usuarioRegister.email
                    : usuarioReactivar.email
                }
                error={Boolean(errores.email)}
                helperText={errores.email}
                onChange={(e) =>
                  isLogin === true
                    ? setUsuario({ ...usuario, email: e.target.value })
                    : isLogin === false
                    ? setUsuarioRegister({
                        ...usuarioRegister,
                        email: e.target.value,
                      })
                    : setUsuarioReactivar({
                        ...usuarioReactivar,
                        email: e.target.value,
                      })
                }
                onBlur={(e) => validarCampo("email", e.target.value)}
                sx={textFieldStyle}
              />
              {(isLogin == true || isLogin == false) && (
                <TextField
                  id=""
                  type={passwordVisibility ? "text" : "password"}
                  label="Contraseña"
                  name="contraseña"
                  size="small"
                  value={
                    isLogin == true
                      ? usuario.password
                      : usuarioRegister.password
                  }
                  helperText={errores.contraseña}
                  error={Boolean(errores.contraseña)}
                  onChange={(e) =>
                    isLogin === true
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
                  onBlur={(e) => validarCampo("contraseña", e.target.value)}
                  sx={textFieldStyle}
                />
              )}

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
                    isLogin === true
                      ? usuario
                      : isLogin === false
                      ? usuarioRegister
                      : usuarioReactivar
                  ) || presenciaDeErrores
                }
                endIcon={
                  isLogin === true ? (
                    <LoginIcon />
                  ) : isLogin === false ? (
                    <HowToRegIcon />
                  ) : (
                    <CheckIcon />
                  )
                }
                onClick={manejarEnvio}
              >
                {isLogin === true
                  ? "Ingresar"
                  : isLogin === false
                  ? "Crear Cuenta"
                  : "Reactivar"}
              </Button>
              {isLogin == true && (
                <Grid item size={12}>
                  <Grid
                    container
                    spacing={1.5}
                    alignItems="center"
                    textAlign="center"
                  >
                    <Grid item size={12}>
                      <Typography
                        variant="p"
                        color="#e8e8e8"
                        sx={{
                          fontSize: "medium",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        ¿Todavía no tenes una cuenta?{"\n"}
                      </Typography>
                      <Typography
                        variant="p"
                        fontWeight="bold"
                        color="#6655D9"
                        sx={{ cursor: "pointer", textDecoration: "underline" }}
                        onClick={handleNavigateSignUp}
                      >
                        Registrate acá
                      </Typography>
                    </Grid>
                    <Grid item size={12}>
                      <Typography
                        variant="p"
                        color="#e8e8e8"
                        sx={{
                          fontSize: "medium",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        ¿Tu cuenta esta desactivada?{" "}
                      </Typography>
                      <Typography
                        variant="p"
                        fontWeight="bold"
                        color="#6655D9"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          marginTop: "8px",
                        }}
                        onClick={handleNavigateReactivate}
                      >
                        Reactivate acá
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {snackbarVisibility && (
        <GenericSnackbar
          status={snackbar.status}
          message={snackbar.message}
          visibility={snackbarVisibility}
        />
      )}
      {isLoading && (
        <LoadingScreen
          message={loadingScreen.message}
          duration={loadingScreen.duration}
        />
      )}
    </Grid>
  );
}

LoginSignUp.propTypes = {
  isLogin: PropTypes.string.isRequired,
};
