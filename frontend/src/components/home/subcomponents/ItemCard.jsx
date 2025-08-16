import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ItemCard({ product }) {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <ImageListItem
      key={product._id}
      sx={{
        padding: 1.5,
        borderRadius: 2,
        maxWidth: "350px",
        // backgroundColor: 'red',
        transition: "all 0.3s ease",
        width: "fit-content",
        // display: 'grid',
        // gridTemplateRows: '1fr auto auto',
        "&:hover": {
          cursor: "pointer",
          boxShadow: "0px 4px 35px 0px #A8ACB030",
          transform: "translateY(4px)",
        },
      }}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <Box
        component="img"
        src={isFocused ? product.images[1].url : product.images[0].url}
        alt={product.name}
        loading="lazy"
        sx={{
          width: "100%",
          borderRadius: 8,
          objectFit: "cover",
          aspectRatio: "1/1",
          transition: "all 0.3s ease",
          overflow: "hidden",
          marginBottom: "12px",
        }}
      />
      <Box sx={{ mt: 1 }}>
        <Typography
          fontFamily="Raleway, sans-serif"
          fontWeight="600"
          fontSize="18px"
          sx={{
            color: "white",
            textOverflow: "ellipsis",
            whiteSpace: "nowarp",
            overflow: "hidden",
            width: "100%",
            textTransform: "capitalize",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          fontFamily="Raleway, sans-serif"
          sx={{
            color: "white",
          }}
        >
          ${product.price}
        </Typography>
      </Box>
    </ImageListItem>
  );
}
