import { Typography, Box, Grid } from "@mui/material";
import WeatherCard from "./WeatherCard";

function LocationCard({ locationInfo }) {
  if (!locationInfo) return null;

  const hasLocationContext =
    locationInfo.locationContext && locationInfo.locationContext.length > 0;

  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <WeatherCard title="📍 Location">
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <Typography
            variant="caption"
            display="block"
            sx={{ fontWeight: "bold" }}
          >
            {locationInfo.city}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: "1rem" }}>
            {locationInfo.flag}
          </Typography>
        </Box>

        {hasLocationContext && (
          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            sx={{ fontSize: "0.65rem" }}
          >
            {locationInfo.locationContext.join(", ")}
          </Typography>
        )}

        <Typography variant="caption" display="block" color="text.secondary">
          {locationInfo.country}
        </Typography>

        {locationInfo.city === "Location" && (
          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            sx={{ fontSize: "0.65rem" }}
          >
            {locationInfo.coordinates}
          </Typography>
        )}
      </WeatherCard>
    </Grid>
  );
}

export default LocationCard;
