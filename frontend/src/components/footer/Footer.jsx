import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <footer
      style={{
        position: "sticky",
        bottom: 0,
        left: 0,
        width: "100vw",
        background: "hsl(from var(--bg-color) h s calc(l * 0.9))",
        color: "primary.subTxtColor",
      }}
    >
      <Container
        sx={{
          display: "flex",
          width: "100%",
          py: 4,
          color: "primary.subTxtColor",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box id="footer-social-media-links">
          <Typography fontSize={{ xs: 24, md: 32 }} fontWeight={700}>
            HŌGŌ Hats
          </Typography>
          <Typography fontSize={16}>Handcrafted Hats From 🇬🇪</Typography>
          <Box
            id="footer-links"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              pt: { xs: 1, sm: 4 },
              fontSize: { xs: 24, md: 32 },
            }}
          >
            <Box
              component="a"
              className="lni lni-facebook"
              sx={{
                textDecoration: "none",
              }}
              href="https://www.facebook.com/profile.php?id=100088201576457"
              target="_blank"
              rel="noopener noreferrer nofollow"
            />
            <Box
              component="a"
              className="lni lni-instagram"
              sx={{
                textDecoration: "none",
              }}
              href="https://www.instagram.com/hogo.hats.shop"
              target="_blank"
              rel="noopener noreferrer nofollow"
            />
            <Box
              component="a"
              className="lni lni-github"
              sx={{
                textDecoration: "none",
              }}
              href="https://github.com/nodairyco/HogoHats"
              target="_blank"
              rel="noopener noreferrer nofollow"
            />
          </Box>
        </Box>
        <Box id="footer-contact-info">
          <Typography fontSize={20} fontWeight={500}>
            Our contact information:
          </Typography>
          <Box
            id="contact-info"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              fontSize: { xs: 20, md: 28 },
              pt: 1,
            }}
            component="address"
          >
            <Box
              component="a"
              sx={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: "inherit",
                color: "inherit",
              }}
              href="mailto:hogohats@gmail.com"
            >
              <Box component={"i"} className="lni lni-message-2" />
              <Typography>hogohats@gmail.com</Typography>
            </Box>
            <Box
              component="a"
              sx={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: "inherit",
                color: "inherit",
              }}
              href="tel:+995598717222"
            >
              <Box component={"i"} className="lni lni-telephone-1" />
              <Typography>+995 598 71 72 22</Typography>
            </Box>
            <Box
              component="a"
              sx={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: "inherit",
                color: "inherit",
              }}
            >
              <Box component="i" className="lni lni-map-marker-5" />
              <Typography>
                Iliko Sukhishvilis 31, Gori, Georgia, 1400
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
