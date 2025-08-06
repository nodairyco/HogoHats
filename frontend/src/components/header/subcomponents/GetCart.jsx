import { Box, Typography, useTheme } from "@mui/material"
import useCart from "../../../CartContext";

const GetCart = () => {
    const theme = useTheme()
    const { getCartItemCount } = useCart()

    return (
        <Box id='topbar-cart-container' sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '8px',
            border: '2px solid',
            borderColor: 'primary.txtColor',
            px: 1,
            py: 0.5,
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: `hsl(from ${theme.palette.primary.submain} h s calc(l*0.9))`,
                transition:'background-color ease 0.2s'
            }
        }}>
            <Box component='i' className="lni lni-cart-1" sx={{
                color: 'primary.txtColor',
                fontSize: '30px'
            }} />
            <Typography color="primary.txtColor" sx={{
                fontSize: '25px',
                fontWeight: 550
            }}>
                Cart
            </Typography>
            {
                getCartItemCount() > 0 &&
                <Box sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: 'primary.main',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    fontWeight: 550,
                    color: 'primary.txtColor',
                }}>
                    {getCartItemCount()}
                </Box>
            }
        </Box>
    )
}

export default GetCart;