import { Box, Card, CardContent, Typography } from "@mui/material";

function ImageDisplay({ selectedDate, imageError, onImageError }) {
  const getImageUrl = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const folderDate = `${month}${year}`;
    const fileName = `ds_${day}${month}${year}.jpg`;
    return `https://ik.imagekit.io/kanaksan/kanaksan/dailysheets/${folderDate}/${fileName}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
        mb: 3,
      }}
    >
      {!imageError ? (
        <Box
          sx={{
            maxWidth: "100%",
            textAlign: "center",
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            },
          }}
        >
          <img
            src={getImageUrl(selectedDate)}
            alt={`Daily Sheet - ${selectedDate.toLocaleDateString()}`}
            onError={onImageError}
            crossOrigin="anonymous"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </Box>
      ) : (
        <Card
          sx={{
            minHeight: 200,
            width: "100%",
            maxWidth: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.100",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No Dailysheet Found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedDate.toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default ImageDisplay;
