import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loader() {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '50vh',
                gap: 2
            }}
        >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="body1" color="text.secondary">
                Loading data...
            </Typography>
        </Box>
    );
}