import { Box, Container, Typography, Stack, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Mail as MailIcon, Phone as PhoneIcon } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,                    // Posicionamiento relativo
        width: '100%',                // Ocupa todo el ancho
        mt: 'auto',                   // Empuja hacia abajo si el contenido es escaso
        background: 'linear-gradient(180deg, rgba(147,92,201,1) 0%, rgba(36,8,70,1) 100%)',
        color: 'white',
        py: 4,
      }}
    >
      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box textAlign={{ xs: 'center', md: 'left' }} mb={{ xs: 3, md: 0 }}>
            <Typography variant="body2" color="inherit">
              © 2024 Virtual Wallet. All rights reserved.
            </Typography>
            <Typography variant="body2" color="grey.400">
              Developed by Dimo Team
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton color="inherit" href="https://facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ my: 3, bgcolor: '#dfdfdf' }} />
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <MailIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">Dimo@DigitalMoney.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <PhoneIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">+54 9 11 5656-0980</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
