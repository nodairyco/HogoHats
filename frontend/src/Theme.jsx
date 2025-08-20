import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#5c342c",
      contrastText: "#ffffff",
      submain: "#544f4f",
      txtColor: /*"hsl(from #544f4f h s calc(l*1.3))"*/ "#ffffff",
      componentBgColor: "hsl(from #28292d h s calc(l*1.5))",
      bgColor: "#28292d",
      bgDarker: "hsl(from var(--bg-color) h s calc(l/1.25))",
      subTxtColor: "#c1ababff"
    },
    error: {
      main: "#e32507",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Raleway", sans-serif',
        },
      },
    },
  },
});

export default Theme;
