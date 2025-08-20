import { Box } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RenderProductImages({
  currentProduct,
  currentlyChosenPicture,
  setCurrentlyChosenPicture,
  height,
}) {
  return (
    <Box id="sub-image-container-list">
      <Box
        component="ul"
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          listStyleType: "none",
          gap: "8px",
          padding: 0,
          my: 0,
          mx: { xs: 2, md: 0 },
          maxHeight: {
            xs: "auto",
            md: height,
          },
          overflow: "scroll",
        }}
      >
        {currentProduct.images?.map((image, index) => {
          const bgLightValue = currentlyChosenPicture === image.url ? 3 : 1;
          return (
            <Box
              id="sub-image-li"
              sx={{ position: "relative", height: "fit-content" }}
              key={index}
            >
              <Box
                component="img"
                src={image.url}
                alt={`sub-image-${index}`}
                sx={{
                  width: { xs: "auto", md: "160px" },
                  height: { xs: "100px", md: "auto" },
                  borderRadius: "8px",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: `hsl(from var(--bg-color) h s calc(l * ${bgLightValue}) / 0.5)`,
                  height: "calc(100% - 6.5px)",
                  zIndex: 2,
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: currentlyChosenPicture === image.url ? "" : "pointer",
                  "&:hover": {
                    backgroundColor: `hsl(from var(--bg-color) h s calc(l * 3) / 0.5)`,
                  },
                  borderRadius: "8px",
                }}
                onClick={() => {
                  if (currentlyChosenPicture === image.url) return;
                  setCurrentlyChosenPicture(image.url);
                }}
                id="image-overlay"
              />
            </Box>
          );
        }) || (
          <>
            <Skeleton height={100} width={100} />
            <Skeleton height={100} width={100} />
          </>
        )}
      </Box>
    </Box>
  );
}
