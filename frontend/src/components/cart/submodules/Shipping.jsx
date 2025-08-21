import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material'
import React, { useMemo } from 'react'
import { useCartSubComp } from '../CartSubCompContext.jsx'

// Country and cities data
const countriesAndCities = {
    "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
    "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener"],
    "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Leeds", "Sheffield", "Edinburgh", "Bristol", "Cardiff"],
    "Germany": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig"],
    "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
    "Georgia": ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Gori", "Zugdidi", "Poti", "Kobuleti", "Khashuri", "Samtredia"],
    "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania"],
    "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Sunshine Coast", "Wollongong"],
    "Japan": ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kawasaki", "Kyoto", "Saitama"]
};

export default function Shipping() {
    const { shippingData, setShippingData, errors, setErrors } = useCartSubComp();

    const availableCities = useMemo(() => {
        return countriesAndCities.Georgia;
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prev => ({
            ...prev,
            [name]: value,
            // Reset city when country changes
            ...(name === 'country' && { city: '' })
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <Box sx={{ flex: 2.5, width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }} id='cart-shipping'>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Shipping Information
            </Typography>

            <Box>
                <TextField
                    name="fullName"
                    label="Full Name"
                    value={shippingData.fullName}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'error.main',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'error.main',
                        },
                    }}
                />

                <TextField
                    name="address"
                    label="Address"
                    value={shippingData.address}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                    error={!!errors.address}
                    helperText={errors.address}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'error.main',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'error.main',
                        },
                    }}
                />

                <FormControl required fullWidth variant="outlined" error={!!errors.city}>
                    <InputLabel sx={{ '&.Mui-error': { color: 'error.main' } }}>City</InputLabel>
                    <Select
                        name="city"
                        value={shippingData.city}
                        onChange={handleInputChange}
                        label="City"
                        sx={{
                            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'error.main',
                            },
                        }}
                    >
                        {availableCities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                </FormControl>

                <TextField
                    name="postalCode"
                    label="Postal Code"
                    value={shippingData.postalCode}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                    inputProps={{
                        pattern: '[0-9]*',
                        inputMode: 'numeric'
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'error.main',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'error.main',
                        },
                    }}
                />
            </Box>
        </Box>
    )
}
