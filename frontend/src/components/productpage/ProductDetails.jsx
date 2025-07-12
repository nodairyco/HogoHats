import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const params = useParams()
    const [currentProduct, setCurrentProduct] = useState({})
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/api/products/${params.id}`, {withCredentials: true})
                const product = response.data
                setCurrentProduct(product)
            } catch (e) {
                console.log("Fetching product returned with error: ", e.response?.data.message || e.message)
            }
        }

        fetchProduct()
    }, []);

    return (
        <div>
            {
                currentProduct && currentProduct.images &&
                <img alt='productImg' src={currentProduct.images[0].url} style={{width: '300px', aspectRatio: '1/1'}}/>
            }
        </div>
    );
}

export default ProductDetails;