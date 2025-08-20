import { Box, Typography } from "@mui/material";
import Skeleton from "react-loading-skeleton";

export default function GetProductName({ currentProduct }) {
  return (
    <Box
      id="product-name-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
    >
      <Typography
        id="product-name"
        variant="p"
        sx={{
          fontWeight: 700,
          fontStyle: "Bold",
          fontSize: 40,
          textTransform: "uppercase",
          fontFamily: "Roboro, sans-serif",
          height: "fit-content",
        }}
      >
        {currentProduct.name || <Skeleton />}
      </Typography>

      <Typography
        id="price"
        variant="h5"
        sx={{
          fontWeight: 700,
          fontStyle: "Bold",
          fontSize: 30,
          fontFamily: "Roboro, sans-serif",
        }}
      >
        ₾ {currentProduct.price || <Skeleton />}
      </Typography>
      <Typography
        id="description"
        variant="p"
        sx={{ fontSize: "16px", fontWeight: "400", fontStyle: "Regular" }}
      >
        {currentProduct.description || <Skeleton />}
      </Typography>
    </Box>
  );
}
