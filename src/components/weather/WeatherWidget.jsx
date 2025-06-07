import { useState, useEffect } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { WEATHER_CONFIG } from "../../constants/weather";
import { WeatherService } from "../../services/weatherService";

import TemperatureCard from "./TemperatureCard";
import HumidityCard from "./HumidityCard";
import WindCard from "./WindCard";
import UVCard from "./UVCard";
import LocationCard from "./LocationCard";
import DayInfoCard from "./DayInfoCard";

function WeatherWidget({ selectedDate }) {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationStatus, setLocationStatus] = useState("requesting");

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
      fetchLocationInfo();
    }
  }, [selectedDate, location]);

  const requestLocation = () => {
    setLocationStatus("requesting");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLocationStatus("granted");
      },
      (error) => {
        setLocationStatus("denied");
        console.warn("Location access denied:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: WEATHER_CONFIG.TIMEOUTS.LOCATION,
        maximumAge: WEATHER_CONFIG.CACHE_DURATION,
      }
    );
  };

  const fetchLocationInfo = async () => {
    try {
      const info = await WeatherService.getLocationInfo(location);
      setLocationInfo(info);
    } catch (err) {
      console.warn("Could not fetch location info:", err);
      setLocationInfo({
        city: "Location",
        country: "Unknown",
        countryCode: "",
        flag: "📍",
        fullAddress: `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`,
        locationContext: [],
        coordinates: `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`,
      });
    }
  };

  const fetchWeatherData = async () => {
    try {
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      if (!isToday) {
        console.log("Weather only available for today");
        return; // Exit early, no API calls
      }

      const isPast = selectedDate < today;

      let data;

      if (isToday) {
        data = await WeatherService.getCurrentWeather(location);
      } else if (isPast) {
        try {
          data = await WeatherService.getHistoricalWeather(
            location,
            selectedDate
          );
        } catch (err) {
          if (err.message === "PLAN_LIMITATION") {
            console.info(
              "Historical weather data requires premium plan - using coordinates for reference"
            );
            return;
          }
          throw err;
        }
      } else {
        console.info("Future weather forecasts require premium plan");
        return;
      }

      setWeatherData(data);
    } catch (err) {
      console.error("Weather API Error:", err);
      setWeatherData(null);
      return;
    }
  };

  if (locationStatus === "denied" || locationStatus === "error") {
    return null;
  }

  if (locationStatus === "requesting") {
    return (
      <Box sx={{ mb: 2, textAlign: "center", p: 1 }}>
        <CircularProgress size={16} />
        <Typography variant="caption" sx={{ ml: 1 }}>
          Getting location...
        </Typography>
      </Box>
    );
  }

  if (!weatherData) {
    return null;
  }

  if (!WEATHER_CONFIG.ENABLED) {
    return null;
  }

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  if (!isToday) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={1} sx={{ maxWidth: "1000px" }}>
          <TemperatureCard weatherData={weatherData} />
          <HumidityCard weatherData={weatherData} />
          <WindCard weatherData={weatherData} />
          <UVCard weatherData={weatherData} />
          <LocationCard locationInfo={locationInfo} />
          <DayInfoCard selectedDate={selectedDate} />
        </Grid>
      </Box>
    </Box>
  );
}

export default WeatherWidget;
