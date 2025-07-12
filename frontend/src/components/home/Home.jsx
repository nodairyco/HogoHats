import React, {useContext, useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import {context} from "../../App.jsx";
import axios from "axios";
import {ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";

function Home(props) {
    const cookies = new Cookies(null, {path: '/'})
    const {products, setProducts} = useContext(context)

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

    const {products} = useContext(context)
    const isXs = useMediaQuery(theme.breakpoints.down('sm')); // <600px
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–900px
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 900–1200px

    const cols = isXs ? 2 : isSm ? 2 : isMd ? 3 : 4;

    return (
        <ImageList cols={cols} gap={16}>
            {products.map((product) => (
                <ImageListItem key={product._id} sx={{backgroundColor: 'red', padding: 1}}>
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        loading="lazy"
                        style={{width: '100%', borderRadius: 8, objectFit: 'crop', maxHeight:'300px', maxWidth:'300px'}}
                    />
                    <Typography>{product.name}</Typography>
                    <Typography>${product.price}</Typography>
                </ImageListItem>
            ))}
        </ImageList>
    )
}