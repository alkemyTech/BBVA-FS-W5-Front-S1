import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import ChairIcon from "@mui/icons-material/Chair";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function Login() {
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
      spacing={4}
      sx={{
        background:
          "linear-gradient(90deg, rgba(95,73,208,1) 0%, rgba(102,85,217,1) 39%, rgba(165,153,242,1) 92%)",
        flexDirection: "row",
        p: 17.1,
      }}
    >
      <Grid
        container
        spacing={2}
        size={7}
        sx={{ flexDirection: "column", p: 1 }}
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
            <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>
              Seguridad
            </Typography>

            <Typography variant="p" color="white">
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
          <ChairIcon sx={{ color: "white", fontSize: "20px" }}></ChairIcon>

          <Grid container spacing={1} sx={{ flexDirection: "column" }}>
            <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>
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
            <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>
              Confiabilidad
            </Typography>

            <Typography variant="p" color="white">
              La billetera digital confiable que te acompaña de manera constante
              y precisa.
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
            <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>
              Versatilidad
            </Typography>

            <Typography variant="p" color="white">
              Con DiMo, disfruta de la versatilidad para adaptarte a múltiples
              opciones de pago y servicios.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container size={5} sx={{ p: 3 }}>
        <Card
          variant="elevation"
          elevation={10}
          sx={{ backgroundColor: "white", width: "90%" }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <Typography
              variant="h4"
              color="#5F49D7"
              sx={{ fontWeight: "bold" }}
            >
              Iniciar Sesión
            </Typography>
            <CustomTextField id="" label="E-mail" size="small" />
            <CustomTextField id="" label="Contraseña" size="small" />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#6655D9" }}
            >
              Ingresar
            </Button>

            <Grid
              container
              spacing={0}
              alignItems="center"
              flexDirection="column"
            >
              <Typography
                variant="h6"
                color="#373738"
                sx={{ fontSize: "medium" }}
              >
                Todavía no tenes una cuenta?
              </Typography>
              <Typography
                variant="p"
                color="#A599F2"
                sx={{ fontSize: "medium", cursor: "pointer" }}
              >
                Registrate acá
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
