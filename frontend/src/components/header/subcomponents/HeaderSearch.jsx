import React from 'react'
import { HeaderButton, Search } from '../StyledHeaderComponents.jsx'
import { Box } from '@mui/material'

export default function HeaderSearch({ isBelowMd }) {
    const GetSearch = () => {
        if (isBelowMd) {
            return (
                <HeaderButton sx={{ border: 'none' }}>
                    <Box component='i' className='lni lni-search-1' sx={{
                        fontSize: '30px',
                        color: 'primary.txtColor'
                    }} />
                </HeaderButton>
            )
        }

        return (
            <HeaderButton sx={{ border: 'none' }}>
                <Box component='i' className='lni lni-search-1' sx={{
                    fontSize: '30px',
                    color: 'primary.txtColor'
                }} />
            </HeaderButton>
        )
    }

    return (
        <Search id='header-search'>
            <GetSearch />
        </Search>
    )
}
