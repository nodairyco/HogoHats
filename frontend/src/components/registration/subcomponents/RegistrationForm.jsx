import React from 'react';
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import css from '../Registration.module.css'

function RegistrationForm({form, setForm, errors}) {
    return (
        <Box fullWidth sx={{gap: 2, display: 'flex', flexDirection: 'column'}}>
            {
                Object.keys(form).map((field, index) => {
                    return (
                        <Box key={index} fullWidth gap={2}>
                            <TextField
                                className={css.formTextField}
                                name={field}
                                label={`${field.charAt(0).toLocaleUpperCase()}${field.slice(1, field.length)}`}
                                onChange={(e) => {
                                    setForm({...form, [field]: e.target.value})
                                }}
                                variant='outlined'
                                color={errors[field] ? 'error' : 'primary'}
                                type={field === 'email' ? 'text' : field}
                                fullWidth
                            />
                            <Typography color='error'>
                                {errors[field] || " "}
                            </Typography>
                        </Box>
                    )
                })
            }
            {
                errors.requestError && 
                <Typography color='error'>
                    {errors.requestError}
                </Typography>
            }
        </Box>
    );
}

export default RegistrationForm;