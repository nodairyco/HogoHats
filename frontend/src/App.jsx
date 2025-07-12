import SignUpPage from "./components/registration/SignUpPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import {Box, ButtonGroupButtonContext, Container} from "@mui/material";
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/registration/LoginPage.jsx";
import AdminPanel from "./components/adminpanel/AdminPanel.jsx"
import {createContext, Suspense, useState} from "react";

export const productContext = createContext()


function App() {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    

    return (
        <>
            <productContext.Provider value={{products, setProducts}}>
                <main style={{
                    display: 'flex', height: '100vh', justifyContent: 'center',
                    overflowY:'auto', flexDirection:'column'
                }}>
                    <Suspense fallback={<div>loading</div>}>
                        <Routes>
                            <Route path="/" element={<Navigate to='/signup'/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/admin" element={<AdminPanel/>}/>
                            <Route path='/signup' element={<SignUpPage/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </productContext.Provider>
        </>
    )
}

export default App
