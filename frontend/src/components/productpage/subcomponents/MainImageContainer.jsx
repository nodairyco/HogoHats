import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MainImageContainer = ({ currentlyChosenPicture, setHeight }) => {
  const ref = useRef(null);
  const imgRef = useRef(null)
  const [height, _] = useState(imgRef.current?.getBoundingClientRect().height)

  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(2);

  const handleZoom = () => {
    setZoom((prev) => {
      switch (prev) {
        case 2:
          return 3;

        case 3:
          return 4;

        default:
          return 2;
      }
    });
  };

  const handleHover = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * 100) / rect.width;
    const y = ((event.clientY - rect.top) * 100) / rect.height;

    setOffset({ x, y });
  };

  const handleTouchMove = (event) => {
    if (!ref.current || !event.touches[0]) return;
    const rect = ref.current.getBoundingClientRect();
    const touch = event.touches[0];
    const x = ((touch.clientX - rect.left) * 100) / rect.width;
    const y = ((touch.clientY - rect.top) * 100) / rect.height;
    setOffset({ x, y });
  };

  useEffect(() => {
    setHeight(height) 
  }, [height])

  return (
    <Box
      /*className={css.mainImageContainer}*/ ref={ref}
      sx={{
        position: "relative",
        "&::after": {
          position: "absolute",
          content: '""',
          width: imgRef.current?.getBoundingClientRect().width,
          height: imgRef.current?.getBoundingClientRect().height,
          backgroundImage: `url(${currentlyChosenPicture})`,
          top: 0,
          left: 0,
          backgroundSize: `${zoom * 100}%`,
          display: hovered ? "block" : "none",
          backgroundPosition: `${offset.x}% ${offset.y}%`,
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",
          cursor: "zoom-in",
          mx: { xs: 2, md: 0 },
          touchAction: "none",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => handleHover(event)}
      onClick={() => handleZoom()}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {currentlyChosenPicture ? (
        <Box
          component="img"
          alt="currently-chosen-picture"
          src={currentlyChosenPicture}
          sx={{
            borderRadius: "8px",
            maxWidth: { xs: "calc(100% - 32px)", sm: "500px" },
            mx: { xs: 2, md: 0 },
            touchAction: "none",
          }}
          id="main-image"
          ref={imgRef}
        />
      ) : (
        <Box
          sx={{
            height: { xs: "calc(100vw - 32px)", sm: "300px" },
            width: { xs: "cacc(100vw - 32px)", sm: "300px" },
            ml:2,
            mb:2
          }}
        >
          <Skeleton height={"100%"} width={"100%"} />
        </Box>
      )}
    </Box>
  );
};
