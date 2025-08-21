import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container } from "@mui/material";
import useCart from "../../CartContext";
import ProductContext from "../../ProductContext";
import "react-loading-skeleton/dist/skeleton.css";
import { MainImageContainer } from "./subcomponents/MainImageContainer";
import RenderProductImages from "./subcomponents/RenderProductImages";
import GetProductDetails from "./subcomponents/GetProductDetails";

function ProductDetails() {
  const params = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const [currentlyChosenPicture, setCurrentlyChosenPicture] = useState();
  const [chosenQuantity, setChosenQuantity] = useState(0);
  const [chosenSize, setChosenSize] = useState("");
  const [height, setHeight] = useState(null);

  const sizeList = ["Small", "Medium", "Large"];

  const { addToCart } = useCart();
  const { backend, setIsLoading } = useContext(ProductContext);

  const handleAddToCart = () => {
    if (!chosenSize) {
      return;
    }

    addToCart(currentProduct, chosenQuantity, chosenSize);
    setChosenQuantity(0);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backend}/api/products/${params.id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: "Bearer SvQf1kk5MFTPMON0jxkN3DMn",
            },
          }
        );
        const product = response.data;
        setCurrentProduct(product);
        setCurrentlyChosenPicture(product.images[0].url);
      } catch (e) {
        console.log(
          "Fetching product returned with error: ",
          e.response?.data.message || e.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <Container
      id="product-details-container"
      sx={{
        height: "fit-content",
        display: "flex",
        gap: { xs: 0, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        overflow: "hidden",
        color: "primary.subTxtColor",
        my: { xs: 0, md: 9 },
      }}
    >
      <Box
        id="images-container"
        sx={{
          display: "flex",
          gap: { xs: 0, md: 4 },
          flexDirection: { xs: "column-reverse", md: "row" },
          flex: 1,
        }}
      >
        <RenderProductImages
          currentProduct={currentProduct}
          currentlyChosenPicture={currentlyChosenPicture}
          setCurrentlyChosenPicture={setCurrentlyChosenPicture}
          height={height}
        />

        <MainImageContainer
          currentlyChosenPicture={currentlyChosenPicture}
          setHeight={setHeight}
        />
      </Box>
      <Box
        id="details"
        sx={{
          minWidth: "290px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
          pb: 2,
          flex: 1,
        }}
      >
        <GetProductDetails
          currentProduct={currentProduct}
          chosenQuantity={chosenQuantity}
          setChosenQuantity={setChosenQuantity}
          chosenSize={chosenSize}
          setChosenSize={setChosenSize}
          sizeList={sizeList}
          handleAddToCart={handleAddToCart}
        />
      </Box>
    </Container>
  );
}

export default ProductDetails;
