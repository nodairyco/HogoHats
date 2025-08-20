import { Box, Button, Typography } from "@mui/material";

export default function GetItemSize({ chosenSize, setChosenSize, sizeList }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width:'100%'
      }}
    >
      <Typography fontSize={16} fontWeight={400}>
        Select Size
      </Typography>
      <Box
        id="size-choice-container"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {sizeList?.map((size) => (
          <Box
            key={size}
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
            }}
            onClick={() => setChosenSize(size)}
          >
            {size}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
