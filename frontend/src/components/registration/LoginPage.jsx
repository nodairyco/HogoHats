import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import RegistrationForm from "./subcomponents/RegistrationForm.jsx";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import css from './Registration.module.css'
import axios from "axios";
import Cookies from "universal-cookie";

function LoginPage() {
    const cookies = new Cookies(null, {path: '/'})
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        requestError: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        let newErrors = {}

        if (form.password && form.email) {
            if (form.password.includes(' ')) {
                newErrors.password = "Password cannot contain space"
            } else if (form.password.length < 8) {
                newErrors.password = "Password too short"
            } else if (!/\d/.test(form.password)) {
                newErrors.password = "Password must contain numbers"
            } else {
                newErrors.password = ""
            }

            if (!/^\S+@\S+\.\S+$/.test(form.email)) {
                newErrors.email = "Email Format error"
            } else {
                newErrors.email = ""
            }

            setErrors(newErrors)

            if (!newErrors.password && !newErrors.email) {
                await login()
            }

            console.log(errors)
            return
        }

        if (form.password === '') {
            newErrors.password = "Password cannot be empty"
        }

        if (form.email === '') {
            newErrors.email = "Email cannot be empty"
        }

        setErrors(newErrors)
    }

    const login = async () => {
        let err = ''

        try {
            const response =
                await axios.post("http://localhost:5050/api/users/login", form, {withCredentials: true})
            const accessToken = response.data.accessToken
            cookies.set('accessToken', accessToken)
        } catch (error) {
            err = error.response?.data.message
            console.log('Retrieving token returned with error', error.response?.data || error.message)
        }
        setErrors(prevState => {
            return {...prevState, requestError: err}
        })
        
        if (err)
            return
        navigate('/home')
    }

    return (
        <Box className={css.formContainer}>
            <h1 className={css.formHeader}>
                Log In
            </h1>
            <form onSubmit={handleLogin} className={css.form}>
                <RegistrationForm form={form} setForm={setForm} errors={errors}/>
                <Button variant='contained' fullWidth type='submit'>
                    Log In
                </Button>
            </form>
            <Box className={css.linkContainer}>
                <Typography variant='p' color='primary.submain'>
                    Already have an account?
                </Typography>
                <Link to='/signup' className={css.oppositeLink}>
                    Sign up
                </Link>
            </Box>
        </Box>
    );
}

export default LoginPage;