import { Typography, Chip, Grid } from "@mui/material";
import { WbSunny as UVIcon } from "@mui/icons-material";
import WeatherCard from "./WeatherCard";
import { getUVLevel } from "../../utils/weatherUtils";

function UVCard({ weatherData }) {
  const uvLevel = getUVLevel(weatherData.uvIndex || 0);

  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <WeatherCard
        icon={<UVIcon color="primary" fontSize="small" />}
        title="UV Index"
      >
        <Typography variant="body2">
          {Math.round(weatherData.uvIndex || 0)}
        </Typography>
        <Chip
          label={uvLevel.level}
          color={uvLevel.color}
          size="small"
          sx={{ fontSize: "0.7rem", height: "20px" }}
        />
      </WeatherCard>
    </Grid>
  );
}

export default UVCard;
