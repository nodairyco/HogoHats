import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import useCart from "../../CartContext";
import ProductContext from "../../ProductContext";

function ProductDetails() {
  const params = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentlyChosenPicture, setCurrentlyChosenPicture] = useState();
  const [chosenQuantity, setChosenQuantity] = useState(0);
  const [chosenSize, setChosenSize] = useState("");
  const inputRef = useRef(null);
  const sizeList = ["s", "m", "l"];
  const { addToCart } = useCart();
  const { backend, isLoading, setIsLoading } = useContext(ProductContext);
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

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

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box
      id="product-details-container"
      sx={{
        height: "fit-content",
        display: "flex",
        gap: { xs: 0, md: 4 },
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        id="images-container"
        sx={{
          display: "flex",
          gap: { xs: 0, md: 4 },
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        {renderProductImages(
          currentProduct,
          currentlyChosenPicture,
          setCurrentlyChosenPicture
        )}
        <MainImageContainer currentlyChosenPicture={currentlyChosenPicture} />
        {isBelowMd && (
          <Typography
            id="product-name"
            variant="p"
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              pb: "10px",
              mx: { xs: 2, md: 0 },
            }}
          >
            {currentProduct.name}
          </Typography>
        )}
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
        }}
      >
        {GetProductDetails(
          currentProduct,
          inputRef,
          chosenQuantity,
          setChosenQuantity,
          chosenSize,
          setChosenSize,
          sizeList,
          handleAddToCart,
          isBelowMd
        )}
      </Box>
    </Box>
  );
}

export default ProductDetails;

const MainImageContainer = ({ currentlyChosenPicture }) => {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(2);
  const handleZoom = () => {
    setZoom((prev) => {
      switch (prev) {
        case 2:
          return 3;

        case 3:
          return 4;

        default:
          return 2;
      }
    });
  };

  const handleHover = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * 100) / rect.width;
    const y = ((event.clientY - rect.top) * 100) / rect.height;

    setOffset({ x, y });
  };

  const handleTouchMove = (event) => {
    if (!ref.current || !event.touches[0]) return;
    const rect = ref.current.getBoundingClientRect();
    const touch = event.touches[0];
    const x = ((touch.clientX - rect.left) * 100) / rect.width;
    const y = ((touch.clientY - rect.top) * 100) / rect.height;
    setOffset({ x, y });
  };

  return (
    <Box
      /*className={css.mainImageContainer}*/ ref={ref}
      sx={{
        position: "relative",
        "&::after": {
          position: "absolute",
          content: '""',
          width: imgRef.current?.getBoundingClientRect().width,
          height: imgRef.current?.getBoundingClientRect().height,
          backgroundImage: `url(${currentlyChosenPicture})`,
          top: 0,
          left: 0,
          backgroundSize: `${zoom * 100}%`,
          display: hovered ? "block" : "none",
          backgroundPosition: `${offset.x}% ${offset.y}%`,
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",
          cursor: "zoom-in",
          mx: { xs: 2, md: 0 },
          touchAction: "none",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => handleHover(event)}
      onClick={() => handleZoom()}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <Box
        component="img"
        alt="currently-chosen-picture"
        src={currentlyChosenPicture}
        sx={{
          borderRadius: "8px",
          maxWidth: { xs: "calc(100% - 32px)", md: "500px" },
          mx: { xs: 2, md: 0 },
          touchAction: "none",
        }}
        id="main-image"
        ref={imgRef}
      />
    </Box>
  );
};

function GetProductDetails(
  currentProduct,
  inputRef,
  chosenQuantity,
  setChosenQuantity,
  chosenSize,
  setChosenSize,
  sizeList,
  handleAddToCart,
  isBelowMd
) {
  return (
    <>
      <Box
        id="product-name-container"
        sx={{ display: "flex", flexDirection: "column", mx: { xs: 2, md: 0 } }}
      >
        {!isBelowMd && (
          <Typography
            id="product-name"
            variant="p"
            sx={{ fontSize: "30px", fontWeight: "600" }}
          >
            {currentProduct.name}
          </Typography>
        )}
        <Typography
          id="description"
          variant="p"
          sx={{ fontSize: "20px", fontWeight: "400" }}
        >
          {currentProduct.description}
        </Typography>
      </Box>
      <Box
        id="price-and-form-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          mx: { xs: 2, md: 0 },
        }}
      >
        <Box
          id="price-container"
          sx={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <Typography
            id="price-p"
            variant="h5"
            sx={{ fontWeight: "700", fontSize: "18px" }}
          >
            PRICE:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "700", fontSize: "24px" }}>
            ${currentProduct.price}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {GetItemSize(chosenSize, setChosenSize, sizeList)}
          <GetQuantity
            currentProduct={currentProduct}
            chosenQuantity={chosenQuantity}
            setChosenQuantity={setChosenQuantity}
          />
          <Button
            variant="contained"
            sx={{ height: "50px" }}
            onClick={handleAddToCart}
            disabled={!chosenSize || chosenQuantity === 0}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </>
  );
}

function renderProductImages(
  currentProduct,
  currentlyChosenPicture,
  setCurrentlyChosenPicture
) {
  return (
    <Box id="sub-image-container-list">
      <Box
        component="ul"
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          listStyleType: "none",
          gap: "8px",
          padding: 0,
          mx: { xs: 2, md: 0 },
        }}
      >
        {currentProduct.images?.map((image, index) => {
          const bgLightValue = currentlyChosenPicture === image.url ? 3 : 1;
          return (
            <Box
              id="sub-image-li"
              sx={{ position: "relative", height: "fit-content" }}
              key={index}
            >
              <Box
                component="img"
                src={image.url}
                alt={`sub-image-${index}`}
                sx={{
                  width: { xs: "auto", md: "160px" },
                  height: { xs: "100px", md: "auto" },
                  borderRadius: "8px",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: `hsl(from var(--bg-color) h s calc(l * ${bgLightValue}) / 0.5)`,
                  height: "calc(100% - 6.5px)",
                  zIndex: 2,
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: currentlyChosenPicture === image.url ? "" : "pointer",
                  "&:hover": {
                    backgroundColor: `hsl(from var(--bg-color) h s calc(l * 3) / 0.5)`,
                  },
                  borderRadius: "8px",
                }}
                onClick={() => {
                  if (currentlyChosenPicture === image.url) return;
                  setCurrentlyChosenPicture(image.url);
                }}
                id="image-overlay"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function GetQuantity({ currentProduct, chosenQuantity, setChosenQuantity }) {
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
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        disabled={chosenQuantity === 0}
        onClick={() => {
          handleQuantityChange(false);
        }}
      >
        -
      </Button>
      <Typography fontSize="18px" color="primary.contrastText">
        {chosenQuantity}
      </Typography>
      <Button
        variant="outlined"
        disabled={
          chosenQuantity === currentProduct.stock - totalItemQuantityIncart
        }
        onClick={() => {
          handleQuantityChange(true);
        }}
      >
        +
      </Button>
    </Box>
  );
}

const GetItemSize = (chosenSize, setChosenSize, sizeList) => {
  return (
    <Box
      id="size-choice-container"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {sizeList.map((size, index) => (
        <Button
          id={`size-${size}-button`}
          key={index}
          variant={chosenSize === size ? "contained" : "outlined"}
          onClick={() => {
            setChosenSize(size);
          }}
        >
          <Typography>{size.toUpperCase()}</Typography>
        </Button>
      ))}
    </Box>
  );
};
