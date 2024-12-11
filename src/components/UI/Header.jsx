import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';

export default function Header() {

    return(

    <Grid container sx={{ backgroundColor: "#5F49D7", color: 'white', width: '100%', marginBottom: "5vh" }}>
        <Grid item size={12} sm={6}>
            <Typography variant="h6" component="div" textAlign={"left"} paddingLeft={"2vh"}>
            </Typography>
        </Grid>
        <Grid item size={12}>
            <Grid container justifyContent={"flex-end"}>
                <Grid item size={2}>
                    <Typography variant="body1" sx={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
                        Plazo fijos
                    </Typography>
                </Grid>
                <Grid item size={2}>
                    <Typography variant="body1" sx={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
                        Transferencias
                    </Typography>
                </Grid>
                <Grid item size={2}>
                    <Typography variant="body1" sx={{ color: 'white', textDecoration: 'none', textAlign: 'center' }}>
                        Mis pagos
                    </Typography>
                </Grid>
                <Grid item size={2}>
                    <Avatar sx={{ bgcolor: "red", textAlign: 'center' }}>
                        <AssignmentIcon />
                    </Avatar>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}