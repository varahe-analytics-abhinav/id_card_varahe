import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
export default function Loader2(props) {
    return (
        <Box sx={{ width: '100%', mt: '2vh' }} direction="row" alignItems="center">
            <LinearProgress {...props} />
        </Box>
    )
}
