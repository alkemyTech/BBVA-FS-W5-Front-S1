import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: '#6B46C1', color: 'white', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
          <Box textAlign={{ xs: 'center', md: 'left' }} mb={{ xs: 3, md: 0 }}>
            <Typography variant="body2" color="inherit">
              © {currentYear} Virtual Wallet. All rights reserved.
            </Typography>
            <Typography variant="body2" color="grey.400">
              Developed by StackBlitz Team
            </Typography>
          </Box>
          
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
              <Linkedin size={20} />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Mail size={16} />
            <Typography variant="body2">support@virtualwallet.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Phone size={16} />
            <Typography variant="body2">+1 (555) 123-4567</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};