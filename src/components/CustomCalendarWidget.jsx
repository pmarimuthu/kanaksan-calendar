import React from "react";
import { Box, TextField } from "@mui/material";

function CustomCalendarWidget({ selectedDate, onDateChange }) {
  const formatDateForInput = (date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  const formatLabel = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g. Jun
    const year = date.getFullYear();
    const dayName = date.toLocaleString("en-US", { weekday: "short" }); // e.g. Sun
    return ` ${day} ${month} ${year}, ${dayName}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
        mb: 3,
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        label={formatLabel(selectedDate)}
        type="date"
        value={formatDateForInput(selectedDate)}
        onChange={onDateChange}
        slotProps={{
          inputLabel: {
            shrink: true,
            sx: {
              fontWeight: "bold",
              fontSize: "110%",
              color: "#4A148C",
              letterSpacing: "1px",
            },
          },
        }}
        sx={{
          maxWidth: 320,
          "& fieldset": {
            padding: "0 12px",
          },
          "& legend": {
            width: "auto",
            padding: "0 5px",
            letterSpacing: "1px",
          },
        }}
      />
    </Box>
  );
}

export default CustomCalendarWidget;
