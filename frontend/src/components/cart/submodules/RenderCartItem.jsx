import React, { useContext } from "react";
import useCart from "../../../CartContext";
import {
  Box,
  Button,
  ButtonBase,
  List,
  ListItem,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import ProductContext from "../../../ProductContext";
import { useNavigate } from "react-router-dom";

export function RenderCartItem({ product }) {
  const { updateQuantity, getCart, removeFromCart } = useCart();
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const totalItemQuantityIncart = getCart()?.reduce((count, item) => {
    if (item.product === product.product && item.size !== product.size) {
      return count + item.quantity;
    }
    return count;
  }, 0);

  const theme = useTheme();

  const txtColor = `hsl(from ${theme.palette.primary.submain} h s calc(l*0.3))`;

  const QuantityButton = styled(Button)(({ theme }) => ({
    background: "none",
    border: "none",
    color: `hsl(from ${theme.palette.primary.submain} h s calc(l*1.75))`,
    fontSize: "16px",
    fontWeight: 700,
    height: "30px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    paddingLeft: "5px",
    paddingRight: "5px",
    minWidth: "40px",
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <Box
      id="cart-item-container"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        p: 2,
        borderRadius: "14px",
        backgroundColor: "hsl(from var(--bg-color) h s calc(l * 1.5))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          cursor: "pointer",
          width: "fit-content",
        }}
        onClick={() => {
          navigate(`/product/${product.product}`);
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          id="item-img"
          sx={{
            height: "100px",
            borderRadius: "10px",
            aspectRatio: "1/1",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box
          id="item-info-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: txtColor,
          }}
        >
          <Typography fontSize="14px">
            {product.name}{" "}
            <Typography variant="span" fontSize="18px">
              {" "}
              ({product.size})
            </Typography>
          </Typography>
          <Typography>₾ {product.price.toFixed(2)}</Typography>
        </Box>
        <Box
          id="item-buttons"
          sx={{
            alignSelf: "center",
            ml: "auto",
            display: "flex",
            gap: { md: 2, xs: 1 },
            flexDirection: { md: "row", xs: "column-reverse" },
            alignItems: "center",
          }}
        >
          <Box
            id="quantity-controls"
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.palette.primary.main,
              borderRadius: 5,
              px: 1,
              py: { md: "3px", xs: "1px" },
            }}
          >
            <QuantityButton
              onClick={() => {
                updateQuantity(
                  product.product,
                  product.size,
                  product.quantity + 1
                );
              }}
              disabled={
                product.quantity >=
                  products?.find((item) => product.product === item._id)
                    ?.stock || 0
              }
            >
              +
            </QuantityButton>
            <Typography
              fontSize="14px"
              color={`hsl(from ${theme.palette.primary.submain} h s calc(l*1.75))`}
            >
              {product.quantity}
            </Typography>
            <QuantityButton
              onClick={() => {
                updateQuantity(
                  product.product,
                  product.size,
                  product.quantity - 1
                );
              }}
            >
              -
            </QuantityButton>
          </Box>
          <Button
            id="delete-item"
            component="button"
            sx={{
              background: "none",
              border: "none",
              color: `hsl(from ${theme.palette.primary.submain} h s calc(l*1.25))`,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              minWidth: "auto",
            }}
            onClick={() => removeFromCart(product.product, product.size)}
          >
            <Box
              className="lni lni-trash-3"
              sx={{
                fontSize: "24px",
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
