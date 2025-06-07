import { Typography, Chip } from "@mui/material";

function DateDisplay({ selectedDate, isToday }) {
  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const dayName = date.toLocaleString("default", { weekday: "long" });
    return `${day} ${month} ${year}, ${dayName}`;
  };

  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      align="center"
      sx={{
        color: isToday ? "primary.main" : "warning.main",
      }}
    >
      {getFormattedDate(selectedDate)}
      {!isToday && (
        <Chip
          label="Selected Date"
          size="small"
          color="warning"
          sx={{ ml: 1, mt: 1 }}
        />
      )}
    </Typography>
  );
}

export default DateDisplay;
