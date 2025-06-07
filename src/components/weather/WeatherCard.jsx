import { Card, CardContent, Box, Typography } from "@mui/material";

function WeatherCard({ icon, title, children, ...props }) {
  return (
    <Card sx={{ height: "100%", ...props.sx }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          {icon}
          <Typography variant="caption" sx={{ ml: 0.5, fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
