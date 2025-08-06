import { useEffect, useRef, useState } from "react"
import Cookies from "universal-cookie"
import { Box, Typography, useTheme } from '@mui/material'

export default function GetSelf() {
    const cookies = new Cookies(null, { path: '/' })
    const accessToken = cookies.get("accessToken")
    const [editSelfDropdown, setEditSelfDropdown] = useState(false)
    const selfDropdownRef = useRef(null)
    const theme = useTheme()
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
        minHeight: '50px',
        '&:hover': {
            backgroundColor: `hsl(from ${theme.palette.primary.submain} h s calc(l*0.9))`,
            transition: 'background-color ease 0.2s'
        }
    }} onClick={() => setEditSelfDropdown(prev => !prev)} ref={selfDropdownRef}>
        <Box component='i' className="lni lni-user-4" sx={{
            color: 'primary.txtColor',
            fontSize: '30px'
        }} />
        <Typography variant='span' color="primary.txtColor" fontWeight='550'>
            username
        </Typography>
        {
            editSelfDropdown &&
            <EditSelf />
        }
    </Box>
}