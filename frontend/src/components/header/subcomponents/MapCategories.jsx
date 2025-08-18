import { Box, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { HeaderButton } from "../StyledHeaderComponents";
import { useState } from "react";

const MapCategories = ({ isBelowMd, theme }) => {
    const categories = ['women', 'men', 'kids', 'premium']
    const navigate = useNavigate()
    const [categoriesDropdown, setCategoriesDropdown] = useState(false)
    const location = useLocation()
    const category = location.pathname.startsWith('/HogoHats/products') ? location.pathname.split('/')[3] : null;

    const getIconFromCategory = (category) => {
        switch (category) {
            case "women": return ["fa fa-female", "Women"];
            case "men": return ["fa fa-male", "Men"];
            case "kids": return ["fa fa-child", "Kids"];
            case "premium": return ["fa fa-dollar-sign", "Premium"];
            default: return ["fa fa-list", "All"];
        }
    }

    return (
        <Box sx={{
            position: 'relative'
        }}>
            <HeaderButton id="header-categories" onClick={() => setCategoriesDropdown(prev => !prev)}>
                <Box component='i' className={getIconFromCategory(category)[0]} sx={{
                    fontSize: '30px',
                    color: 'primary.txtColor'
                }} />
                {
                    !isBelowMd &&
                    <Typography variant='span' color="primary.txtColor" fontWeight='550'>
                        {getIconFromCategory(category)[1]}
                    </Typography>
                }
            </HeaderButton>
            {
                categoriesDropdown &&
                <Box id='header-categories-dropdown' sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: theme.palette.primary.txtColor,
                    alignItems: 'center',
                    gap: theme.spacing(1),
                    cursor: 'pointer',
                    minHeight: '50px',
                    background: theme.palette.primary.bgColor,
                    transition: 'height 0.3s ease',
                    height: categoriesDropdown ? 'fit-content' : '0',
                }}>
                    {
                        categories.map((innerCategory) => {
                            return (
                                <>
                                    <HeaderButton component='a'
                                        key={innerCategory}
                                        className={getIconFromCategory(innerCategory)[0]}
                                        onClick={() => {
                                            setCategoriesDropdown(false)
                                        }}
                                        sx={{
                                            fontSize: '30px',
                                            color: 'primary.txtColor',
                                            border: 'none',
                                            width: '100%',
                                            m: 0,
                                            backgroundColor: innerCategory === category &&
                                                `hsl(from ${theme.palette.primary.submain} h s calc(l*0.9))`
                                        }} href={`/HogoHats/products/${innerCategory}`}>
                                        {
                                            !isBelowMd &&
                                            <Typography variant='span' color="primary.txtColor" fontWeight='550' fontSize='1rem'>
                                                {getIconFromCategory(innerCategory)[1]}
                                            </Typography>
                                        }
                                    </HeaderButton>

                                </>
                            )
                        })
                    }
                </Box>
            }
        </Box >
    )
};

export default MapCategories;