import { Box, Container, Link, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import GetSelf from "./subcomponents/GetSelf";
import MapCategories from "./subcomponents/MapCategories";
import GetCart from "./subcomponents/GetCart";
import HeaderSearch from "./subcomponents/HeaderSearch";

function Header() {
  const location = useLocation();
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <header
      style={{
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        backgroundColor: "var(--bg-color)",
      }}
    >
      <Container
        id="headerContainer"
        sx={{
          height: 90,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderBottom: "1px solid ",
          borderBottomColor: "primary.bgDarker",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            id="logoContainer"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
            }}
            href="/"
          >
            <Box
              component="img"
              alt="logo"
              src="hogo_logo.jpg"
              sx={{
                height: "80px",
                aspectRatio: "1/1",
              }}
            />
            {!isBelowMd && (
              <Typography
                fontFamily="Zen Antique, serif"
                fontWeight="600"
                variant="h4"
                color="#ffffff"
              >
                H
                <span
                  style={{
                    borderTop: "1px solid #ffffff",
                    marginTop: "20",
                    display: "inline-block",
                  }}
                >
                  O
                </span>
                G
                <span
                  style={{
                    borderTop: "1px solid #ffffff",
                    marginTop: "20",
                    display: "inline-block",
                  }}
                >
                  O
                </span>
              </Typography>
            )}
          </Link>
          <MapCategories isBelowMd={isBelowMd} theme={theme} />
        </Box>
        <HeaderSearch isBelowMd={isBelowMd} />
        <Box
          sx={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          id="cartAndIconContainer"
        >
          <GetCart isBelowMd={isBelowMd} />
          <GetSelf isBelowMd={isBelowMd} />
        </Box>
      </Container>
    </header>
  );
}

export default Header;
