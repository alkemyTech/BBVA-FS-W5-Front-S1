import { useState, useEffect } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import PropTypes from "prop-types";

const LoadingPage = ({message, duration }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection:"column",
          alignItems: 'center',
          backgroundColor: '#e8e8e8e8',
          gap:"25px",
          zIndex: 9999,
        }}
      >
        <img src="/assets/iconoPaginaVioleta.png" alt="" style={{height:"50px"}}/>
        <LinearProgress color="secondary" sx={{width:"30%"}} />
        <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>{message}...</Typography>
      </Box>
    );
  }

  return null; 
};

LoadingPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  };

export default LoadingPage;