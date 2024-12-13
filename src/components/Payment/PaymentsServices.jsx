import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import apiConfig from '../../Config/axiosConfig';
import Swal from "sweetalert2";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Payment = () => {
  const [accounts, setAccounts] = useState([]);
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    currencyType: "",
  });

  const alertaPagoServicio = (valorServicio, servicio) => {
    Swal.fire({
      title: "Pago de Servicio",
      html: `
        <p>No va a ser posible revertir la operación.</p>
        <input id="concepto" class="swal2-input" placeholder="Ingrese el concepto del pago" />
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#0cae27",
      cancelButtonColor: "#fe5b5b",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      preConfirm: () => {
        const concepto = Swal.getPopup().querySelector("#concepto").value;
        if (!concepto) {
          Swal.showValidationMessage("Por favor, ingrese un concepto");
        }
        return concepto;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const descripcion = result.value;
        const nuevaTransaccion = {
          amount: valorServicio,
          description: `${descripcion || `Pago de ${servicio}`}`,
          currencyType: "ARS",
        };
        pagarServicio(nuevaTransaccion);
      }
    });
  };

  const pagarServicio = async (transaction) => {
    try {
      await apiConfig.post("/transactions/payment", transaction);
      Swal.fire({
        title: "Pago realizado",
        text: "El servicio fue pagado con éxito",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch (e) {
      Swal.fire("Error", "Ocurrió un error al realizar el pago", "error");
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiConfig.get("accounts/");
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const accountPesos = accounts.filter(account => account.currency === "ARS");

  const services = [
    { name: "Netflix", price: 500, image: "https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-6-1024x576.png" },
    { name: "Spotify", price: 300, image: "https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-4.png" },
    { name: "Disney+", price: 400, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdhsY8X-02mpMvDgZea_Je-bPG8qnqFLb4bHrLpQ5Gluam6M-jMUm8rsXigVpzz6dDV-Mc-kVUtvqovFn2T3S1cZ15yOE2MAMu6f_ng-jxkv-oXHGeVv4JajAT0KimCb5-LImrnxd23Le4/s1600/disney%252B.jpg" },
    { name: "HBO Max", price: 450, image: "https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Symbol.png" },
    { name: "Amazon Prime", price: 350, image: "https://imagenes.elpais.com/resizer/v2/XUFZ2BH5C5JWNICKSC5CJBGCZU.jpg?auth=5ad75fc3c1809da6275fc1bb154727678ba7e8cacc6bf8a16e0f3464699684cf&width=1200" },
    { name: "YouTube Premium", price: 200, image: "https://gagadget.com/media/cache/ce/91/ce91b0023268291238a231d2439c882c.jpg" },
    { name: "Apple TV+", price: 250, image: "https://www.apple.com/v/apple-tv-plus/ai/images/meta/apple-tv__e7aqjl2rqzau_og.png" },
    { name: "Paramount+", price: 220, image: "https://vocescriticas1.cdn.net.ar/252/vocescriticas1/images/90/31/903166_cd67f78df6b3b77bf98a13e2d1cffe049216f34dc82ae586c1d6c37bdb8e8edf/lg.webp" },
  ];

  return (
    <Grid container sx={{ minHeightt: "100vh", background: "#f5f5f5", position: "relative" }}>

      <Grid item size={12}>
        <Grid container sx={{ height: "100%" }}>
          {accountPesos.map(account => (
            <Grid item size={4} key={account.currency} sx={{ margin: "40px" }}>
              <Grid container sx={{ justifyContent: "center" }}>
                <Card sx={{ width: "80%", height: "100%" }}>
                  <CardContent sx={{ background: "#A599F2" }}>
                    <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
                      Nombre de Usuario
                    </Typography> </CardContent> <CardContent> <Grid container> <Grid item size={6}>
                      <Typography sx={{ color: "gray", textAlign: "left", marginLeft: "2vh" }}>
                        Dinero disponible:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <AttachMoneyIcon sx={{ fontSize: "50px" }} />
                        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "45px" }}>
                          {account.balance}
                        </Typography>
                      </Box>
                    </Grid>
                      <Grid item size={6}>
                        <Box sx={{ textAlign: "left", marginLeft: "2vh" }}>
                          <Typography sx={{ color: "gray" }}>
                            Moneda:
                          </Typography>
                          <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                            {account.currency}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardContent>
                    {/* Falta agregar contenido */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* SServicios */}
      <Grid item size={12} sx={{ paddingBottom: "50px" }}>
        <Grid container sx={{ display: "flex", justifyContent: "center", paddingBottom: "5px" }}>
          <CardContent sx={{ height:"140px", width:"100%", margin:" 0 5px 0 5px"}}>
          <img
              src="/public/assets/banner2.png"
              alt="Logo"
              style={{ width: "100%", height:"100%" }}
              
            />
          </CardContent>
          <Grid container spacing={3} paddingLeft={5} paddingRight={5}>
            {services.map((service) => (
              <Grid item size={2} key={service.name}>
                <Card sx={{ boxShadow: 4, borderRadius: 4 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.image}
                    alt={service.name}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                      {service.name}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                      ${service.price}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => alertaPagoServicio(service.price, service.name)}
                      >
                        Pagar
                      </Button>
                      <Button variant="outlined" color="secondary">
                        Ver más
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payment;

