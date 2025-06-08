import React from "react";
import { Chip } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";

function GoToTodayButton({ selectedDate, onTodayClick }) {
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  if (isToday) return null;

  return (
    <Chip
      icon={<TodayIcon />}
      label="Go to Today"
      onClick={onTodayClick}
      color="primary"
      variant="outlined"
      clickable
      sx={{
        mt: { xs: 1.5, sm: 2 },
        fontWeight: "bold",
        borderRadius: 0,
        width: "100%",
        maxWidth: 320,
        justifyContent: "flex-start",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    />
  );
}

export default GoToTodayButton;
