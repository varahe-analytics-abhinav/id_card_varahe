import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

import React from 'react'

export default function SubmitButton({ label, loading, ...props }) {
    return (
        <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            disableElevation
            sx={{ px: 3, backgroundColor: '#c24a00', '&:hover': { backgroundColor: '#138496' } }}
            {...props}
        >
            {label}
        </LoadingButton>
    )
}
export function OutlinedButton({ label, ...props }) {
    return (
        <Button variant="outlined" disableElevation sx={{ color: '#c24a00', borderColor:'#c24a00', '&:hover': { backgroundColor: '#c24a00', color:'#f9f9f9', borderColor:'#c24a00' } }} {...props}>{label}</Button>
    )
}
export function CancelButton({ label, ...props }) {
    return (
        <Button variant="contained" disableElevation sx={{ backgroundColor: '#868e96', color: '#fff', borderColor:'#868e96', '&:hover': { backgroundColor: '#727b84', color:'#fff', borderColor:'#6c757d' } }} {...props}>{label}</Button>
    )
}
