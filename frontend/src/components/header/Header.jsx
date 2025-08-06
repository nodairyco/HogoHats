import { Box, Container, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import GetSelf from './subcomponents/GetSelf';
import MapCategories from './subcomponents/MapCategories';
import GetCart from './subcomponents/GetCart';

function Header() {
    const location = useLocation()

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null
    }

    return (
        <header style={{
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 99,
            borderBottom: '1px solid ',
            borderBottomColor: 'hsl(from var(--bg-color) h s calc(l/1.25))',
            backgroundColor: 'var(--bg-color)',
        }}>
            <Container id='headerContainer'
                sx={{
                    height: 90,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <Link id='logoContainer'
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}
                    href='/home'>
                    <img alt='logo' src='/hogo_logo.jpg' style={{
                        height: '80px',
                        aspectRatio: '1/1'
                    }} />
                    <Typography fontFamily='Zen Antique, serif' fontWeight='600' variant='h4' color='#ffffff'>
                        H
                        <span
                            style={{ borderTop: '1px solid #ffffff', marginTop: '20', display: 'inline-block' }}>O</span>
                        G
                        <span
                            style={{ borderTop: '1px solid #ffffff', marginTop: '20', display: 'inline-block' }}>O</span>
                    </Typography>
                </Link>
                <MapCategories />
                <Box sx={{ width: 'fit-content', height: 'fit-content', display: 'flex', alignItems: 'center', gap: 1 }}
                    id='cartAndIconContainer'>
                    <GetCart />
                    <GetSelf />
                </Box>
            </Container>
        </header>
    );
}

export default Header;

