import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Switch from "@mui/material/Switch";

interface MenuProps {
  darkMode: boolean;
  onToggle: () => void;
}

 function DenseAppBar({ darkMode, onToggle }: MenuProps) {
  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "center" }}
      >

        <Switch
          checked={darkMode}
          onChange={onToggle}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
}

export default DenseAppBar;