export const WEATHER_CONFIG = {
  ENABLED: true,
  API_KEY: import.meta.env.VITE_TOMORROW_WEATHER_API_KEY,
  
  APIS: {
    REALTIME: "https://api.tomorrow.io/v4/weather/realtime",
    HISTORICAL: "https://api.tomorrow.io/v4/historical",
    FORECAST: "https://api.tomorrow.io/v4/weather/forecast",
    REVERSE_GEOCODE: "https://nominatim.openstreetmap.org/reverse",
  },
  FIELDS: {
    REALTIME: [
      "temperature",
      "humidity",
      "windSpeed",
      "windDirection",
      "precipitationProbability",
      "uvIndex",
    ],
    HISTORICAL: [
      "temperature",
      "temperatureMax",
      "temperatureMin",
      "humidity",
      "windSpeed",
      "windDirection",
      "precipitationProbability",
      "uvIndex",
    ],
  },
  TIMEOUTS: {
    LOCATION: 5000,
    API: 8000,
  },
  CACHE_DURATION: 600000,
};

export const WEATHER_LABELS = {
  temperature: "Temperature",
  humidity: "Humidity",
  windSpeed: "Wind",
  uvIndex: "UV Index",
  precipitationProbability: "Rain Chance",
  airQuality: "Air Quality",
};

export const UV_LEVELS = {
  LOW: { max: 2, level: "Low", color: "success" },
  MODERATE: { max: 5, level: "Moderate", color: "warning" },
  HIGH: { max: 7, level: "High", color: "error" },
  VERY_HIGH: { max: 10, level: "Very High", color: "error" },
};

export const AQI_LEVELS = {
  GOOD: { max: 12, level: "Good", color: "success" },
  MODERATE: { max: 35, level: "Moderate", color: "warning" },
  UNHEALTHY_SENSITIVE: {
    max: 55,
    level: "Unhealthy for Sensitive",
    color: "error",
  },
  UNHEALTHY: { max: 999, level: "Unhealthy", color: "error" },
};
