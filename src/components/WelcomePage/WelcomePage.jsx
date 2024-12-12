import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignUpRedirect = () => {
    navigate('/signUp');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a Dimo
        </Typography>
        <Typography variant="body1" color="textSecondary" >
          ¡Tu billetera virtual para gestionar tu dinero de manera fácil y segura!
        </Typography>
        <Typography variant="body2" color="textSecondary" >
          ¡Comienza ahora! Si ya tienes una cuenta, inicia sesión, o si eres nuevo, regístrate en Dimo.
        </Typography>


        <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginRedirect}
            sx={{ width: 150 }}
          >
            Iniciar sesión
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignUpRedirect}
            sx={{ width: 150 }}
          >
            Registrarse
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePage;