import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Theme from "./Theme.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
