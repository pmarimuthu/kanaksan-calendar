import { Typography, Grid } from "@mui/material";
import { Air as WindIcon } from "@mui/icons-material";
import WeatherCard from "./WeatherCard";
import { getWindDirection } from "../../utils/weatherUtils";

function WindCard({ weatherData }) {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <WeatherCard
        icon={<WindIcon color="primary" fontSize="small" />}
        title="Wind"
      >
        <Typography variant="body2">
          {Math.round(weatherData.windSpeed || 0)} km/h
        </Typography>
        <Typography variant="caption">
          {getWindDirection(weatherData.windDirection || 0)}
        </Typography>
      </WeatherCard>
    </Grid>
  );
}

export default WindCard;
