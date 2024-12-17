import Grid from '@mui/material/Grid2';
import {
  Typography, Pagination, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, MenuItem,
  IconButton, Select
} from '@mui/material';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import MovingIcon from '@mui/icons-material/Moving';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { GrTransaction } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);  // Estado para manejar el total de páginas
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;  // Número de elementos por página
    const [currencyFilter,setCurrencyFilter]=useState("ALL");
    const [typeFilter,setTypeFilter]=useState("ALL");


    const formatearFecha = (fechaOriginal) => {

        const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm:ss", {
            locale: es,
        }).toUpperCase();

        return fechaFormateada;
    };

    const infoTransactionsDetail = (amount, currencyType, type, description, transactionDate, cuenta, titular, cuentaDestino) => {
        Swal.fire({
            title: `<div style="display: flex; align-items: center; gap: 2px; justify-content:center">
                        <img src="assets/iconoPaginaVioleta.png" alt="Icono" style="height: 60px;">
                        <span style="color: #6655D9;">Detalles de la transacción</span>
                    </div>`,
            html: `
            <Div style="display: flex; flex-direction:column; gap:15px;">
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Monto: <p style="font-weight:bold; color: #228B22; font-size: 20px;">$${amount}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Tipo de cuenta: <p style="font-weight:bold; color: ${currencyType == "USD" ? "green" : "#00aae4"}; font-size: 20px;">${currencyType}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Tipo de transaccion: <p style="font-weight:bold; color: black; font-size: 20px;">${type == "deposit" ? "Depósito" : "Pago"}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Descripcion: <p style="font-weight:bold; color: black; font-size: 20px;">${description}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Fecha: <p style="font-weight:bold; color: black; font-size: 20px;">${formatearFecha(transactionDate)}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- CBU origen: <p style="font-weight:bold; color: black; font-size: 20px">${cuenta}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- Titular cuenta: <p style="font-weight:bold; color: black; font-size: 20px;">${titular}</p></h3>
                <h3 style="display: flex; flex-direction: row; gap: 10px; align-items: center;">- CBU destino: <p style="font-weight:bold; color: black; font-size: 20px">${type == "payment" ? cuentaDestino : "-------"}</p></h3>
            </Div>
            `
        })
    }

    useEffect(() => {
        fetchTransactions();
    }, [page, typeFilter]);

    const fetchTransactions = async () => {
        try {
            const endpoint = typeFilter === "deposit"
                ? `/transactions/deposits?page=${page - 1}&size=${itemsPerPage}`
                : typeFilter === "payment" 
                ? `/transactions/payments?page=${page - 1}&size=${itemsPerPage}`
                :`/transactions?page=${page - 1}&size=${itemsPerPage}`;
            
            const response = await apiConfig.get(endpoint);
            const sortedTransactions = response.data.content
                .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

            setTransactions(sortedTransactions);
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
    };

    const handleTypeChange = (event) => {
        setTypeFilter(event.target.value);
        setPage(1); 
    };

    const filteredTransactions = transactions.filter(transaction =>
        currencyFilter === "ALL" || transaction.currencyType === currencyFilter
    );

    return (
        <Grid container sx={{ width: "80vw",justifyContent:"center" }}>
            <Grid item size={12}>
                <Typography>
                    Titulo
                </Typography>

            </Grid>
            <Grid item size={6} sx={{background:"red"}}> 
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
             </Grid>
            <Grid item size={6}>
                <Select/>
            </Grid>
            <Grid item size={12}>
                    <Grid container>
                        <Grid item size={12} sx={{ background: "#6655D9" }}>
                            <Typography variant='h6' color="#e8e8e8" >
                                <MovingIcon sx={{ fontSize: "25px", color: "black" }} />
                                Movimientos
                            </Typography>
                        </Grid>
                        <Grid item size={12}>
                                {filteredTransactions.length > 0 ? (
                                    <>
                                        <TableContainer component={Paper}>
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
                                                <TableBody>
                                                    {filteredTransactions.map((transaction) => (
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
                                                                {formatearFecha(transaction.transactionDate)}
                                                            </TableCell>
                                                            <TableCell sx={{ textAlign: "center" }}>
                                                                <IconButton sx={{ gap: "5px", fontSize: "15px", fontWeight: "bold" }}
                                                                    onClick={() => infoTransactionsDetail(transaction.amount, transaction.currencyType, transaction.type, transaction.description, transaction.transactionDate, transaction.cuenta, transaction.titular, transaction.cuentaDestino)}>
                                                                    <ReceiptIcon sx={{ fontSize: "30px", color: "#6655D9" }} />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            <Pagination 
                                            shape='rounded'
                                            count={totalPages}
                                            page={page}
                                            onChange={handleChangePage}
                                            color="primary"
                                            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                                        />
                                        </TableContainer>

                                    </>
                                ) :
                                    <Typography variant="body1" color="grey" fontWeight="bold" sx={{ textAlign: "center" }}>Aún no tienes movimientos</Typography>
                                }
                        </Grid>
                    </Grid>
                
            </Grid>
        </Grid>
    )
}