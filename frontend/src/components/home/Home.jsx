import React, {useContext, useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import {productContext} from "../../App.jsx";
import axios from "axios";
import {Box, ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";

function Home() {
    const cookies = new Cookies(null, {path: '/'})
    const {products, setProducts} = useContext(productContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5050/api/products", {withCredentials: true})
                const productsArr = response.data
                setProducts(productsArr)
            } catch (errors) {
                console.log("Error: ", errors.message || errors.response?.data.message)
            }
        }

        fetchProducts()
    }, []);

    return (
        <>
            <MapItems/>
        </>
    );
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

        <Box sx={{maxWidth: 1200, margin: '0 auto', width: '100%'}}>
            <ImageList cols={cols} gap={16} sx={{p:12}}>
                {products.map((product) => (
                    <ItemCard product={product}/>
                ))}
            </ImageList>
        </Box>
    )
}

function ItemCard({product}) {
    const [isFocused, setIsFocused] = useState(false)
    
    const capitalizeProductName = productName => {
        let lst = productName.split(' ')
        lst = lst.map(str => `${str.charAt(0).toUpperCase()}${str.substring(1)}`)
        return lst.join(' ')
    }

    return (
        <ImageListItem key={product._id} sx={{
            padding: 1.5,
            borderRadius: 2,
            // backgroundColor: 'red', 
            transition: 'all 0.3s ease',
            maxWidth: '300px',
            '&:hover': {
                cursor: 'pointer',
                boxShadow: '0px 4px 35px 0px #A8ACB030',
                transform: 'translateY(4px)'
            }
        }}
                       onMouseEnter={() => setIsFocused(true)}
                       onMouseLeave={() => setIsFocused(false)}

        >
            <img

                src={isFocused ? product.images[1].url : product.images[0].url}
                alt={product.name}
                loading="lazy"
                style={{
                    width: '100%',
                    borderRadius: 8,
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                    maxHeight: '276px',
                    maxWidth: '276px',
                    transition: 'all 0.3s ease',
                    marginBottom: '12px'
                }}
            />
            <Typography fontFamily='Raleway, sans-serif' fontWeight='600' fontSize='18px'
                        sx={{
                            color: 'white'
                        }}>
                {capitalizeProductName(product.name)} 
            </Typography>
            <Typography fontFamily='Raleway, sans-serif'
                        sx={{
                            color: 'white'
                        }}>
                ${product.price}
            </Typography>
        </ImageListItem>
    )
}