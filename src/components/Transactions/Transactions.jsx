import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Box, Pagination, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, MenuItem , TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import MovingIcon from '@mui/icons-material/Moving';
import { GrTransaction } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);  // Estado para manejar el total de páginas
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 10;  // Número de elementos por página
    const [currencyFilter, setCurrencyFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const filteredTransactions = transactions.filter(transaction => 
        (currencyFilter === "ALL" || transaction.currencyType === currencyFilter) &&
        (typeFilter==="ALL" || transaction.type ===typeFilter)
    );

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await apiConfig.get(`/transactions?page=${page - 1}&size=${itemsPerPage}`);  // Parámetro page y size

                const sortedTransactions = response.data.content
                    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
                setTransactions(sortedTransactions);
                setTotalPages(response.data.totalPages);  // Ajuste para manejar el total de páginas
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        fetchTransactions();
    }, [page,typeFilter,currencyFilter]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleCurrencyChange = (event) => {
        setCurrencyFilter(event.target.value);
    };

    const handleTypeChange = (event)=>{
        setTypeFilter(event.target.value);
    };

    return (
        <Grid container sx={{ height: "100vh", textAlign: "center", background: "#eee" }}>
            <Grid item size={12}>
                <Typography variant='H1' fontSize={"4vh"}>
                    Mis Transacciones
                </Typography>
            </Grid>
            <Grid item size={12}>
            <TextField
                    select
                    label="Filtrar por Moneda"
                    value={currencyFilter}
                    onChange={handleCurrencyChange}
                    sx={{ marginBottom: 3, minWidth:"125px" }}
                >
                    <MenuItem value="ALL">Todas</MenuItem>
                    <MenuItem value="ARS">ARS</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                </TextField>
                <TextField
                    select
                    label="Filtrar por Tipo"
                    value={typeFilter}
                    onChange={handleTypeChange}
                    sx={{ marginBottom: 3,minWidth:"125px" }}
                >
                    <MenuItem value="ALL">Todas</MenuItem>
                    <MenuItem value="deposit">Depositos</MenuItem>
                    <MenuItem value="payment">Pagos</MenuItem>
                </TextField>
            </Grid>
            <Grid item size={12}>
                <Card variant="elevation" elevation={5} sx={{ width: "50%", margin: "auto" }}>
                    <CardContent sx={{ background: "#A599F2" }}>
                        <Typography variant='h6' sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                            <MovingIcon sx={{ fontSize: "25px", color: "red" }} />
                            Transacciones
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ alignContent: "center" }}>
                        {filteredTransactions.length > 0 ? (
                            <>
                                <TableContainer component={Paper} sx={{ minHeight: "69.2vh" }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
                                                <TableCell sx={{ fontWeight: "bold" }}>Descripcion</TableCell>
                                                <TableCell sx={{ fontWeight: "bold" }}>Monto</TableCell>
                                                <TableCell sx={{ fontWeight: "bold" }}>Moneda</TableCell>
                                                <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredTransactions.map((transaction) => (
                                                <TableRow
                                                    key={transaction.id}
                                                >
                                                    <TableCell>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            {transaction.type === "payment" ?
                                                                <GrTransaction style={{
                                                                    color: "white", background: "red", fontSize: "28px",
                                                                    borderRadius: "15px", padding: "5px"
                                                                }} /> :
                                                                <FaArrowDown style={{
                                                                    color: "white", background: "green", fontSize: "27px",
                                                                    borderRadius: "15px", padding: "5px"
                                                                }} />}
                                                            <Typography variant='body1'>
                                                                {transaction.type == "deposit" ? "DEPÓSITO" : "PAGO"}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >{transaction.description} </TableCell>

                                                    <TableCell sx={{ color: transaction.type === "payment" ? "red" : "green" }}>
                                                        {transaction.type === "payment" ? "-" : "+"}
                                                        {transaction.amount.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                                    </TableCell>
                                                    <TableCell >{transaction.currencyType === "ARS" ? "ARS" : "USD"}</TableCell>
                                                    <TableCell >{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handleChangePage}
                                    color="primary"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                                />
                            </>
                        ) :
                            <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes movimientos</Typography>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}