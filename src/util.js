export const getProductsUrl = "localhost:8000/api/products/all";
export const getCategoriesUrl = "localhost:8000/api/products/all";
export const getFilteredProductsUrl = "localhost:8000/api/products/getFiltered";
export const searchProductUrl = "localhost:8000/api/products/search/";

export const performRequest = async (url, requestMethod, data = []) => {
  let response;
  if (requestMethod === "GET") {
    response = await fetch(url);
  } else {
    response = await fetch(url, {
      method: requestMethod,
      body: JSON.stringify(data),
    });
  }
  const result = await response.json();
  return result["data"];
};
