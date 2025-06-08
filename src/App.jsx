import { useEffect, useState } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";

import Header from "./components/Header";
import NavigationDrawer from "./components/NavigationDrawer";
import ProfileMenu from "./components/ProfileMenu";
import ImageDisplay from "./components/ImageDisplay";
import Footer from "./components/Footer";
import WeatherWidget from "./components/weather/WeatherWidget";
import ThemeToggle from "./components/ThemeToggle";
import { UI_CONFIG } from "./constants/uiconfig";
import CustomCalendarWidget from "./components/CustomCalendarWidget";
import GoToTodayButton from "./components/GoToTodayButton";

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

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleProfileMenuOpen = (event) =>
    setProfileMenuAnchor(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchor(null);

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
    selectedDate.toDateString() === new Date().toDateString();
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

      <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1, // ⬅️ Reduced gap between all rows
            width: "100%",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          {/* Row 1: Theme Toggle */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ThemeToggle />
          </Box>

          {/* Row 2: Calendar + Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1.5,
              width: "100%",
            }}
          >
            <CustomCalendarWidget
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              onTodayClick={goToToday}
              isToday={isToday()}
            />
            <Box sx={{ minWidth: { xs: "100%", sm: 150 } }}>
              <GoToTodayButton
                selectedDate={selectedDate}
                onTodayClick={goToToday}
              />
            </Box>
          </Box>

          {/* Row 3: Image */}
          <Box sx={{ width: "100%" }}>
            <ImageDisplay
              selectedDate={selectedDate}
              imageError={imageError}
              onImageError={handleImageError}
            />
          </Box>

          {/* Row 4: Weather */}
          <Box sx={{ width: "100%" }}>
            <WeatherWidget selectedDate={selectedDate} />
          </Box>
        </Box>
      </Container>

      {UI_CONFIG.FOOTER.ENABLED && <Footer />}
    </Box>
  );
}

export default App;
