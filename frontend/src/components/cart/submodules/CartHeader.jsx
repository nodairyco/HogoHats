import { Box, Button, Typography } from "@mui/material";

export default function CartHeader({ clearCart, stepName }) {
  return (
    <Box
      id="cart-header"
      sx={{ display: "flex", justifyContent: "space-between", mb:3 }}
    >
      <Typography
        variant="h4"
        id="cart-info"
        sx={{
          fontWeight: 700,
          color: "primary.subTxtColor",
          fontSize: { xs: 32, md: 40 },
        }}
      >
        {stepName}
      </Typography>

      <Button
        id="empty-cart-btn"
        variant="text"
        sx={{
          gap: 1,
          display: "flex",
          alignItems: "center",
          color: "primary.subTxtColor",
          "&:hover": {
            borderBottom: "1px solid",
            borderBottomColor: "primary.subTxtColor",
          },
        }}
        onClick={() => clearCart()}
      >
        <Box component="i" className="lni lni-trash-3" fontSize="24px" />
        <Typography
          variant="span"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Empty Cart
        </Typography>
      </Button>
    </Box>
  );
}
