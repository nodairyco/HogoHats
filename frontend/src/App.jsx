import SignUpPage from "./components/registration/SignUpPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import LoginPage from "./components/registration/LoginPage.jsx";
import AdminPanel from "./components/adminpanel/AdminPanel.jsx"
import { Suspense, useRef, useState } from "react";
import ProductDetails from "./components/productpage/ProductDetails.jsx";
import Test from "./Test.jsx";
import Cookies from "universal-cookie";
import Header from "./components/header/Header.jsx";
import ProductContext from "./ProductContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import Cart from "./components/cart/Cart.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Box } from "@mui/material";

function App() {
    const [products, setProducts] = useState([])
    const cookies = new Cookies(null, { path: '/' })
    const [filters, setFilters] = useState({
        pageNum: 1,
        sortBy: '',
        sortOrder: '',
        minPrice: 0,
        maxPrice: 10000000,
        category: ''
    })
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [totalItems, setTotalItems] = useState(0)

    const footerRef = useRef()


    return (
        <>
            <ProductContext.Provider value={{
                products,
                setProducts,
                setFilters,
                hasMore,
                setHasMore,
                isLoading,
                setIsLoading,
                totalItems,
                setTotalItems,
                filters
            }}>
                <CartProvider>
                    <Box sx={{}}>
                        <main style={{
                            display: 'flex',
                            minHeight: Header() === null ? '100vh' : 'calc(100vh - 190px)',
                            justifyContent: 'center',
                            overflowY: 'auto',
                            flexDirection: 'row',
                            marginTop: Header() === null ? '0' : '100px',
                            position: 'relative',
                        }}>

                            <Suspense fallback={<div>loading</div>}>
                                <Routes>
                                    <Route path="/"
                                        element={<Navigate to={cookies.get('accessToken') ? '/home' : '/signup'} />} />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/products/:category" element={<Home />} />
                                    <Route path="/admin" element={<AdminPanel />} />
                                    <Route path='/signup' element={<SignUpPage />} />
                                    <Route path='/login' element={<LoginPage />} />
                                    <Route path='/product/:id' element={<ProductDetails />} />
                                    <Route path='test' element={<Test />} />
                                    <Route path='/cart' element={<Cart footerRef={footerRef} />} />
                                </Routes>
                            </Suspense>

                        </main>
                        <Footer ref={footerRef} />
                    </Box>
                    <Header />
                </CartProvider>
            </ProductContext.Provider>
        </>
    )
}

export default App
