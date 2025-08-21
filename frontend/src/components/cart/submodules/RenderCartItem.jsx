import React, { useContext } from "react";
import useCart from "../../../CartContext";
import { Box, Button, styled, Typography } from "@mui/material";
import ProductContext from "../../../ProductContext";

export function RenderCartItem({ product }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { products } = useContext(ProductContext);

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
        color: "primary.subTxtColor",
      }}
    >
      <Box
        component="img"
        sx={{
          height: { xs: 80, md: 124 },
          aspectRatio: 1,
          borderRadius: 2,
          objectFit: "cover",
        }}
        src={product.image}
        alt={product.name}
        id="item-img"
      />
      <Box
        id="item-deets-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Box
          id="item-name-trash"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "fit-content",
          }}
        >
          <Typography
            id="item-name"
            sx={{
              fontSize: { xs: 16, md: 20 },
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {product.name}
          </Typography>
          <Box
            id="trash"
            component="i"
            sx={{
              fontSize: { xs: 20, md: 24 },
              cursor: "pointer",
            }}
            className="lni lni-trash-3"
            onClick={() => removeFromCart(product.product, product.size)}
          />
        </Box>
        <Box id="item-size-color">
          <Box id="size">
            <Typography variant="span" fontSize={16}>
              Size:{" "}
            </Typography>
            <Typography
              variant="span"
              color="#ffffff"
              fontSize={16}
              fontWeight={600}
            >
              {product.size}
            </Typography>
          </Box>
          <Box
            id="color"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography variant="span" fontSize={16}>
              Color:{" "}
            </Typography>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "primary.main",
              }}
            />
          </Box>
        </Box>
        <Box
          id="item-price-quantity"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "fit-content",
            pt: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            id="price"
            variant="h5"
            sx={{
              fontWeight: 700,
              fontStyle: "Bold",
              fontSize: 24,
              fontFamily: "Roboro, sans-serif",
            }}
          >
            {"₾ " + product.price}
          </Typography>
          <Box
            id="quantity-controls"
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "row-reverse",
              alignItems: "center",
              backgroundColor: "primary.main",
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
              sx={{
                color: "primary.subTxtColor",
              }}
            >
              <Box
                component={"i"}
                className="lni lni-plus"
                fontSize={24}
                color="primary.subTxtColor"
              />
            </QuantityButton>
            <Typography fontSize="14px">{product.quantity}</Typography>
            <QuantityButton
              onClick={() => {
                updateQuantity(
                  product.product,
                  product.size,
                  product.quantity - 1
                );
              }}
              sx={{
                color: "primary.subTxtColor",
              }}
            >
              <Box component={"i"} className="lni lni-minus" fontSize={24} />
            </QuantityButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
