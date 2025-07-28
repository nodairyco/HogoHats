import SignUpPage from "./components/registration/SignUpPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/registration/LoginPage.jsx";
import AdminPanel from "./components/adminpanel/AdminPanel.jsx"
import { Suspense, useState } from "react";
import ProductDetails from "./components/productpage/ProductDetails.jsx";
import Test from "./Test.jsx";
import Cookies from "universal-cookie";
import Header from "./components/header/Header.jsx";
import ProductContext from "./ProductContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import Cart from "./components/cart/Cart.jsx";

function App() {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const cookies = new Cookies(null, { path: '/' })


    return (
        <>
            <ProductContext.Provider value={{ products, setProducts }}>
                <CartProvider>
                    <main style={{
                        display: 'flex',
                        minHeight: Header() === null ? '100vh' : 'calc(100vh - 100px)',
                        justifyContent: 'center',
                        overflowY: 'auto',
                        flexDirection: 'row',
                        marginTop: Header() === null ? '0' : '100px'
                    }}>
                        <Header />
                        <Suspense fallback={<div>loading</div>}>
                            <Routes>
                                <Route path="/"
                                    element={<Navigate to={cookies.get('accessToken') ? '/home' : '/signup'} />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/home/:category" element={<Home />} />
                                <Route path="/admin" element={<AdminPanel />} />
                                <Route path='/signup' element={<SignUpPage />} />
                                <Route path='/login' element={<LoginPage />} />
                                <Route path='/product/:id' element={<ProductDetails />} />
                                <Route path='test' element={<Test />} />
                                <Route path='/cart' element={Cart()} />
                            </Routes>
                        </Suspense>
                    </main>
                </CartProvider>
            </ProductContext.Provider>
        </>
    )
}

export default App
