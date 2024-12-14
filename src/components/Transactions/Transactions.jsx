import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Link as MuiLink, List, ListItem, Divider, Box, TextField, MenuItem, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import MovingIcon from '@mui/icons-material/Moving';
import { GrTransaction } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);  // Estado para manejar el total de páginas
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;  // Número de elementos por página

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await apiConfig.get(`/transactions?page=${page - 1}&size=${itemsPerPage}`);  // Parámetro page y size

                const sortedTransactions = response.data.content
                    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
                setTransactions(sortedTransactions);
                console.log(response.data.totalPages)
                setTotalPages(response.data.totalPages);  // Ajuste para manejar el total de páginas
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        fetchTransactions();
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Grid container sx={{ height: "100vh", textAlign: "center", background: "#eee" }}>
            <Grid item size={12}>
                <Typography>
                    Comprobantes de transferencias
                </Typography>
            </Grid>
            <Grid item size={12}>
                <Grid container>
                    <Grid item size={12}>
                        <Card variant="elevation" elevation={5} sx={{ width: "40%" }}>
                            <CardContent sx={{ background: "#A599F2" }}>
                                <Typography variant='h6' sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                                    <MovingIcon sx={{ fontSize: "25px", color: "red" }} />
                                    Movimientos
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardContent sx={{ alignContent: "center" }}>
                                {transactions.length > 0 ? (
                                    
                                        <List>
                                            {transactions.map((transaction) => (
                                                <>

                                                    <ListItem sx={{ padding: 0 }} key={transaction.cuenta}>
                                                        <MuiLink component={Link} to="/#" sx={{ textDecoration: "none", width: "100%", color: "black" }}>
                                                            <CardContent sx={{ width: "100%", '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "240px" }}>
                                                                    <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                                                                        <Box>
                                                                            {transaction.type === "payment" ?
                                                                                <GrTransaction style={{
                                                                                    color: "white", background: "grey", fontSize: "30px",
                                                                                    borderRadius: "15px", padding: "5px"
                                                                                }} /> :
                                                                                <FaArrowDown style={{
                                                                                    color: "white", background: "grey", fontSize: "30px",
                                                                                    borderRadius: "15px", padding: "5px"
                                                                                }} />
                                                                            }
                                                                        </Box>
                                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                            <Typography variant='p'>
                                                                                {(transaction.type).toUpperCase()}
                                                                            </Typography>
                                                                            <Typography variant='p'>
                                                                                {transaction.transactionDate}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                        <Typography variant='p' sx={{
                                                                            color: transaction.type == "payment" ? "red" : "green", display: "flex",
                                                                            flexDirection: "row", alignItems: "center", gap: "10px"
                                                                        }}>
                                                                            {transaction.type == "payment" ? "-" : "+"}
                                                                            {transaction.amount.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                                                            <Typography variant="body1" color="grey" fontWeight="bold">
                                                                                {transaction.currencyType == "ARS" ? " ARS" : " USD"}
                                                                            </Typography>
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </CardContent>
                                                        </MuiLink>
                                                    </ListItem>
                                                    <Divider />
                                                </>
                                            ))}
                                        <Pagination
                                            count={totalPages}  // Utilizamos el estado totalPages para la paginación
                                            page={page}
                                            onChange={handleChangePage}
                                            color="primary"
                                            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                                        />
                                        </List>
                                
                                ) :
                                    <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes movimientos</Typography>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}