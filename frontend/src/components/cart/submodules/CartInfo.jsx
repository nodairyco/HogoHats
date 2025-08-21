import { useTheme } from "@emotion/react";
import { Box, Typography, Button } from "@mui/material";
import { useCartSubComp } from "../CartSubCompContext.jsx";

export default function CartInfo({ getCartTotal }) {
  const theme = useTheme();

  const { currentStep, handleClick } = useCartSubComp();

  const txtColor = `hsl(from ${theme.palette.primary.submain} h s calc(l*0.3))`;

  const getButtonText = () => {
    switch (currentStep) {
      case "cart":
        return "Go to Shipping";
      case "shipping":
        return "Continue to Payment";
      default:
        return "Continue";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        borderRadius: "20px",
        p: 2,
        height: "fit-content",
        border: "1px solid hsl(from var(--bg-color) h s calc(l * 1.5))",
        color: "primary.subTxtColor",
        fontFamily: "Roboto, sans-serif",
      }}
      id="cart-info"
    >
      <Box
        id="cart-total"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
          }}
        >
          Subtotal
        </Typography>

        <Typography
          id="cart-total"
          sx={{
            fontSize: "18x",
            fontWeight: 500,
          }}
        >
          ₾{getCartTotal()}
        </Typography>
      </Box>
      <Box
        id="shipping-total"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
          }}
        >
          Shipping:
        </Typography>

        <Typography
          id="cart-total"
          sx={{
            fontSize: "18x",
            fontWeight: 500,
          }}
        >
          ₾0.00
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          borderBottom: `1px solid hsl(from var(--bg-color) h s calc(l * 1.5))`,
          py: 1.5,
        }}
      />
      <Box
        id="shipping-total"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
          }}
        >
          Total:
        </Typography>
        <Typography
          id="cart-total"
          sx={{
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          ₾{getCartTotal()}
        </Typography>
      </Box>
      <Button
        id="continue-button"
        sx={{
          width: "100%",
          mt: 2,
          boxShadow: "none",
          borderRadius: "20px",
          height: "50px",
        }}
        variant="contained"
        onClick={() => {
          handleClick();
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          {getButtonText()}
        </Typography>
      </Button>
    </Box>
  );
}
