import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function useCart(){
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
        if (quantity <= 0) {
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
        return !cart ? 0 : cart.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)
    }

    const getCartItemCount = () => {
        return !cart ? 0 : cart.reduce((count, item) => count + item.quantity, 0)
    }

    const handleSizeChange = (item, newSize) => {
        if (item.chosenSize === newSize) return;

        const existingItemIndex = cart.findIndex(
            cartItem => cartItem.product === item.product && cartItem.size === newSize
        );

        if (existingItemIndex !== -1) {
            const updatedItems = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, quantity: cartItem.quantity + item.quantity };
                }
                if (cartItem.product === item.product && cartItem.size === item.size) {
                    return null;
                }
                return cartItem;
            }).filter(Boolean);

            setCart(updatedItems);
        } else {
            const updatedItems = cart.map((cartItem) =>
                cartItem.product === item.product && cartItem.size === item.size
                    ? { ...cartItem, size: newSize }
                    : cartItem
            );
            setCart(updatedItems);
        }
    }

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider value={{
            getCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            getCartItemCount,
            handleSizeChange,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

