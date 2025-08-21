import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Nav({ customList }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const getCurrLocation = () => {
    if (customList) {
      return customList;
    }

    let lst = location.pathname.split("/").map((name) => {
      if (name === "") {
        return "Home";
      }

      return name;
    });

    if (searchParams.get("step")) {
      lst = [...lst, searchParams.get("step")];
    }

    return lst;
  };

  if (location.pathname === "/") {
    return <></>;
  }

  const getLink = (name) => {
    console.log(name);

    if (name.toLowerCase() === "home") {
      return "/";
    }

    if (
      getCurrLocation().find((name) => name === "products") &&
      name.toLowerCase() !== "home"
    ) {
      return `/products/${getCurrLocation()[2]}`;
    }

    if (
      getCurrLocation().find((name) => name === "cart") &&
      name.toLowerCase() !== "home" &&
      name.toLowerCase() !== "cart"
    ) {
      return `/cart?step=${getCurrLocation()[2]}`;
    }

    return name;
  };

  return (
    <Container
      sx={{
        mx: "auto",
        px: "0 !important",
        display: "flex",
        flexDirection: "row",
        gap: 1,
        flexWrap: "wrap",
        mb: 2,
      }}
    >
      {getCurrLocation().map((name, index) => {
        const isLast = index !== getCurrLocation().length - 1;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              textDecoration: "none",
            }}
            href={name && `${getLink(name)}`}
            component={"a"}
          >
            <Typography
              key={name}
              sx={{
                fontSize: 16,
                fontWeight: isLast ? 400 : 600,
                fontFamily: "Raleway, sans-serif",
                color: isLast ? "primary.submain" : "primary.subTxtColor",
                textTransform: "capitalize",
                "&:hover": {
                  borderBottom: "1px solid",
                  borderBottomColor: isLast
                    ? "primary.submain"
                    : "primary.subTxtColor",
                },
              }}
            >
              {name}
            </Typography>
            {isLast && (
              <Box
                component={"i"}
                className="lni lni-chevron-up"
                sx={{
                  color: isLast ? "primary.submain" : "primary.subTxtColor",
                  fontSize: "20px",
                  rotate: "90deg",
                }}
              />
            )}
          </Box>
        );
      })}
    </Container>
  );
}
