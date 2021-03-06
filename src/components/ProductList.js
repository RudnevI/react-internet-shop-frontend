import {
  Card,
  Stack,
  CardContent,
  Typography,
  Pagination,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Container, maxWidth } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, set, setPageCount, setCurrentPage } from "../state/productSlice";

export default function ProductList() {
  const productsArray = useSelector((state) => state.products.productsArray);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    performRequest();
  }, [page]);
  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:8000/api/products/all?page=" + page
    );
    const data = await response.json();
    setPageCount(data["last_page"]);
    dispatch(set(data["data"]));
  };

  const search = async () => {
    const result = await getJson(
      "http://localhost:8000/api/products/search/" + searchValue
    );
    dispatch(set(result["data"]));
    setPageCount(result["last_page"]);
  };

  const performRequest = async (url, method, data = []) => {
    let response;
    if (method === "GET") {
      response = await fetch(url);
    } else {
      response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
      });
    }

    const result = await response.json();
    dispatch(set(result["data"]));
  };
  const getJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [filterCriteria, setFilterCriteria] = useState([]);
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Stack rowGap={2}>
      <Container style={{ display: "flex", alignItems: "center" }}>
        <TextField
          value={searchValue}
          onChange={(e) => handleSearchValueChange(e)}
        ></TextField>
        <Button onClick={() => search(searchValue)}>Search</Button>
        <Button onClick={() => getProducts()}>Reset</Button>
      </Container>
      {productsArray.map((product, index) => (
        <Card key={index} sx={{ width: 70 + "%" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {product?.product_name}
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {product?.price}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
      ></Pagination>
    </Stack>
  );
}
