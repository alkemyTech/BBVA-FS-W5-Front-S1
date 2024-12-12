import { Typography ,TextField, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Transactions() {

    return (
        <Grid container sx={{ height: "100vh", textAlign: "center", background: "#eee" }}>
            <Grid item size={12}>
                <Typography>
                    Comprobantes de transferencias
                </Typography>
            </Grid>
            <Grid item size={12}>
                <Grid container>
                    <Grid item size={6}>
                        <TextField
                            id="tipo-cuenta"
                            label="Tipo de cuenta"
                            select
                            sx={{ width: "50%" }}
                            variant="outlined"
                        >
                            <MenuItem value="ARS">ARS</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item size={6}>
                    <TextField
                            id="tipo-cuenta"
                            label="Tipo de cuenta"
                            select
                            sx={{ width: "50%" }}
                            variant="outlined"
                        >
                            <MenuItem value="ARS">ARS</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item size={12}>
                <Grid container>

                </Grid>

            </Grid>
        </Grid>

    );
}