import React, { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CartSubCompContext = createContext();

export const CartSubCompProvider = ({ children }) => {
    const [shippingData, setShippingData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });


    const [errors, setErrors] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    })
    const [searchParams, setSearchParams] = useSearchParams()
    const currentStep = searchParams.get('step') || 'cart'

    const goToNextStep = () => {
        switch (currentStep) {
            case 'cart':
                setSearchParams({ step: 'shipping' })
                break;
            default:
                setSearchParams({})
        }
    }

    const goToPrevStep = () => {
        switch (currentStep) {
            case 'shipping':
                setSearchParams({})
                break;
            default:
                setSearchParams({})
        }
    }

    const validateShippingData = () => {
        const newErrors = {
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            country: ''
        };

        // Validate full name
        if (!shippingData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (shippingData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        // Validate address
        if (!shippingData.address.trim()) {
            newErrors.address = 'Address is required';
        } else if (shippingData.address.trim().length < 5) {
            newErrors.address = 'Address must be at least 5 characters';
        }

        // Validate city
        if (!shippingData.city) {
            newErrors.city = 'City is required';
        }

        // Validate postal code
        if (!shippingData.postalCode.trim()) {
            newErrors.postalCode = 'Postal code is required';
        } else if (!/^\d{4,10}$/.test(shippingData.postalCode.trim())) {
            newErrors.postalCode = 'Postal code must be 4-10 digits';
        }

        // Validate country
        if (!shippingData.country) {
            newErrors.country = 'Country is required';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const clearErrors = () => {
        setErrors({
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            country: ''
        });
    };

    const handleClick = () => {
        if (currentStep === 'shipping') {
            const isValid = validateShippingData();
            if (isValid) {
                // Proceed to next step or submit
                console.log('Shipping data is valid:', shippingData);
                // Add logic to proceed to payment or submit order
            }
        } else {
            goToNextStep();
        }
    };

    const value = {
        shippingData,
        setShippingData,
        currentStep,
        goToPrevStep,
        handleClick,
        errors,
        setErrors,
        clearErrors,
        validateShippingData
    };

    return (
        <CartSubCompContext.Provider value={value}>
            {children}
        </CartSubCompContext.Provider>
    );
};

export const useCartSubComp = () => {
    const context = useContext(CartSubCompContext);
    if (!context) {
        throw new Error('useCartSubComp must be used within a CartSubCompProvider');
    }
    return context;
};

export default CartSubCompContext;
