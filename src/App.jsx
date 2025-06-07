import { useState } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";

import Header from "./components/Header";
import NavigationDrawer from "./components/NavigationDrawer";
import ProfileMenu from "./components/ProfileMenu";
import DateDisplay from "./components/DateDisplay";
import CalendarWidget from "./components/CalendarWidget";
import ImageDisplay from "./components/ImageDisplay";
import Footer from "./components/Footer";
import WeatherWidget from "./components/weather/WeatherWidget";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
    setImageError(false);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const isToday = () => {
    return selectedDate.toDateString() === new Date().toDateString();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        onMenuClick={toggleDrawer}
        onProfileClick={handleProfileMenuOpen}
      />

      <NavigationDrawer open={drawerOpen} onClose={toggleDrawer} />

      <ProfileMenu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
      />

      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ mt: 4 }}>
          <DateDisplay selectedDate={selectedDate} isToday={isToday()} />

          <CalendarWidget
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onTodayClick={goToToday}
            isToday={isToday()}
          />

          <ImageDisplay
            selectedDate={selectedDate}
            imageError={imageError}
            onImageError={handleImageError}
          />

          <WeatherWidget selectedDate={selectedDate} />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
