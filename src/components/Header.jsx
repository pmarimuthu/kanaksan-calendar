import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

function Header({ onMenuClick, onProfileClick }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kanaksan App
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="profile"
          onClick={onProfileClick}
        >
          <AccountCircleIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
