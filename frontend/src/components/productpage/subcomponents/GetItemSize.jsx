import { Box, Button, Typography } from "@mui/material";
import Skeleton from "react-loading-skeleton";

export default function GetItemSize({
  chosenSize,
  setChosenSize,
  sizeList,
  currentProduct,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
    >
      {currentProduct.name ? (
        <>
          <Typography fontSize={16} fontWeight={400}>
            Select Size
          </Typography>
          <Box
            id="size-choice-container"
            component={"ul"}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              p: 0,
              flexWrap: "wrap",
            }}
          >
            {sizeList?.map((size) => (
              <Box
                key={size}
                component={"li"}
                sx={{
                  fontSize: 20,
                  fontWeight: 400,
                  py: 1,
                  px: 2,
                  backgroundColor:
                    chosenSize === size ? "primary.main" : "primary.bgDarker",
                  borderRadius: "30px",
                  cursor: "pointer",
                  color: "white",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: chosenSize !== size && "primary.submain",
                  },
                  listStyle: "none",
                }}
                onClick={() => setChosenSize(size)}
              >
                {size}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Skeleton height={60} />
      )}
    </Box>
  );
}
