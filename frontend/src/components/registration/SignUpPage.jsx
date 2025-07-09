import React, {useState} from 'react';
import RegistrationForm from "./subcomponents/RegistrationForm.jsx";
import {Box, Button} from "@mui/material";
import css from './Registration.module.css';
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function SignUpPage() {
    
    const cookies = new Cookies(null, { path: '/' })
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        requestError: ''
    })

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleSignUp = async (e) => {
        e.preventDefault()
        let newErrors = {}
        if (form.password && form.email && form.username) {
            console.log(form)

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

            if (form.username.includes(' ')) {
                newErrors.username = "Username cannot contain space"
            } else if (form.username.length < 3) {
                newErrors.username = "Username too short"
            } else if (form.username.length > 30) {
                newErrors.username = "Username too long"
            } else {
                newErrors.username = ""
            }

            setErrors(newErrors)

            if (!newErrors.password && !newErrors.email && !newErrors.username) {
                await signUp()
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

        if (form.username === '') {
            newErrors.username = "Username cannot be empty"
        }

        setErrors(newErrors)
    }

    const signUp = async () => {
        let err = ''
        try {
            const response = await axios.post("http://localhost:5050/api/users/register", form, {
                withCredentials: true
            })

            console.log(response.data)
        } catch (error) {
            err = error.response?.data.message
            console.error('Error posting data', error.response?.data || error.message)
        }
        
        setErrors(prevState => {
            return {...prevState, requestError: err}
        })
        
        if (err) {
            return
        }

        try {
            const response = await axios.post("http://localhost:5050/api/users/login", {
                email: form.email,
                password: form.password
            }, {withCredentials: true})

            const accessToken = response.data.accessToken
            cookies.set('accessToken', accessToken)
        } catch (error) {
            console.log('Retrieving token returned with error', error.response?.data || error.message)
        }
        
        navigate('/home')
    }

    return (
        <Box className={css.formContainer}>
            <h1 className={css.formHeader}>
                Sign Up
            </h1>
            <form onSubmit={handleSignUp} className={css.form}>
                <RegistrationForm form={form} setForm={setForm} errors={errors}/>
                <Button variant='contained' fullWidth type='submit'>
                    Sign Up
                </Button>
            </form>
            <Box className={css.linkContainer}>
                <Typography variant='p' color='primary.submain'>
                    Already have an account?
                </Typography>
                <Link to='/login' className={css.oppositeLink}>
                    Log In
                </Link>
            </Box>
        </Box>
    );
}

export default SignUpPage;