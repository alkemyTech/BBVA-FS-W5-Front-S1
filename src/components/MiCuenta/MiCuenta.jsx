import Grid from '@mui/material/Grid2';
import { useEffect,useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function MiCuenta() {
    const { accountCbu } = useParams();
    const [balanceVisibility, setBalanceVisibility] = useState(true);
    const changeBalanceVisibility = () => {
        setBalanceVisibility(!balanceVisibility);
    };
    const [account, setAccounts] = useState({
        currency: "",
        transactionLimit: 0,
        balance: 0,
        cbu: "",
        creationDate: "",
        user: {
            firstName: "",
            lastName: "",
            email: "",
            creationDate: ""
        }
        });

    useEffect(() => {
        const fetchAccountsByCbu = async () => {
            try {
                const response = await apiConfig.get(`/accounts/${accountCbu}`)
                setAccounts({
                    currency: response.data.currency,
                    transactionLimit: response.data.transactionLimit,
                    balance: response.data.balance,
                    cbu: response.data.cbu,
                    creationDate: response.data.creationDate,
                    user: {
                        firstName: response.data.user.firstName,
                        lastName: response.data.user.lastName,
                        email: response.data.user.email,
                        creationDate: response.data.user.creationDate
                    }
                })
                console.log(response.data)
            }
            catch (error) {
                console.error("error fetching cbu", error);
            }
            
        }
        fetchAccountsByCbu();
    }, [])

    return (
        <Grid container>
            
            <Grid item size={5} key={account.cbu}>
                    <Card variant="elevation" elevation={5}>
                        <CardContent sx={{
                            background: account.currency == "ARS" ? "#00aae4" : "#228B22", display: "flex", flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Typography variant="h4" color="#e8e8e8" sx={{ textAlign: "left", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src={account.currency == "ARS" ? "assets/argentina.png" : "assets/estadosUnidos.png"} alt="" style={{ height: "40px" }} />
                                {account.currency}
                            </Typography>
                            <Button endIcon={<KeyboardArrowRightIcon />} 
                            sx={{ backgroundColor: "none", color: "white", fontWeight: "bold", fontSize: "12px" }}
                            onClick={()=> handleNavegar(`/accounts/${account.cbu}`)}
                            >
                                Ver mi cuenta
                            </Button>
                        </CardContent>
                        <CardContent>
                            <Grid container >
                                <Grid item size={6}>
                                    <Typography sx={{ color: "gray", textAlign: "left" }}>
                                        Dinero disponible:
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                                        <AttachMoneyIcon />
                                        <Typography sx={{ fontSize: "45px", color: "#12a14b" }}>
                                            {balanceVisibility ? account.balance.toLocaleString("es-AR", { minimumFractionDigits: 0 })
                                                : "**"}
                                        </Typography>
                                        <IconButton
                                            onClick={changeBalanceVisibility}
                                            edge="end"
                                        >
                                            {balanceVisibility ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item size={6} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                    <Typography sx={{ color: "gray" }}>
                                        Limite de Transacción:
                                        <Typography sx={{ fontWeight: "bold", fontSize: "25px", display: "flex", alignSelf: "center", color: "black" }}>
                                            ${account.transactionLimit.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                        </Typography>
                                    </Typography>

                                </Grid>
                                <Grid item size={12}>
                                    <Typography color="gray" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        CBU:
                                        <Typography color="black" sx={{ fontWeight: "bold", fontSize: "16px", fontStyle: "italic" }}>
                                            {account.cbu}
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
    );

}