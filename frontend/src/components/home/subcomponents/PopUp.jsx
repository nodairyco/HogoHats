import React from 'react';
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useSearchParams} from "react-router-dom";

function PopUp() {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <>
            {
                searchParams.get('inl') && searchParams.get('inl') === 'true' &&
                <Box sx={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    inset: 0,
                    zIndex: 100,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Box sx={{p: 4, backgroundColor: 'var(--bg-color)'}}>
                        <Button onClick={() => setSearchParams({})}>X</Button>
                        <Typography variant='h1'>Welcome to Hogo!</Typography>
                    </Box>
                </Box>
            }
        </>
    );
}

export default PopUp;