import React, {useContext, useEffect, useState} from 'react';
import {productContext} from "../../App.jsx";
import axios from "axios";
import {Box, ImageList, useMediaQuery, useTheme} from "@mui/material";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import PopUp from "./subcomponents/PopUp.jsx";
import ItemCard from "./subcomponents/ItemCard.jsx";
import HomeTopBar from "./subcomponents/HomeTopBar.jsx";
import {HomeContext as HomeContext1} from "./HomeContext.jsx";

function Home() {
    const {setProducts, products} = useContext(productContext)
    const [searchParams] = useSearchParams()
    const displayPopUp = searchParams.has('inl') && searchParams.get('inl') === 'true'
    const [filters, setFilters] = useState({
        pageNum: 1,
        sortBy: '',
        sortOrder: '',
        minPrice: 0,
        maxPrice: 10000000,
        category: ''
    })
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [totalItems, setTotalItems] = useState(0)
    const params = useParams()
    const location = useLocation()

    // Retrieve paginated items
    // This code runs on the first render and everytime filters.pageNum is updated
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            const category = params.category
            try {
                const response = await axios.get("http://localhost:5050/api/products",
                    {
                        withCredentials: true,
                        params: {
                            limit: 10,
                            page: filters.pageNum,
                            sortBy: filters.sortBy,
                            sortOrder: filters.sortOrder,
                            minPrice: filters.minPrice,
                            maxPrice: filters.maxPrice,
                            category: location.pathname === '/home'? '' : category
                        }
                    })
                const productsArr = response.data.products

                setProducts(prev => filters.pageNum === 1 ? productsArr : [...prev, ...productsArr])
                setTotalItems(response.data.total)

                if (response.data.totalPages <= filters.pageNum) {
                    setHasMore(false)
                }

            } catch (errors) {
                console.log("Error: ", errors.message || errors.response?.data.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [filters.pageNum, filters.sortOrder, filters.sortBy, filters.minPrice, filters.maxPrice]);

    // Update filters.pageNum on every scroll to bottom. 
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            if (!isLoading && hasMore && scrollTop + clientHeight >= scrollHeight - 200) {
                // Close to bottom
                setFilters(prev => ({...prev, pageNum: prev.pageNum + 1}));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>

            <HomeContext1 value={{totalItems, setTotalItems, setFilters, filters}}>
                <>
                    <HomeTopBar/>
                    <PopUp disp={displayPopUp}/>
                    <MapItems/>
                </>
            </HomeContext1>
        </Box>
    )
        ;
}

export default Home;

function MapItems() {
    const theme = useTheme()

    const {products} = useContext(productContext)
    const isXs = useMediaQuery(theme.breakpoints.down('sm')); // <600px
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–900px
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 900–1200px

    const cols = isXs ? 2 : isSm ? 2 : isMd ? 3 : 4;

    return (

        <Box sx={{margin: '0 auto', width: '100%'}}>
            <ImageList cols={cols} gap={16} sx={{p: isXs ? 1 : 4, width: '100%'}}>
                {products.map((product) => (
                    <ItemCard product={product}/>
                ))}
            </ImageList>
        </Box>
    )
}
