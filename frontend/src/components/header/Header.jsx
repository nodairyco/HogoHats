import React from 'react';
import {Box, Link} from "@mui/material";
import {useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Cookies from "universal-cookie";

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
        }}>
            <Box id='headerContainer'
                 sx={{
                     height: 90,
                     backgroundColor: 'var(--bg-color)',
                     borderBottom: '1px solid ',
                     borderBottomColor: 'hsl(from var(--bg-color) h s calc(l/1.25))',
                     px: 30,
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center'
                 }} fullWidth
            >
                <Link id='logoContainer'
                      sx={{display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none'}}
                      href='/home'>
                    <img alt='logo' src='/hogo_logo.jpg' style={{
                        height: '80px',
                        aspectRatio: '1/1'
                    }}/>
                    <Typography fontFamily='Zen Antique, serif' fontWeight='600' variant='h4' color='#ffffff'>
                        H
                        <span
                            style={{borderTop: '1px solid #ffffff', marginTop: '20', display: 'inline-block'}}>O</span>
                        G
                        <span
                            style={{borderTop: '1px solid #ffffff', marginTop: '20', display: 'inline-block'}}>O</span>
                    </Typography>
                </Link>
                <MapCategories/>
                <Box sx={{width: 'fit-content', height: 'fit-content', display: 'flex', alignItems: 'center', gap: 1}}
                     id='cartAndIconContainer'>
                    <GetCart/>
                    <GetSelf/>
                </Box>
            </Box>
        </header>
    );
}

export default Header;

const GetSelf = () => {
    const cookies = new Cookies(null, {path: '/'})
    const accessToken = cookies.get("accessToken")
    // little later
    // const [username, setUsername] = useState('')

    if (!accessToken) {
        return <>
            <img width='40px' src='/right-to-bracket-solid.svg' alt='login'/>
            <Typography variant='span'>Login</Typography>
        </>
    }
    return <>
        <img width='40px' style={{aspectRatio: '1/1'}} src='/circle-user-regular.svg' alt='self'/>
        <Typography variant='span'>
            username
        </Typography>
    </>
}

const MapCategories = () => {
    const categories = ['women', 'men', 'kids', 'premium']
    const location = useLocation()
    const getCategoryFromUrl = () => {
        let path = location.pathname
        return path.slice(path.lastIndexOf('/') + 1, path.includes('?') ? path.indexOf('?') : path.length)
    }

    return <Box sx={{display: 'flex', gap: 2}}>
        {categories.map((category, index) => {
            return <Link href={`/home/${category}`} key={index} sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'hsl(from var(--accent-1) h s calc(l*1.25))',
                fontSize: '18px',
                '&:hover': {
                    color: 'hsl(from var(--accent-1) calc(h*2) calc(s*2) calc(l*3))'
                },
                borderBottom: getCategoryFromUrl() === category ? '1px solid hsl(from var(--accent-1) calc(h*2) calc(s*2) calc(l*3))' : ''
            }}>
                {category.toLocaleUpperCase(0)}
            </Link>
        })}
    </Box>
}

const GetCart = () => {
    return <>
        <img src='/empty-cart.svg' width='40px' alt='cartsvg'/>
    </>
}