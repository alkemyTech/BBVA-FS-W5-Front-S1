
import Grid from '@mui/material/Grid2';
import {
    Typography, Pagination, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, MenuItem,
    IconButton, Select,
    FormControl,
    InputLabel, Button, Card,
    Link as MuiLink, CardContent,
    TextField,
    Divider
} from '@mui/material';
import { useEffect, useState } from 'react';
import apiConfig from '../../Config/axiosConfig';
import { format } from "date-fns";
import { es, id } from "date-fns/locale";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';
import AlertaDialog from '../UI/Dialogs/ActivarDesactivarUserDialog';

export default function GestionUsuarios() {

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);  // Estado para manejar el total de páginas
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;  // Número de elementos por página
    const [borradoExitoso, setBorradoExitoso] = useState(false);
    const [asignacionExitosa, setAsignacionExitosa] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const [verUser, setVerUser] = useState(false);
    const [role, setRole] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [accion, setAccion] = useState("");
    const [idUsuarioAEliminar, setIdUsuarioAEliminar] = useState("");
    const [mailUsuarioAEliminar, setEmailUsuarioAEliminar] = useState("");

    const abrirAlerta = (accionAlerta, id, email) => {
        setMostrarAlerta(true);
        setAccion(accionAlerta);
        setIdUsuarioAEliminar(id);
        setEmailUsuarioAEliminar(email);
    }

    const closeAlerta = () => {
        setMostrarAlerta(false);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const [usuarioConRole, setUsuarioConRole] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        creationDate: "",
        role: ""
    });

    const eliminarUser = async (idUsuario) => {
        try {
            await apiConfig.delete(`/users/admin/${idUsuario}`);
            setBorradoExitoso(true);
            setIdUser(idUsuario);
        } catch (error) {
            console.error("error no se borro", error);
        }
        setMostrarAlerta(false);
    };

    const habilitarUser = async (emailUser, idUsuario) => {
        try {
            await apiConfig.post(`/auth/reactivate`, {
                email: emailUser
            });
            setBorradoExitoso(false);
            setIdUser(idUsuario);
        } catch (error) {
            console.error("error no se borro", error);
        }
        setMostrarAlerta(false);
    };

    const buscarUsuario = async (idUsuario) => {
        try {
            const response = await apiConfig.get(`/users/admin/userProfile/${idUsuario}`);
            setUsuarioConRole({
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                creationDate: response.data.creationDate,
                role: response.data.role
            })
            setVerUser(true);
            setAsignacionExitosa(false)

        }
        catch (error) {
            console.error("Error buscando usuario", error);
        }
    }

    const asignarRol = async (idUsuario) => {
        try {
            await apiConfig.patch(`/users/admin/updateRole/${idUsuario}`, {
                role: role

            });
            setAsignacionExitosa(true);
            setVerUser(false);
        } catch (error) {
            console.error("error al asignar el rol", error);
        }
    };
    
    useEffect(() => {
        const listaUsers = async () => {
            try {
                const response = await apiConfig.get(`/users/admin?page=${page - 1}&size=${itemsPerPage}`);
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            catch (error) {
                console.error("error de listar users: ", error);
            }
        }
        listaUsers();
    }, [page, borradoExitoso, asignacionExitosa, idUser]);

    const formatearFecha = (fechaOriginal) => {

        const fechaFormateada = format(new Date(fechaOriginal), "dd, MMM, HH:mm:ss", {
            locale: es,
        }).toUpperCase();

        return fechaFormateada;
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Grid container sx={{ justifyContent: "center", textAlign: "center", marginTop: "10px" }} spacing={2}>
            <Grid item size={12}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6655D9" }}>
                    Gestor de usuarios
                </Typography>
            </Grid>

            <Grid item size={3}>

                <Grid container spacing={2} sx={{ justifyContent: "center" }}>

                    <Grid item size={12}>
                        <Card variant="elevation" elevation={5} sx={{ textAlign: "left" }}>
                            <CardContent sx={{ background: "#6655D9" }}>
                                <Typography variant='h5' sx={{ fontWeight: "bold", color: "#e8e8e8" }}>
                                    ¿Como asignar un rol?
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography>
                                    1) Clickea el nombre del usuario para completar sus datos
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography>
                                    2) Una vez chequeados los datos usa el desplegable para cambiar su rol
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography>
                                    3) Para confirmar la operacion de click en asignar Rol y ya estaría listo el cambio
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item size={12}>


                        {verUser == true ? (
                            <Card sx={{ textAlign: "left" }} variant="elevation" elevation={3}>
                                <CardContent sx={{ background: "#6655D9" }}>
                                    <Typography variant='h5' sx={{ fontWeight: "bold", color: "#e8e8e8" }}>
                                        Datos del usuario
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography>
                                        Email: {usuarioConRole.email}
                                    </Typography>

                                    <Typography>
                                        Rol: {
                                            usuarioConRole.role == 1
                                                ? "Admin"
                                                : usuarioConRole.role == 2
                                                    ? "Usuario" : ""}
                                    </Typography>

                                </CardContent>
                                <CardContent>
                                    <FormControl variant="outlined" fullWidth sx={{ marginBottom: "5px" }}>
                                        <InputLabel id="role-selector-label">Seleccione Rol</InputLabel>
                                        <Select
                                            labelId="role-selector-label"
                                            value={role}
                                            onChange={handleRoleChange}
                                            label="Seleccione Rol"
                                        >
                                            <MenuItem value="1">Admin</MenuItem>
                                            <MenuItem value="2">Usuario</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant='contained' onClick={() => asignarRol(usuarioConRole.id)}>
                                        Asignar rol
                                    </Button>
                                </CardContent>
                            </Card>

                        ) : null
                        }
                    </Grid>
                </Grid>


            </Grid>
            <Grid item size={9} sx={{ width: "70vw" }}>
                <Grid container>
                    <Grid item size={12}>
                        {users.length > 0 ? (
                            <>
                                <TableContainer component={Paper} sx={{ height: "73vh" }} variant="elevation" elevation={5}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Nombre</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Apellido</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Email</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Fecha de modificacion</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Rol</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Estado</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Deshabilitar usuario</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {users.map((user) => (
                                                <TableRow
                                                    key={user.id}
                                                >
                                                    <TableCell align='center'>
                                                        <Grid container>
                                                            <Grid item size={2}>
                                                                <PersonIcon style={{ color: "black", fontSize: "23PX" }} />
                                                            </Grid>
                                                            <Grid item size={9}>
                                                                <Typography variant='p' component={Link}
                                                                    onClick={() => buscarUsuario(user.id)}
                                                                >
                                                                    {user.firstName}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        <Typography>
                                                            {user.lastName}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                        <Typography>
                                                            {user.email}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "center" }}>
                                                        {formatearFecha(user.updateDate)}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "center" }}>
                                                        {user.role == "Admin" ? "ADMIN" : "USER"}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "center" }}>
                                                        {user.softDelete == null ? "Activo" : "Inactivo"}
                                                    </TableCell>
                                                    {user.softDelete == null ? (
                                                        <TableCell sx={{ textAlign: "center" }}>
                                                            <Button
                                                                variant='outlined'
                                                                size='small'
                                                                color='error'
                                                                startIcon={<PersonRemoveIcon />}
                                                                onClick={() => abrirAlerta("deshabilitar", user.id, "")}
                                                            >
                                                                Deshabilitar
                                                            </Button>
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell sx={{ textAlign: "center" }}>
                                                            <Button
                                                                variant='outlined'
                                                                size='small'
                                                                color='success'
                                                                startIcon={<PersonAddAlt1Icon />}
                                                                onClick={() => abrirAlerta("habilitar", user.id, user.email)}
                                                            >
                                                                Habilitar
                                                            </Button>
                                                        </TableCell>
                                                    )}

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
            <AlertaDialog
                mostrarAlerta={mostrarAlerta}
                habilitar={()=>habilitarUser(mailUsuarioAEliminar,idUsuarioAEliminar)}
                deshabilitar={()=>eliminarUser(idUsuarioAEliminar)}
                closeAlerta={closeAlerta}
                accion={accion}
            />
        </Grid>
    );
}