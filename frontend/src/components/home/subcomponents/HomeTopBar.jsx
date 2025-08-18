import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Slider } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ProductContext from "../../../ProductContext.jsx";

function HomeTopBar() {
  const { totalItems, setFilters, filters } = useContext(ProductContext);
  const sortStuff = [
    "Name, A-Z",
    "Name, Z-A",
    "Price, Low to High",
    "Price, High to Low",
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const [priceDropdown, setPriceDropDown] = useState(false);
  const [priceRange, setPriceRange] = useState({
    minPrice: 5,
    maxPrice: 5000,
  });

  // Remove dropdown if clicked anywhere but on the dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setPriceDropDown(false);
      }
    };

    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, []);

  // SortButton function
  const handleSorting = (index) => {
    switch (index) {
      case 0:
        setFilters((prev) => {
          return { ...prev, sortOrder: "asc", sortBy: "name" };
        });
        break;
      case 1:
        setFilters((prev) => {
          return { ...prev, sortOrder: "desc", sortBy: "name" };
        });
        break;
      case 2:
        setFilters((prev) => {
          return { ...prev, sortOrder: "asc", sortBy: "price" };
        });
        break;
      default:
        setFilters((prev) => {
          return { ...prev, sortOrder: "desc", sortBy: "price" };
        });
        break;
    }
  };

  const handlePriceRangeChange = (event, newValue, isMin) => {
    if (isMin) {
      setPriceRange((prevState) => {
        return { ...prevState, minPrice: newValue };
      });
      return;
    }

    setPriceRange((prevState) => {
      return { ...prevState, maxPrice: newValue };
    });
  };

  const handlePriceRangeApplication = () => {
    setFilters((prev) => {
      return {
        ...prev,
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
      };
    });
  };

  return (
    <Container
      sx={{
        mx: "auto",
        display: "flex",
        justifyContent: "space-between",
        color: "primary.txtColor",
      }}
      fullWidth={true}
    >
      <Box id="totalItems">
        <Typography
          variant="span"
          sx={{
            fontWeight: 600,
            fontSize: "24px",
          }}
        >
          Total Items: {totalItems}
        </Typography>
      </Box>
      <Box
        id="sortBy"
        sx={{ position: "relative", display: "flex" }}
        ref={dropDownRef}
      >
        {/*Button to reset sort order*/}
        <Button
          color="white"
          onClick={() => {
            setIsDropdownOpen(false);
            setPriceDropDown(false);
            setPriceRange({});
            setFilters((prev) => {
              return {
                ...prev,
                sortOrder: "",
                sortBy: "",
                minPrice: 0,
                maxPrice: 1000000,
              };
            });
          }}
          disabled={
            !filters.sortOrder &&
            !filters.sortBy &&
            !filters.minPrice &&
            filters.maxPrice !== 10000
          }
        >
          Reset
        </Button>

        <Button
          color="white"
          onClick={() => {
            setIsDropdownOpen(false);
            setPriceDropDown((prevState) => !prevState);
          }}
        >
          Price Range
        </Button>
        {priceDropdown &&
          PriceDropdown(
            priceRange,
            setPriceRange,
            handlePriceRangeChange,
            handlePriceRangeApplication
          )}

        <Button
          variant="text"
          color="white"
          onClick={() => {
            setPriceDropDown(false);
            setIsDropdownOpen((prevState) => !prevState);
          }}
        >
          SORT
        </Button>
        {isDropdownOpen && SortDropdown(sortStuff, handleSorting)}
      </Box>
    </Container>
  );
}

export default HomeTopBar;

function SortDropdown(sortStuff, handleSorting) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "fit-content",
        bottom: 0,
        zIndex: 50,
        backgroundColor: "white",
        borderRadius: 2,
        p: 1,
        transform: "translateY(100%)",
      }}
    >
      {sortStuff.map((item, index) => (
        <Button
          variant="text"
          key={index}
          onClick={() => handleSorting(index)}
          sx={{ width: 200, display: "flex", justifyContent: "flex-end" }}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
}

function PriceDropdown(
  priceRange,
  setPriceRange,
  handlePriceRangeChange,
  handlePriceRangeApplication
) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "fit-content",
        bottom: 0,
        zIndex: 50,
        backgroundColor: "white",
        borderRadius: 2,
        p: 3,
        transform: "translate(-20%, 100%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <TextField
        label="Min Price"
        value={priceRange.minPrice}
        onChange={(e) =>
          setPriceRange((prevState) => {
            let currentInput = Number(e.target.value);
            if (currentInput < 0) {
              currentInput = 0;
            }
            if (currentInput > 5000) {
              currentInput = 5000;
            }
            return { ...prevState, minPrice: currentInput };
          })
        }
      />
      <Slider
        sx={{ width: 200 }}
        value={priceRange.minPrice}
        min={0}
        max={5000}
        onChange={(event, newValue) =>
          handlePriceRangeChange(event, newValue, true)
        }
        marks={[
          {
            value: 5,
            label: "$5",
          },
          {
            value: 5000,
            label: "$5000",
          },
        ]}
      />
      <TextField
        label="Max Price"
        value={priceRange.maxPrice}
        onChange={(e) =>
          setPriceRange((prevState) => {
            let currentInput = Number(e.target.value);
            if (currentInput < 0) {
              currentInput = 0;
            }
            if (currentInput > 5000) {
              currentInput = 5000;
            }
            return { ...prevState, maxPrice: currentInput };
          })
        }
      />
      <Slider
        sx={{ width: 200 }}
        value={priceRange.maxPrice}
        min={0}
        max={5000}
        onChange={(event, newValue) =>
          handlePriceRangeChange(event, newValue, false)
        }
        marks={[
          {
            value: 5,
            label: "$5",
          },
          {
            value: 5000,
            label: "$5000",
          },
        ]}
      />
      {priceRange.maxPrice < priceRange.minPrice && (
        <Typography variant="p" color="error">
          Max Price cannot be less than Min Price
        </Typography>
      )}
      <Button
        fullWidth
        disabled={priceRange.minPrice > priceRange.maxPrice}
        onClick={() => {
          handlePriceRangeApplication();
        }}
      >
        Apply
      </Button>
    </Box>
  );
}
