import { UV_LEVELS, AQI_LEVELS } from "../constants/weather.js";

export const getUVLevel = (uvIndex) => {
  for (const [key, value] of Object.entries(UV_LEVELS)) {
    if (uvIndex <= value.max) {
      return value;
    }
  }
  return UV_LEVELS.VERY_HIGH;
};

export const getAirQualityLevel = (pm25) => {
  for (const [key, value] of Object.entries(AQI_LEVELS)) {
    if (pm25 <= value.max) {
      return value;
    }
  }
  return AQI_LEVELS.UNHEALTHY;
};

export const getWindDirection = (degrees) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
};

export const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
