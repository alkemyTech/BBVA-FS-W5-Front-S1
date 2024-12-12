import { Typography } from "@mui/material";
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
                        
                    </Grid>
                    <Grid item size={6}>

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