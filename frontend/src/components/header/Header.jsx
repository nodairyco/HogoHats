import React, { useEffect, useRef, useState } from 'react';
import { Box, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Cookies from "universal-cookie";
import DisplayCart from './subcomponents/DisplayCart';

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
            </Box>
        </header>
    );
}

export default Header;

const GetSelf = () => {
    const cookies = new Cookies(null, { path: '/' })
    const accessToken = cookies.get("accessToken")
    const [editSelfDropdown, setEditSelfDropdown] = useState(false)
    const selfDropdownRef = useRef(null)
    // little later
    // const [username, setUsername] = useState('')

    useEffect(() => {
        const handleSelfEditDropDownClose = (event) => {
            if (selfDropdownRef.current && !selfDropdownRef.current.contains(event.target)) {
                setEditSelfDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleSelfEditDropDownClose)
        return () => {
            document.removeEventListener('mousedown', handleSelfEditDropDownClose)
        }
    }, [])

    if (!accessToken) {
        return <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }} href='/login'>
            <img width='40px' src='/right-to-bracket-solid.svg' alt='login' />
            <Typography variant='span'>Login</Typography>
        </Link>
    }

    // ill add content here later
    const EditSelf = () => {
        return (
            <Box sx={{
                width: '100px',
                height: '100px',
                top: '100%',
                left: '20%',
                position: 'absolute'
            }}>
                wow
            </Box>
        )
    }

    return <Box sx={{
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        position: 'relative'
    }} onClick={() => setEditSelfDropdown(prev => !prev)} ref={selfDropdownRef}>
        < img width='40px' style={{ aspectRatio: '1/1' }} src='/circle-user-regular.svg' alt='self' />
        <Typography variant='span'>
            username
        </Typography>
        {
            editSelfDropdown &&
            <EditSelf />
        }
    </Box>
}

const MapCategories = () => {
    const categories = ['women', 'men', 'kids', 'premium']
    const location = useLocation()
    const getCategoryFromUrl = () => {
        let path = location.pathname
        return path.slice(path.lastIndexOf('/') + 1, path.includes('?') ? path.indexOf('?') : path.length)
    }

    return <Box sx={{ display: 'flex', gap: 2 }}>
        {categories.map((category, index) => {
            return <Link href={`/home/${category}`} key={index} sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'hsl(from var(--accent-1) h s calc(l*1.25))',
                fontSize: '18px',
                '&:hover': {
                    color: 'hsl(from var(--accent-1) calc(h*2) calc(s*2) calc(l*3))'
                },
                borderBottom: getCategoryFromUrl() === category ?
                    '1px solid hsl(from var(--accent-1) calc(h*2) calc(s*2) calc(l*3))' : ''
            }}>
                {category.toLocaleUpperCase(0)}
            </Link>
        })}
    </Box>
}

const GetCart = () => {
    const [cartDropDown, setCartDropdown] = useState(false)
    const topBarCartRef = useRef(null)

    useEffect(() => {
        const handleClosingOfHeaderCart = (event) => {
            if (topBarCartRef.current && !topBarCartRef.current.contains(event.target)) {
                setCartDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClosingOfHeaderCart)
        return () => {
            document.removeEventListener('mousedown', handleClosingOfHeaderCart)
        }
    }, [])

    return (
        <Box id='topbar-cart-container' sx={{ position: 'relative' }} ref={topBarCartRef}>
            <img src='/empty-cart.svg' width='40px' alt='cartsvg' style={{ cursor: 'pointer' }} onClick={() => {
                setCartDropdown(prev => !prev)
            }} />
            {
                cartDropDown &&
                <DisplayCart />
            }
        </Box>
    )
}