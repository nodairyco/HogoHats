import { useContext, useEffect } from "react";
import ProductContext from "../../ProductContext.jsx";
import axios from "axios";
import {
  Box,
  Container,
  ImageList,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PopUp from "./subcomponents/PopUp.jsx";
import ItemCard from "./subcomponents/ItemCard.jsx";
import HomeTopBar from "./subcomponents/HomeTopBar.jsx";
import CardSkeleton from "./subcomponents/CardSkeleton.jsx";
import Nav from "../navbar/Nav.jsx";

function Home() {
  const {
    setProducts,
    setFilters,
    hasMore,
    setHasMore,
    isLoading,
    setIsLoading,
    setTotalItems,
    filters,
    backend,
  } = useContext(ProductContext);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const displayPopUp =
    searchParams.has("inl") && searchParams.get("inl") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setFilters((prev) => ({ ...prev, pageNum: 1 }));
      setHasMore(true);
      setProducts([]);
      setIsLoading(true);
      const category = params.category;
      try {
        const response = await axios.get(`${backend}/api/products`, {
          withCredentials: true,
          params: {
            limit: 10,
            page: filters.pageNum,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            category: navigate.pathname === "/home" ? "" : category,
          },
        });
        const productsArr = response.data.products;

        setProducts((prev) =>
          filters.pageNum === 1 ? productsArr : [...prev, ...productsArr]
        );
        setTotalItems(response.data.total);

        if (response.data.totalPages <= filters.pageNum) {
          setHasMore(false);
        }
      } catch (errors) {
        console.log("Error: ", errors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    filters.pageNum,
    filters.sortOrder,
    filters.sortBy,
    filters.minPrice,
    filters.maxPrice,
    params.category,
  ]);

  // Update filters.pageNum on every scroll to bottom.
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        !isLoading &&
        hasMore &&
        scrollTop + clientHeight >= scrollHeight - 200
      ) {
        // Close to bottom
        setFilters((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
      <Nav />
      <HomeTopBar />
      <PopUp disp={displayPopUp} />
      <MapItems />
    </Box>
  );
}

export default Home;

function MapItems() {
  const theme = useTheme();

  const { products, isLoading } = useContext(ProductContext);
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–900px
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900–1200px

  const cols = isXs ? 2 : isSm ? 2 : isMd ? 3 : 4;
  const arr = Array(12).keys();

  if (isLoading) {
    return (
      <Container sx={{ margin: "0 auto", width: "100%" }}>
        <ImageList cols={cols} gap={16} sx={{ p: isXs ? 1 : 4, width: "100%" }}>
          {arr.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </ImageList>
      </Container>
    );
  }

  return (
    <Box sx={{ margin: "0 auto", width: "100%" }}>
      <ImageList cols={cols} gap={16} sx={{ p: isXs ? 1 : 4, width: "100%" }}>
        {products.map((product) => (
          <ItemCard key={product._id} product={product} />
        ))}
      </ImageList>
    </Box>
  );
}
