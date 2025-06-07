import { Typography, Grid } from "@mui/material";
import { Water as HumidityIcon } from "@mui/icons-material";
import WeatherCard from "./WeatherCard";

function HumidityCard({ weatherData }) {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <WeatherCard
        icon={<HumidityIcon color="primary" fontSize="small" />}
        title="Humidity"
      >
        <Typography variant="body2">
          {Math.round(weatherData.humidity || 0)}%
        </Typography>
        <Typography variant="caption">
          Rain: {Math.round(weatherData.precipitationProbability || 0)}%
        </Typography>
      </WeatherCard>
    </Grid>
  );
}

export default HumidityCard;
