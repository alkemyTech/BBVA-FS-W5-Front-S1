import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import apiConfig from "../../Config/axiosConfig";

export default function MyAccount() {
    const [userProfile, setUserProfile] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await apiConfig.get("/users/userProfile");
                console.log("User Profile Response:", response.data);
                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching userProfile:", error);
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await apiConfig.get("/accounts/");
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await apiConfig.get("/contacts/");
                setContacts(response.data);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };
        fetchContacts();
    }, []);



    return (
        <Grid container sx={{ p: 2, m: 5, alignItems: "start" }} spacing={5}>
            {/* Columna izquierda */}
            <Grid item size={6}>
                <Grid container spacing={3}>
                    {/* Tarjeta de Perfil */}
                    <Grid item size={6}>
                        <Card variant="elevation" elevation={5} sx={{ height: "100%" }}>
                            <CardHeader
                            title={`${userProfile.firstName} ${userProfile.lastName}`}
                            sx={{backgroundColor: "#6a0dad",color: "#ffffff",textAlign: "center",fontWeight: "bold", fontSize: "1.5rem"}}
                            />
                            <CardContent sx={{ textAlign: "center" }}>                              
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, fontSize: "1.3rem"}}>
                                    {userProfile.email || "email@example.com"}
                                </Typography>
                                <Avatar
                                    sx={{ width: 300, height: 300, margin: "0 auto", backgroundColor: "grey" }}

                                />
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                    Miembro desde: {userProfile.creationDate || "01/01/2020"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Información del Usuario */}
                    <Grid item size={6}>
                        <Card variant="elevation" elevation={5} sx={{ height: "100%" }}>
                            <CardHeader
                                title="Información del Usuario"
                                sx={{
                                    backgroundColor: "#6a0dad",
                                    color: "#ffffff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                }}
                            />
                            <CardContent>
                                {/* Nombre */}
                                <TextField
                                    label="Nombre"
                                    value={userProfile.firstName || "Nombre"}
                                    onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                {/* Apellido */}
                                <TextField
                                    label="Apellido"
                                    value={userProfile.lastName || "Apellido"}
                                    onChange={(e) => setUserProfile({ ...userProfile, lastName: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                {/* Email */}
                                <TextField
                                    label="Email"
                                    value={userProfile.email || "email@example.com"}
                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                {/* Contraseña */}
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    value={userProfile.password || "Contraseña"}
                                    onChange={(e) => setUserProfile({ ...userProfile, password: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Tabla de Cuentas */}
                <Card variant="elevation" elevation={5} sx={{ mt: 3 }}>
                    <CardHeader
                        title="Cuentas"
                        sx={{
                            backgroundColor: "#6a0dad",
                            color: "#ffffff",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}
                    />
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Moneda
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Balance
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            CBU
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Límite de Transacción
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {accounts.map((account) => (
                                        <TableRow key={account.cbu}>
                                            <TableCell align="center">{account.currency || "N/A"}</TableCell>
                                            <TableCell align="center">${account.balance || "0.00"}</TableCell>
                                            <TableCell align="center">{account.cbu || "N/A"}</TableCell>
                                            <TableCell align="center">
                                                <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                    <Typography variant="body2" sx={{ m: "auto" }}>
                                                        ${account.transactionLimit || "Sin límite"}
                                                    </Typography>
                                                    <Button color="primary" sx={{ p: 0 }}>
                                                        <EditIcon />
                                                    </Button>
                                                </Box>
                                            </TableCell>

                                            {/* Columna Acciones separada */}
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDeleteAccount(account.cbu)}
                                                >
                                                    Dar de Baja
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>

            {/* Columna derecha */}
            <Grid item size={6}>
                {/* Contactos Agendados */}
                <Card variant="elevation" elevation={5}>
                    <CardHeader
                        title="Contactos Agendados"
                        sx={{
                            backgroundColor: "#6a0dad",
                            color: "#ffffff",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                        }}
                    />
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Nombre
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            CBU
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                            Moneda
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contacts.map((contact) => (
                                        <TableRow key={contact.email}>
                                            <TableCell align="center">{contact.name || "Nombre"}</TableCell>
                                            <TableCell align="center">{contact.phone || "+54 123 456"}</TableCell>
                                            <TableCell align="center">{contact.email || "email@example.com"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

