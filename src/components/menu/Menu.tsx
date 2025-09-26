import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";
import { ThemeContext } from "../theme/ThemeContext";

export default function DenseAppBar() {
  const { isDark, toggleTheme } = useContext(ThemeContext); 

  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Todo
          </Typography>
        </div>
        <Switch checked={isDark} onChange={toggleTheme} color="default" />
      </Toolbar>
    </AppBar>
  );
}
