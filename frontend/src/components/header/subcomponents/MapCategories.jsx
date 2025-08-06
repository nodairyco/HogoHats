import { Box, Link } from "@mui/material"
import { useLocation } from "react-router-dom"

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
};

export default MapCategories;