import {createTheme} from "@mui/material";

const Theme = createTheme({
    palette: {
        primary: {
            main: "#5c342c",
            contrastText: "#ffffff",
            submain: "#544f4f"
        },
        error:{
            main:"#e32507"
        } 
    }
})

export default Theme