import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../CartContext.jsx';
import { RenderCartItem } from './submodules/RenderCartItem.jsx';
import { Button, Box, Typography, Container, useTheme } from '@mui/material';
import axios from 'axios';
import ProductContext from '../../ProductContext.jsx';

const Cart = ({ footerRef }) => {
    const {
        getCart,
        getCartTotal,
        getCartItemCount,
        clearCart
    } = useCart()

    const { products, setProducts } = useContext(ProductContext)

    const fetchProducts = async () => {
        if (!products || products.length === 0) {
            try {
                const response = await axios.get('http://localhost:5050/api/products', {
                    withCredentials: true
                });
                const data = response.data.products || response.data;
                setProducts(data);
                console.log('Products fetched:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])




    return (
        <Container maxWidth="lg" sx={{ mx: 'auto', py: 2 }} id='cart-container'>
            <Box id='cart-header' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h4' id='cart-info'>
                    CART {' '}
                    <Typography variant='span' sx={{
                        fontSize: 24
                    }}>
                        {getCartItemCount()} items
                    </Typography>
                </Typography>
                <Button id='empty-cart-btn' variant='text' sx={{
                    color: 'primary.submain',
                    display: 'flex',
                    gap: 1
                }} onClick={() => clearCart()}>
                    <i className="fa-solid fa-trash"></i>
                    Empty Cart
                </Button>
            </Box>

            <Box component='div' sx={{
                width: '100%',
                height: '1px',
                borderBottom: '1px solid hsl(from var(--bg-color) h s calc(l * 1.25))',
                my: 3
            }} />

            <Container id='cart-items-info-container' sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                padding: '0 !important'
            }}>
                <Box sx={{ flex: 2.5, width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }} id='cart-items'>
                    {
                        getCart()?.length > 0 ?
                            getCart()?.map((item) => {
                                return (
                                    <RenderCartItem product={item} />
                                )
                            }) :
                            <Typography variant='h6'>
                                Empty Cart
                            </Typography>
                    }
                </Box>
                {CartInfo(getCartTotal, footerRef)}
            </Container>
        </Container >
    );
};

export default Cart;

function CartInfo(getCartTotal, footerRef) {
    const theme = useTheme()

    const navigate = useNavigate()

    const txtColor = `hsl(from ${theme.palette.primary.submain} h s calc(l*0.3))`

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
                boxShadow:'none',
                borderRadius:'20px'
            }} variant='contained' onClick={() => { navigate('/checkout') }}>
                Go to Checkout
            </Button>
        </Box>
    );
}

