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
        mt: 2,
        mb: 2,
        width: "100%",
      }}
    >
      {!imageError ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            textAlign: "center",
            "& img": {
              width: "100%",
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
          />
        </Box>
      ) : (
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            minHeight: 200,
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
