import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Footer({ ref }) {
    const location = useLocation()

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null
    }

    return (
        <footer style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            width: '100vw',
            height: '90px',
            background: 'hsl(from var(--bg-color) h s calc(l * 0.75))',
        }} ref={ref}>
            Wow cool information
        </footer>
    )
}
