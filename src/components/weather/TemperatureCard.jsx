import { Typography, Grid } from "@mui/material";
import { Thermostat as TempIcon } from "@mui/icons-material";
import WeatherCard from "./WeatherCard";

function TemperatureCard({ weatherData }) {
  const hasMinMax =
    weatherData.temperatureMax !== weatherData.temperatureMin &&
    weatherData.temperatureMax &&
    weatherData.temperatureMin;

  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <WeatherCard
        icon={<TempIcon color="primary" fontSize="small" />}
        title="Temperature"
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {Math.round(weatherData.temperature || 0)}°C
        </Typography>
        {hasMinMax && (
          <Typography variant="caption" display="block">
            H: {Math.round(weatherData.temperatureMax)}° L:{" "}
            {Math.round(weatherData.temperatureMin)}°
          </Typography>
        )}
      </WeatherCard>
    </Grid>
  );
}

export default TemperatureCard;
