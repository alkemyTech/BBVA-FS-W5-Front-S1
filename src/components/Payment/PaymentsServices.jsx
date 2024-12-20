import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import apiConfig from '../../Config/axiosConfig';
import Swal from "sweetalert2";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useDispatch, useSelector } from 'react-redux';

const Payment = () => {
  const [accounts, setAccounts] = useState([]);
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    currencyType: "",
  });
  const dispatch = useDispatch();

  const userAuthenticated = useSelector((state) => state.userAuthenticated);

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
    { name: "Netflix", price: 6000, image: "https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-6-1024x576.png" },
    { name: "Spotify", price: 5000, image: "https://www.liderlogo.es/wp-content/uploads/2022/12/pasted-image-0-4.png" },
    { name: "Disney+", price: 7000, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdhsY8X-02mpMvDgZea_Je-bPG8qnqFLb4bHrLpQ5Gluam6M-jMUm8rsXigVpzz6dDV-Mc-kVUtvqovFn2T3S1cZ15yOE2MAMu6f_ng-jxkv-oXHGeVv4JajAT0KimCb5-LImrnxd23Le4/s1600/disney%252B.jpg" },
    { name: "HBO Max", price: 8500, image: "https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Symbol.png" },
    { name: "Amazon Prime", price: 9000, image: "https://imagenes.elpais.com/resizer/v2/XUFZ2BH5C5JWNICKSC5CJBGCZU.jpg?auth=5ad75fc3c1809da6275fc1bb154727678ba7e8cacc6bf8a16e0f3464699684cf&width=1200" },
    { name: "YouTube Premium", price: 4300, image: "https://gagadget.com/media/cache/ce/91/ce91b0023268291238a231d2439c882c.jpg" },
    { name: "Apple TV+", price: 12000, image: "https://www.apple.com/v/apple-tv-plus/ai/images/meta/apple-tv__e7aqjl2rqzau_og.png" },
    { name: "Paramount+", price: 5500, image: "https://vocescriticas1.cdn.net.ar/252/vocescriticas1/images/90/31/903166_cd67f78df6b3b77bf98a13e2d1cffe049216f34dc82ae586c1d6c37bdb8e8edf/lg.webp" },
    { name: "Direct TV", price: 15000, image: "https://static2.pisapapeles.net/uploads/2024/08/Directv-logo-2024-HD.jpeg" },
    { name: "Movistar+", price: 4550, image: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/07/movistar-logo-001.jpg?fit=1920%2C1200&quality=70&strip=all&ssl=1" },
    { name: "Star+", price: 7200, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWWcQyYoGF046D9j85Xijvdro9u1C3rsXpqTRgkTUn7euHgzbjixOG-D3OAUQNRjn44k6rVf_BJkl3EaEwyLa4rLK4y7vZ4GOYJPoQuZ07UKvYDx1mXfwuR4eGYbajsAJOIezQGDF4ZjXp/s16000/star-%252B-logo-official.png" },
    { name: "Fox Sport", price: 8700, image: "data:image/jpeg;base64,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" },

  ];

  return (
    <Grid container sx={{ minHeight: "100vh", background: "#f5f5f5", position: "relative", overflow: "hidden" }}>
      <Grid item size={12}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "28px",
            marginTop: "30px",
            color: "#6a0dad",
          }}
        >
          PAGAR SERVICIOS
        </Typography>
      </Grid>
      <Grid container spacing={12} sx={{ width: "100%", padding: "20px" }}>

        {accountPesos.map((account) => (
          <Grid item size={12} key={account.currency}>
            <Card
              sx={{
                width: "98%",
                border: "1px solid #E0E0E0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around", // Asegura que los datos estén en fila
                padding: "20px",
              }}
            >
              {/* Nombre de usuario */}
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "black",

                  }}
                >
                  {userAuthenticated.firstName} {userAuthenticated.lastName}
                </Typography>
              </Box>
              {/* Dinero disponible */}

              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "18px",

                      color: "#454545",
                    }}
                  >
                    Dinero disponible:
                  </Typography>

                  <AttachMoneyIcon
                    sx={{
                      fontSize: "40px",
                      color: "#4CAF50",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "36px",
                      color: "#2E3B55",
                    }}
                  >
                    {account.balance}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#2E3B55",
                  }}
                >
                  {account.currency}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>


      {/* Servicios */}
      <Grid item size={12} sx={{ padding: "0px 50px 100px 50px" }}>
  <Grid container spacing={4} sx={{ width: "100%", justifyContent: "center" }}>
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
            <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center" }}>
              {service.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: 2 }}>
              {/* Descuento */}
              <Typography
                variant="body2"
                sx={{
                  background: "#FF5252",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                20% OFF
              </Typography>
              {/* Precio con descuento */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#2E7D32",
                }}
              >
                ${service.price * 0.8}
              </Typography>
            </Box>
            {/* Precio original tachado centrado */}
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "#9E9E9E",
                textAlign: "center",
              }}
            >
              ${service.price}
            </Typography>
            {/* Botón de pagar centrado */}
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => alertaPagoServicio(service.price, service.name)}
              >
                Pagar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Grid>
    </Grid>
  );
};

export default Payment;

