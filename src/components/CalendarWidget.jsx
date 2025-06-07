import { Box, TextField, Button, IconButton } from "@mui/material";
import { Today as TodayIcon } from "@mui/icons-material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function CalendarWidget({ selectedDate, onDateChange, onTodayClick, isToday }) {
  const handlePrevDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const dateString =
      prevDate.getFullYear() +
      "-" +
      String(prevDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(prevDate.getDate()).padStart(2, "0");
    onDateChange({ target: { value: dateString } });
  };

  const handleNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const dateString =
      nextDate.getFullYear() +
      "-" +
      String(nextDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(nextDate.getDate()).padStart(2, "0");
    onDateChange({ target: { value: dateString } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={handlePrevDay} size="small" color="primary">
          <ArrowBack />
        </IconButton>

        <TextField
          type="date"
          value={
            selectedDate.getFullYear() +
            "-" +
            String(selectedDate.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(selectedDate.getDate()).padStart(2, "0")
          }
          onChange={onDateChange}
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          size="small"
          inputProps={{
            "data-date-format": "dd/mm/yyyy",
            lang: "en-IN",
          }}
        />

        <IconButton onClick={handleNextDay} size="small" color="primary">
          <ArrowForward />
        </IconButton>
      </Box>

      {!isToday && (
        <Button
          variant="contained"
          size="small"
          onClick={onTodayClick}
          startIcon={<TodayIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Back to Today
        </Button>
      )}
    </Box>
  );
}

export default CalendarWidget;
