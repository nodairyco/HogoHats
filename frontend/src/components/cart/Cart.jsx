import { useContext, useEffect } from "react";
import useCart from "../../CartContext.jsx";
import { RenderCartItem } from "./submodules/RenderCartItem.jsx";
import { Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import ProductContext from "../../ProductContext.jsx";
import CartInfo from "./submodules/CartInfo.jsx";
import CartHeader from "./submodules/CartHeader.jsx";
import Shipping from "./submodules/Shipping.jsx";
import { CartSubCompProvider, useCartSubComp } from "./CartSubCompContext.jsx";
import Nav from "../navbar/Nav.jsx";

const CartContent = ({ footerRef }) => {
  const { currentStep } = useCartSubComp();

  const { getCart, getCartTotal, clearCart } = useCart();

  const { products, setProducts, backend } = useContext(ProductContext);

  const fetchProducts = async () => {
    if (!products || products.length === 0) {
      try {
        const response = await axios.get(`${backend}/api/products`, {
          withCredentials: true,
        });
        const data = response.data.products || response.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "cart":
        return (
          <Box
            sx={{
              flex: 2.5,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            id="cart-items"
          >
            {getCart()?.length > 0 ? (
              getCart()?.map((item) => {
                return <RenderCartItem product={item} />;
              })
            ) : (
              <Typography variant="h6">Empty Cart</Typography>
            )}
          </Box>
        );
      case "shipping":
        return <Shipping />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mx: "auto", py: 2 }} id="cart-container">
      <Nav />
      <CartHeader
        clearCart={clearCart}
        stepName={currentStep.toUpperCase()}
      />

      <Box
        component="div"
        sx={{
          width: "100%",
          height: "1px",
          borderBottom:
            "1px solid hsl(from var(--bg-color) h s calc(l * 1.25))",
          my: 3,
        }}
      />

      <Container
        id="cart-items-info-container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          padding: "0 !important",
        }}
      >
        {renderCurrentStep()}
        <CartInfo getCartTotal={getCartTotal} footerRef={footerRef} />
      </Container>
    </Container>
  );
};

const Cart = ({ footerRef }) => {
  return (
    <CartSubCompProvider>
      <CartContent footerRef={footerRef} />
    </CartSubCompProvider>
  );
};

export default Cart;
