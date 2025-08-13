import { useEffect, useRef, useState } from "react"
import Cookies from "universal-cookie"
import { Box, Typography } from '@mui/material'
import { HeaderButton } from "../StyledHeaderComponents"

export default function GetSelf({ isBelowMd }) {
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

    return <HeaderButton onClick={() => setEditSelfDropdown(prev => !prev)} ref={selfDropdownRef}
        id="header-self"
    >
        <Box component='i' className="lni lni-user-4" id="header-btn-i" sx={{
            color: 'primary.txtColor',
            fontSize: '30px'
        }} />
        {
            !isBelowMd &&
            <Typography variant='span' color="primary.txtColor" fontWeight='550'>
                username
            </Typography>
        }

        {
            editSelfDropdown &&
            <EditSelf />
        }
    </HeaderButton>
}