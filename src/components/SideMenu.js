import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get,
  set,
  setCurrentPage,
  setPageCount,
  setCurrentRequest,
} from "../state/productSlice";
import * as commonFeatures from "../util";

export default function SideMenu() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(100);
  const [criteria, setCriteria] = useState([]);
  const [categories, setCategories] = useState([]);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setCriteria([
      {
        column: "price",
        operation: "<=",
        value: price,
      },
    ]);
  };
  const getFiltered = async () => {
    const response = await fetch("http://localhost:8000/api/products/filter", {
      method: "POST",
      body: JSON.stringify(criteria),
    });
    const data = await response.json();
    dispatch(set(data["data"]));
  };
  const getCategories = async () => {
    const response = await fetch("http://localhost:8000/api/categories/all");
    const data = await response.json();
    setCategories(data["data"]);
  };

  useEffect(() => {
    getCategories();
  }, [categories]);
  return (
    <Stack alignItems="center" mt={3} rowGap={2}>
      <Box width={40 + "%"} textAlign="center">
        <Typography justifySelf="center">Max Price</Typography>
        <Slider
          value={price}
          min={50}
          max={10000}
          step={50}
          onChange={handlePriceChange}
        ></Slider>
        <Typography gutterBottom justifySelf="center">
          {price}
        </Typography>
      </Box>
      <Box width={40 + "%"} display="flex" flexDirection="column">
        <FormControl>
          <FormLabel>Category</FormLabel>
          {categories.map((category, index) => (
            <RadioGroup name="category-radio">
              <FormControlLabel
                control={<Radio />}
                label={category?.category_name}
                value={category?.id}
                selected="false"
              ></FormControlLabel>
            </RadioGroup>
          ))}
        </FormControl>
      </Box>
      <Button color="primary" onClick={() => getFiltered()}>
        Filter
      </Button>
    </Stack>
  );
}
