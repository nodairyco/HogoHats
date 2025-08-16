import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import { Box, Button } from "@mui/material";
import { Await, useNavigate } from "react-router-dom";
import useCart from '../../CartContext';
import ProductContext from '../../ProductContext';

function AdminPanel() {
    const { getCart } = useCart()
    const cookies = new Cookies(null, { path: '/' })
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
    const { backend } = useContext(ProductContext)
    const refreshToken = async () => {
        try {
            const response = await axios.post(`${backend}/api/users/refresh`, {}, { withCredentials: true })
            const accessToken = response.data.accessToken
            cookies.set('accessToken', accessToken)
            console.log(cookies.get('accessToken'))
        } catch (error) {
            console.log("An issue came up: " + error.response?.data.message || error.message)
        }
    }

    useEffect(() => {
        console.log(getCart());
    }, [])


    //
    // useEffect(async () => {
    //     try {
    //         await axios.post("http://localhost:5050/api/users/login")
    //     } catch (error){
    //        
    //     }
    // }, []);

    return (
        <>
            <Button onClick={refreshToken} variant='contained'>
                Refresh thine token
            </Button>
            <Button onClick={() => navigate('/home')}>
                go to  home
            </Button>
            {
                isAdmin ?
                    <Box>
                        u are admin
                    </Box> :
                    <Box>
                        u are not admin
                    </Box>
            }
        </>
    );
}

export default AdminPanel;