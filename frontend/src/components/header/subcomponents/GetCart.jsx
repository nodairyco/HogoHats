import { Box, Typography } from "@mui/material"
import useCart from "../../../CartContext";
import { useNavigate } from "react-router-dom";
import { HeaderButton } from "../StyledHeaderComponents";

const GetCart = ({ isBelowMd }) => {
    const { getCartItemCount } = useCart()
    const navigate = useNavigate()

    return (
        <HeaderButton id='topbar-cart-container' component='a' href='cart'> 
            <Box component='i' className="lni lni-cart-1" sx={{
                color: 'primary.txtColor',
                fontSize: '30px'
            }} id='header-btn-i'/>
            {
                !isBelowMd &&
                <Typography color="primary.txtColor" sx={{
                    fontSize: '25px',
                    fontWeight: 550
                }}>
                    Cart
                </Typography>
            }
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
        </HeaderButton>
    )
}

export default GetCart;