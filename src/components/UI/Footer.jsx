import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';  // Corregir nombre de LinkedIn
import { Mail as MailIcon, Phone as PhoneIcon } from '@mui/icons-material';

export default function Footer() {

  return (
    <Box component="footer" sx={{
      background: 'linear-gradient(180deg, rgba(147,92,201,1) 0%, rgba(114,65,173,1) 20%, rgba(93,39,150,1) 38%, rgba(82,32,142,1) 55%, rgba(63,15,119,1) 73%, rgba(36,8,70,1) 100%)',
      color: 'white', py: 4.6, mt: 'auto'
    }}>
      <Container>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
          <Box textAlign={{ xs: 'center', md: 'left' }} mb={{ xs: 3, md: 0 }}>
            <Typography variant="body2" color="inherit">
              © 2024 Virtual Wallet. All rights reserved.
            </Typography>
            <Typography variant="body2" color="grey.400">
              Developed by Dimo Team
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <MailIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">Dimo@DigitalMoney.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <PhoneIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">+54 9 11 5656-0980</Typography>
          </Box>

          {/* Enlaces a redes sociales */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton color="inherit" href="https://facebook.com" target="_blank">
              <Facebook size={20} />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com" target="_blank">
              <Twitter size={20} />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank">
              <Instagram size={20} />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com" target="_blank">
              <LinkedIn size={20} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
