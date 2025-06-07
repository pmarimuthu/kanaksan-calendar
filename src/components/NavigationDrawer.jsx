import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

function NavigationDrawer({ open, onClose }) {
  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "About", icon: <InfoIcon /> },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} onClick={onClose}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default NavigationDrawer;
