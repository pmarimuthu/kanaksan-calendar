import { Typography, Grid } from "@mui/material";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import WeatherCard from "./WeatherCard";
import { getDayOfYear } from "../../utils/weatherUtils";

function DayInfoCard({ selectedDate }) {
  const dayOfYear = getDayOfYear(selectedDate);
  const isLeapYear = selectedDate.getFullYear() % 4 === 0;
  const totalDays = isLeapYear ? 366 : 365;

  return (
    <Grid size={{ xs: 6, sm: 4, md: 2 }}>
      <WeatherCard
        icon={<CalendarIcon color="primary" fontSize="small" />}
        title="Day Info"
      >
        <Typography variant="caption" display="block">
          Day: {dayOfYear}/{totalDays}
        </Typography>
        <Typography variant="caption" display="block">
          Week: {Math.ceil(dayOfYear / 7)}
        </Typography>
      </WeatherCard>
    </Grid>
  );
}

export default DayInfoCard;
