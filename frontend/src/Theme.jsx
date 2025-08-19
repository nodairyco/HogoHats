import { createTheme } from "@mui/material";

const Theme = createTheme({
    palette: {
        primary: {
            main: "#5c342c",
            contrastText: "#ffffff",
            submain: "#544f4f",
            txtColor: 'hsl(from #544f4f h s calc(l*1.3))',
            componentBgColor: 'hsl(from #28292d h s calc(l*1.5))',
            bgColor: "#28292d"
        },
        error: {
            main: "#e32507"
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: '"Raleway", sans-serif'
                }
            }
        }
    }
})

export default Theme