import SignUpPage from "./components/registration/SignUpPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import {Box, Container} from "@mui/material";
import registrationCss from './components/registration/Registration.module.css'
import Home from "./components/home/Home.jsx";

function App() {

    return (
        <>
            <Container sx={{display: 'flex', height: '100vh', justifyContent: 'center'}}>
                <Routes>
                    <Route path="/" element={<Navigate to='/signup'/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
                <Box className={registrationCss.registrationContainer}>
                    <div className={registrationCss.formDecorationDiv}/>
                    <h1 className={registrationCss.formDecorationH1}>
                        Register
                    </h1>
                    <Routes>
                        <Route path='/signup' element={<SignUpPage/>}/>
                    </Routes>
                </Box>
            </Container>
        </>
    )
}

export default App
