import SignUpPage from "./components/registration/SignUpPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import {Box, ButtonGroupButtonContext, Container} from "@mui/material";
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/registration/LoginPage.jsx";
import AdminPanel from "./components/adminpanel/AdminPanel.jsx"
import {createContext, Suspense, useState} from "react";
import ProductDetails from "./components/productpage/ProductDetails.jsx";
import Test from "./Test.jsx";
import Cookies from "universal-cookie";
import Header from "./components/header/Header.jsx";

export const productContext = createContext()


function App() {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const cookies = new Cookies(null, {path: '/'})


    return (
        <>
            <productContext.Provider value={{products, setProducts}}>
                <main style={{
                    display: 'flex', minHeight: '100vh', justifyContent: 'center',
                    overflowY: 'auto', flexDirection: 'row', marginTop:Header() === null? '0':'100px'
                }}>
                    <Header/>
                    <Suspense fallback={<div>loading</div>}>
                        <Routes>
                            <Route path="/"
                                   element={<Navigate to={cookies.get('accessToken') ? '/home' : '/signup'}/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/home/:category" element={<Home/>}/>
                            <Route path="/admin" element={<AdminPanel/>}/>
                            <Route path='/signup' element={<SignUpPage/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/product/:id' element={<ProductDetails/>}/>
                            <Route path='test' element={<Test/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </productContext.Provider>
        </>
    )
}

export default App
