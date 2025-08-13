import { Box, styled } from '@mui/material';

export const HeaderButton = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: theme.palette.primary.txtColor,
    padding: theme.spacing(0.5, 1),
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    minHeight: '50px',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: `hsl(from ${theme.palette.primary.submain} h s calc(l*0.9))`,
        transition: 'background-color ease 0.2s'
    },
    '& #header-btn-i': {
        fontWeight: '400'
    }
}));

export const Search = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: theme.palette.primary.txtColor,
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    minHeight: '50px',
    textDecoration: 'none',
}))

