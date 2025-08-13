import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export default function CartHeader({ getCartItemCount, clearCart, stepName }) {
    return (
        <Box id='cart-header' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h4' id='cart-info'>
                {stepName} {' '}
                {
                    stepName === 'CART' &&
                    <Typography variant='span' sx={{
                        fontSize: 24
                    }}>
                        {getCartItemCount()} items
                    </Typography>
                }
            </Typography>

            <Button id='empty-cart-btn' variant='text' sx={{
                color: 'primary.submain',
                gap: 1,
                display: 'flex',
                alignItems: 'center'
            }} onClick={() => clearCart()}>
                <Box component='i' className="lni lni-trash-3" fontSize='20px' />
                <Typography variant='span'>
                    Empty Cart
                </Typography>
            </Button>
        </Box>


    )
}
