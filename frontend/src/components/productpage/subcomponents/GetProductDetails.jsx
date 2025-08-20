import { Box, Typography, Button } from "@mui/material";
import GetItemSize from "./GetItemSize";
import GetQuantity from "./GetQuantity";
import Skeleton from "react-loading-skeleton";
import GetProductName from "./GetProductName";
import GetItemColors from "./GetItemColors";

export default function GetProductDetails({
  currentProduct,
  chosenQuantity,
  setChosenQuantity,
  chosenSize,
  setChosenSize,
  sizeList,
  handleAddToCart,
}) {
  return (
    <Box
      sx={{
        mx: { xs: 2, md: 0 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <GetProductName currentProduct={currentProduct} />

      <Seperator />

      <GetItemColors />

      <Seperator />

      <GetItemSize
        chosenSize={chosenSize}
        setChosenSize={setChosenSize}
        sizeList={sizeList}
      />

      <Seperator />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        <GetQuantity
          currentProduct={currentProduct}
          chosenQuantity={chosenQuantity}
          setChosenQuantity={setChosenQuantity}
        />

        <Button
          sx={{
            width: "100%",
            boxShadow: "none",
            color: "primary.subTxtColor",
            backgroundColor: "primary.bgDarker",
            height: "56px",
            borderRadius:'30px',
            '&:hover':{
               backgroundColor: "primary.submain"  
            }
          }}
          onClick={handleAddToCart}
          disabled={!chosenSize || chosenQuantity === 0}
        >
          <Typography fontSize={20}> Add to Cart</Typography>
        </Button>
      </Box>
    </Box>
  );
}

const Seperator = () => {
  return (
    <Box
      id="seperator"
      sx={{
        width: "100%",
        borderBottom: "1px solid",
        borderBottomColor: "primary.bgDarker",
        my: 2,
      }}
    />
  );
};
