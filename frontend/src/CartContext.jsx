import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const useCart = () => {
    const context = useContext(CartContext);

    return context;
}

export default useCart;

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    // Load cart from localstorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
            return;
        }
        setCart([])
    }, [])

    // Update localStorage cart after any update
    useEffect(() => {
        if (cart !== null) {
            localStorage.setItem('cart', JSON.stringify(cart))
            console.log(cart)
        }
    }, [cart])

    const getCart = () => {
        return cart;
    }

    const addToCart = (product, quantity = 1, size = 's') => {
        setCart(prev => {
            const existingItem = prev.find(
                item => item.product === product._id && item.size === size
            )

            if (existingItem) {
                return prev.map(item => {
                    if (item.product === product._id && item.size === size) {
                        return { ...item, product: item.product, quantity: quantity + item.quantity }
                    }

                    return item;
                })
            }

            return [...prev, {
                product: product._id,
                name: product.name,
                image: product.images[0]?.url,
                price: product.price,
                size,
                quantity
            }]
        })
    }

    const removeFromCart = (productId, size = 's') => {
        setCart(prev => prev.filter(item => {
            return (item.product !== productId || item.size !== size)
        }))
    }

    const updateQuantity = (productId, size = 's', quantity) => {
        if (quantity < 0) {
            removeFromCart(productId, size)
            return;
        }

        setCart(prev => prev.map(item => {
            if (item.product === productId && item.size === size) {
                return { ...item, quantity }
            }

            return item;
        }))
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0)
    }

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    const handleSizeChange = async (item, newSize) => {
        setCart(prev => {

            prev = prev.map(prevItem => {
                if (prevItem.product === item.product && prevItem.size === newSize) {
                    return { ...prevItem, product: prevItem.product, quantity: item.quantity + prevItem.quantity }
                }

                return prevItem;
            })

            return prev.filter(prevItem => {
                console.log(prevItem.product !== item.product || prevItem.size !== item.size)
                return prevItem.product !== item.product || prevItem.size !== item.size
            })
        })
    }

    return (
        <CartContext.Provider value={{
            getCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            getCartItemCount,
            handleSizeChange
        }}>
            {children}
        </CartContext.Provider>
    )
}

