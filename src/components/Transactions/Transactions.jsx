import Grid from '@mui/material/Grid2';
import {Typography, Pagination, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, MenuItem, IconButton, Select,
FormControl, InputLabel} from '@mui/material';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { GrTransaction } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";
import DetalleTransaccionDialog from "../UI/Dialogs/DetalleTransaccionDialog";
import { useNavigate } from 'react-router-dom';
import { formatearFechaSimple } from '../../utils/helpers';

export default function Transactions() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);  
    const [page, setPage] = useState(1);
    const itemsPerPage = 10; 
    const [currencyFilter, setCurrencyFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [amountFilter, setAmountFilter] = useState("ALL");
    const [transaction, setTransaction] = useState({
        amount: "",
        currencyType: "",
        type: "",
        description: "",
        transactionDate: "",
        titular: "",
        cuenta: "",
        cuentaDestino: "",
    });
    const [mostrarDetalleTransaccion, setMostrarDetalleTransaccion] = useState(false);

    const openDetalleTransaccion = (transaction) => {

        setTransaction({
            amount: transaction.amount,
            currencyType: transaction.currencyType,
            type: transaction.type,
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            titular: transaction.titular,
            cuenta: transaction.cuenta,
            cuentaDestino: transaction.cuentaDestino
        })
        
        setMostrarDetalleTransaccion(true);
    }

    const closeDetalleTransaccion = () => {
        setMostrarDetalleTransaccion(false);
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token == null) {
            navigate("/")
        }   
    }, [navigate])

    useEffect(() => {
        fetchTransactions();
    }, [page, typeFilter, currencyFilter, amountFilter]);

    const fetchTransactions = async () => {
        try {
            const endpoint = typeFilter === "deposit"
                ? `/transactions/deposits?page=${page - 1}&size=${itemsPerPage}`
                : typeFilter === "payment"
                    ? `/transactions/payments?page=${page - 1}&size=${itemsPerPage}`
                    : currencyFilter === "ARS"
                        ? `/transactions/ARS?page=${page - 1}&size=${itemsPerPage}`
                        : currencyFilter === "USD"
                            ? `/transactions/USD?page=${page - 1}&size=${itemsPerPage}`
                            : amountFilter === "OrderByAmountAsc"
                                ? `/transactions/OrderByAmountAsc?page=${page - 1}&size=${itemsPerPage}`
                                : amountFilter === "OrderByAmountDesc"
                                    ? `/transactions/OrderByAmountDesc?page=${page - 1}&size=${itemsPerPage}`
                                    : `/transactions?page=${page - 1}&size=${itemsPerPage}`;

            const response = await apiConfig.get(endpoint);
            setTransactions(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleCurrencyChange = (event) => {
        setCurrencyFilter(event.target.value);
        setTypeFilter("ALL");
        setAmountFilter("ALL");
        setPage(1);
    };

    const handleTypeChange = (event) => {
        setTypeFilter(event.target.value);
        setCurrencyFilter("ALL");
        setAmountFilter("ALL");
        setPage(1);
    };

    const handleAmountChange = (event) => {
        setAmountFilter(event.target.value);
        setCurrencyFilter("ALL");
        setTypeFilter("ALL");
        setPage(1);
    }

    return (
        <Grid container sx={{ justifyContent: "center", textAlign: "center", marginTop: "10px" }} spacing={2}>
            <Grid item size={12}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }} >
                    MIS MOVIMIENTOS
                </Typography>
            </Grid>
            <Grid item size={9.1}>
            <Paper 
                    elevation={3} sx={{
                        m: '20px',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        
                    }}
                    >
                <Grid container sx={{justifyContent:"space-around",pt:"20px"}} spacing={2}>
   

                    
                    <Grid item size={3}>
                        <FormControl fullWidth>
                            <InputLabel>Filtros por tipo</InputLabel>
                            <Select
                                label="Filtrar por Tipo"
                                value={typeFilter}
                                onChange={handleTypeChange}
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="ALL">Todos los tipos</MenuItem>
                                <MenuItem value="deposit">Depósitos</MenuItem>
                                <MenuItem value="payment">Pagos</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item size={3}>
                        <FormControl fullWidth>
                            <InputLabel>Filtros por Moneda</InputLabel>

                            <Select
                                label="Filtrar por Moneda"
                                value={currencyFilter}
                                onChange={handleCurrencyChange}
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="ALL">Todas las monedas</MenuItem>
                                <MenuItem value="ARS">ARS</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item size={3}>
                        <FormControl fullWidth>
                            <InputLabel>Filtros por Monto</InputLabel>

                            <Select
                                label="Filtrar por Monto"
                                value={amountFilter}
                                onChange={handleAmountChange}
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="ALL">Sin orden de monto</MenuItem>
                                <MenuItem value="OrderByAmountAsc">Orden ASC</MenuItem>
                                <MenuItem value="OrderByAmountDesc">Orden Desc</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
            <Grid item size={8} sx={{ width: "75vw" }}>
                <Grid container>
                    <Grid item size={12} sx={{ background: "#6655D9" }}>

                    </Grid>
                    <Grid item size={12}>
                        {transactions.length > 0 ? (
                            <>
                                <TableContainer component={Paper} sx={{ height: "88.9vh" }} variant="elevation" elevation={5}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Tipo</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Descripcion</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Monto</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Moneda</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Fecha</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Detalle</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {transactions.map((transaction) => (
                                                <TableRow
                                                    key={transaction.id}
                                                >
                                                    <TableCell align='center'>
                                                        <Grid container>
                                                            <Grid item size={2}>
                                                                {transaction.type === "payment" ?
                                                                    <GrTransaction style={{ color: "red", fontSize: "23PX" }} /> :
                                                                    <FaArrowDown style={{ color: "green", fontSize: "20PX" }} />}
                                                            </Grid>
                                                            <Grid item size={9}>
                                                                <Typography variant='p'>
                                                                    {transaction.type == "deposit" ? "DEPÓSITO" : "PAGO"}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        <Typography>
                                                            {transaction.description}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell sx={{ color: transaction.type === "payment" ? "red" : "green", fontWeight: "bold", textAlign: "center" }}>
                                                        {transaction.type === "payment" ? "-" : "+"}
                                                        {transaction.amount.toLocaleString("es-AR", { minimumFractionDigits: 0 })}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "center" }}>
                                                        {transaction.currencyType === "ARS" ? "ARS" : "USD"}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "center" }}>
                                                        {formatearFechaSimple(transaction.transactionDate)}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "center" }}>
                                                        <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold" }}
                                                           onClick={()=> openDetalleTransaccion(transaction)}>
                                                            <ReceiptIcon sx={{ fontSize: "30px", color: "#6655D9" }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    shape='rounded'
                                    count={totalPages}
                                    page={page}
                                    onChange={handleChangePage}
                                    color="primary"
                                    sx={{ display: "flex", justifyContent: "center", marginTop: 1, background: "#eee", marginBottom: 1 }}
                                />

                            </>
                        ) :
                            <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes movimientos</Typography>
                        }
                    </Grid>
                </Grid>

            </Grid>

            {mostrarDetalleTransaccion && (
                <DetalleTransaccionDialog
                    mostrarDetalleTransaccion={mostrarDetalleTransaccion}
                    transaccion={transaction}
                    closeDetalleTransaccion={closeDetalleTransaccion}
                />
            )}
        </Grid>
    )
}