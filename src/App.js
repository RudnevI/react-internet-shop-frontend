import { Grid } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <Grid container rowGap={3}>
      <Grid item xs={12}>
        <Navbar></Navbar>
      </Grid>
      <Grid item xs={4}>
        <SideMenu></SideMenu>
      </Grid>
      <Grid item xs={8}>
        <ProductList></ProductList>
      </Grid>
    </Grid>
  );
}

export default App;
