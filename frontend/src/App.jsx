import {Routes, Route, Navigate} from "react-router-dom";
import {Box, Container} from "@mui/material";
import registrationCss from './components/registration/Registration.module.css'
import {lazy} from "react";

function App() {

    const SignUpPage = lazy(() => import("./components/registration/SignUpPage.jsx"))
    const LoginPage = lazy(() => import("./components/registration/LoginPage.jsx"))
    const Home = lazy(() => import("./components/home/Home.jsx"))
    const AdminPanel = lazy(() => import("./components/adminpanel/AdminPanel.jsx"))

    return (
        <>
            <Container sx={{display: 'flex', height: '100vh', justifyContent: 'center'}}>
                <Routes>
                    <Route path="/" element={<Navigate to='/signup'/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/admin" element={<AdminPanel/>}/>
                </Routes>
                <Box className={registrationCss.registrationContainer}>
                    <div className={registrationCss.formDecorationDiv}/>
                    <h1 className={registrationCss.formDecorationH1}>
                        Register
                    </h1>
                    <Routes>
                        <Route path='/signup' element={<SignUpPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                    </Routes>
                </Box>
            </Container>
        </>
    )
}

export default App
