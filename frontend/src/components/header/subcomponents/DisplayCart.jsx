import useCart from "../../../CartContext";
import css from './DisplayCart.module.css'
import { Link } from "react-router-dom";

export default function DisplayCart() {
    const {
        getCart,
        updateQuantity,
        getCartTotal,
        getCartItemCount,
        handleSizeChange,
        addToCart
    } = useCart()

    const cartItems = getCart()
    const sizes = ['s', 'm', 'l']


    function mapItemSize(size, index, item) {
        let isCurrentSizeChosen = item.size === size

        return (
            <a key={index} className={
                isCurrentSizeChosen ?
                    css.cartItemSizeBtnChosen : css.cartItemSizeBtn
            } onClick={(e) => {
                handleSizeChange(item, size)
            }}
            >
                {size}
            </a>
        )
    }

    return (
        <div className={css.shoppingCartOverlay}>
            <div className={css.cartHeader}>
                <span>My Bag</span>, {getCartItemCount()} items
            </div>
            <div className={css.cartItemsContainer}>
                {
                    cartItems ?
                        cartItems.map((item, index) => (
                            <div key={index} className={css.cartItem}>
                                <div className={css.cartItemDetails}>
                                    <p>
                                        {item.name}
                                    </p>
                                    <p>
                                        ${item.price}
                                    </p>
                                    <div className={css.cartItemSizeControl}>
                                        <p>
                                            Size:
                                        </p>
                                        <div className={css.cartItemSizeControlList}>
                                            {
                                                sizes.map((size, index) =>
                                                    mapItemSize(size, index, item)
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={css.cartItemThumbnail}>
                                    <div className={css.cartItemQuantityControl}>
                                        <a onClick={() => {
                                            updateQuantity(item.product, item.size, item.quantity + 1)
                                        }}>
                                            +
                                        </a>
                                        <p>
                                            {item.quantity}
                                        </p>
                                        <a onClick={() => {
                                            updateQuantity(item.product, item.size, item.quantity - 1)
                                        }}>
                                            -
                                        </a>
                                    </div>
                                    <img className={css.cartItemImage} alt='cart item' src={item.image} />
                                </div>
                            </div>
                        ))
                        : "No items in cart"
                }
            </div>
            <div className={css.cartTotal}>
                <span>
                    Total
                </span>
                <span className={css.cartTotalPrice}>
                    ${getCartTotal()}
                </span>
            </div>
            <div className={css.cartBtnArr}>
                <Link to="/cart" className={css.cartViewBagBtn}>
                    VIEW BAG
                </Link>
                <Link to="/checkout/details" className={css.cartCheckoutBtn}>
                    CHECK OUT
                </Link>
            </div>
        </div>
    )
}