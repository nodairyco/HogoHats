import { Box, ImageListItem } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton() {
  return (
    <ImageListItem sx={{
        gap:2
    }}>
      <Box
        sx={{
          width: { xs: 150, sm: 300 },
          height: { xs: 150, sm: 300 },
          borderRadius: 2,
        }}
      >
        <Skeleton height={"100%"} />
      </Box>
      <Box
        sx={{
          width: { xs: 150, sm: 300 },
        }}
      >
        <Skeleton height={24} count={2}></Skeleton>
      </Box>
    </ImageListItem>
  );
}
