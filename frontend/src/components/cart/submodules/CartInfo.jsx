import { useTheme } from "@emotion/react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartSubComp } from '../CartSubCompContext.jsx';

export default function CartInfo({ getCartTotal, footerRef, }) {
    const theme = useTheme()

    const navigate = useNavigate()
    const { shippingData, currentStep, handleClick } = useCartSubComp();

    const txtColor = `hsl(from ${theme.palette.primary.submain} h s calc(l*0.3))`

    const getButtonText = () => {
        switch (currentStep) {
            case 'cart':
                return 'Go to Shipping';
            case 'shipping':
                return 'Continue to Payment';
            default:
                return 'Continue';
        }
    };

    return (
        <Box sx={{
            width: '100%',
            flex: 1,
            background: 'hsl(from var(--bg-color) h s calc(l * 1.5))',
            borderRadius: '14px',
            p: 2,
            height: 'fit-content',
            [theme.breakpoints.down('md')]: {
                position: 'fixed',
                bottom: footerRef.current ? footerRef.current.offsetHeight : 0,
                width: '100%',
                px: 'auto',
                left: 0,
                borderBottomRightRadius: '0px',
                borderBottomLeftRadius: '0px'
            }
        }} id='cart-info'>
            <Box id='cart-total' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    fontSize: '18px',
                    px: 2,
                    color: txtColor
                }}>
                    Subtotal:
                </Typography>
                <Typography id='cart-total' sx={{
                    fontSize: '18x',
                    px: 2,
                    color: txtColor
                }}>
                    ₾{getCartTotal()}
                </Typography>
            </Box>
            <Box id='shipping-total' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    fontSize: '18px',
                    px: 2,
                    color: txtColor
                }}>
                    Shipping:
                </Typography>
                <Typography id='cart-total' sx={{
                    fontSize: '18x',
                    px: 2,
                    color: txtColor
                }}>
                    ₾0.00
                </Typography>
            </Box>
            <Box component='div' sx={{
                width: '100%',
                borderBottom: `1px solid ${txtColor}`,
                py: 1.5
            }} />
            <Box id='shipping-total' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    fontSize: '20px',
                    color: txtColor
                }}>
                    Total:
                </Typography>
                <Typography id='cart-total' sx={{
                    fontSize: '20px',
                    color: txtColor
                }}>
                    ₾{getCartTotal()}
                </Typography>
            </Box>
            <Button id='continue-button' sx={{
                width: '100%', mt: 2,
                boxShadow: 'none',
                borderRadius: '20px'
            }} variant='contained' onClick={() => { handleClick() }}>
                {getButtonText()}
            </Button>
        </Box>
    );
}