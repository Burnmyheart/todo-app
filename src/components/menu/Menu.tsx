import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";

interface MenuProps {
  darkMode: boolean;
  onToggle: () => void;
}

export default function DenseAppBar({ darkMode, onToggle }: MenuProps) {
  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Открыть меню"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Todo
          </Typography>
        </div>
        <Switch
          checked={darkMode}
          onChange={onToggle}
          color="default"
          inputProps={{ "aria-label": "Переключить тему" }}
        />
      </Toolbar>
    </AppBar>
  );
}
