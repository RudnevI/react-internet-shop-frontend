import { AppBar } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { Route } from "react-router";
import { Routes } from "react-router";
import { Router } from "react-router";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <MenuIcon />
      </AppBar>
    </Box>
  );
}
