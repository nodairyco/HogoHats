import React, {useState} from 'react';
import {Link} from "react-router-dom";
import RegistrationForm from "./subcomponents/RegistrationForm.jsx";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import css from './Registration.module.css'

function LoginPage() {
    const [form, setForm] = useState({
        email:"",
        password:""
    })
    
    const [errors, setErrors] = useState({
        email:"",
        password:"",
        requestError: ""
    })
    
    const handleLogin = () => {
        
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