import { useEffect } from "react";
import { inject } from "@vercel/analytics";
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
import { UI_CONFIG } from "./constants/uiconfig";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("kanaksan.com")
    ) {
      import("@vercel/analytics").then(({ inject }) => {
        inject();
      });
    }
  }, []);

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
      {UI_CONFIG.HEADER.ENABLED && (
        <Header
          onMenuClick={UI_CONFIG.HEADER.SHOW_MENU ? toggleDrawer : undefined}
          onProfileClick={
            UI_CONFIG.HEADER.SHOW_PROFILE ? handleProfileMenuOpen : undefined
          }
          showMenu={UI_CONFIG.HEADER.SHOW_MENU}
          showProfile={UI_CONFIG.HEADER.SHOW_PROFILE}
        />
      )}

      {UI_CONFIG.NAVIGATION.ENABLED && UI_CONFIG.NAVIGATION.DRAWER_ENABLED && (
        <NavigationDrawer open={drawerOpen} onClose={toggleDrawer} />
      )}

      {UI_CONFIG.HEADER.ENABLED && UI_CONFIG.HEADER.SHOW_PROFILE && (
        <ProfileMenu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
        />
      )}

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

      {UI_CONFIG.FOOTER.ENABLED && <Footer />}
    </Box>
  );
}

export default App;
