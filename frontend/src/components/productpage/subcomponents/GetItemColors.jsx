import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function GetItemColors({ currentProduct }) {
  const [currentColor, setCurrentColor] = useState("");
  const colorLst = ["primary.main", "primary.subTxtColor", "primary.submain"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
      id="color-list-container"
    >
      {currentProduct?.name ? (
        <>
          {" "}
          <Typography fontWeight={400} fontSize={16}>
            Select Color
          </Typography>
          <Box
            component={"ul"}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              flexWrap: "wrap",
              p: 0,
            }}
          >
            {colorLst.map((color) => (
              <Box
                key={color}
                component={"li"}
                sx={{
                  width: "37px",
                  height: "37px",
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: "primary.bgDarker",
                  backgroundColor: color,
                  cursor: "pointer",
                  listStyle: "none",
                }}
                onClick={() => setCurrentColor(color)}
              >
                {currentColor == color && (
                  <Box
                    component="i"
                    className="lni lni-check"
                    fontSize={36}
                    color={"white"}
                  />
                )}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Skeleton height={60} />
      )}
    </Box>
  );
}
