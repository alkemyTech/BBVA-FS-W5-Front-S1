import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Card, CardContent, Typography, Button, Icon, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Carrousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        {
            id: 1,
            content: (
                <Card sx={{ height: '30vh' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h5">Balance: A</Typography>
                    </CardContent>
                </Card>
            )
        },
        {
            id: 2,
            content: (
                <Card sx={{ height: '30vh' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h5">Balance: B</Typography>
                    </CardContent>
                </Card>
            )
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (

        <>
            <Grid container sx={{ alignItems: 'center', alignContent: "center" }}>
                <Grid item size={2}>
                    <IconButton onClick={handlePrevious}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>

                <Grid item size={8}>
                    {items[currentIndex].content}
                </Grid>

                <Grid item size={2}>
                    <IconButton onClick={handleNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};