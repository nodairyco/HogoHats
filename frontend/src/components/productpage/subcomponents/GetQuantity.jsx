import { Box, Button, Typography } from "@mui/material";
import useCart from "../../../CartContext";

export default function GetQuantity({
  currentProduct,
  chosenQuantity,
  setChosenQuantity,
}) {
  const { getCart } = useCart();
  const cart = getCart();

  const totalItemQuantityIncart = cart?.reduce((count, item) => {
    if (item.product === currentProduct._id) {
      return count + item.quantity;
    }
    return count;
  }, 0);

  const handleQuantityChange = (increase) => {
    setChosenQuantity((prev) => {
      console.log(currentProduct.stock - totalItemQuantityIncart);

      if (increase && chosenQuantity < currentProduct.stock) {
        return prev + 1;
      }

      if (!increase && chosenQuantity > 0) {
        return prev - 1;
      }

      return prev;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "primary.main",
        borderRadius: 30,
        px:2,
        py:1
      }}
    >
      <Button
        disabled={chosenQuantity === 0}
        sx={{
          minWidth: "fit-content !important",
          py: 1,
          px: 1,
          borderRadius: "50%",
          color: "primary.subTxtColor",
          transition: "background-color 0.3s linear",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        onClick={() => {
          handleQuantityChange(false);
        }}
      >
        <Box component={"i"} className="lni lni-minus" fontSize={24} />
      </Button>
      <Typography fontSize="18px" color="primary.contrastText">
        {chosenQuantity}
      </Typography>
      <Button
        disabled={
          chosenQuantity === currentProduct.stock - totalItemQuantityIncart ||
          !currentProduct.stock
        }
        sx={{
          minWidth: "fit-content !important",
          py: 1,
          px: 1,
          borderRadius: "50%",
          color: "primary.subTxtColor",
          transition: "background-color 0.3s linear",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        onClick={() => {
          handleQuantityChange(true);
        }}
      >
        <Box component={"i"} className="lni lni-plus" fontSize={24} />
      </Button>
    </Box>
  );
}
