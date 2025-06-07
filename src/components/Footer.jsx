import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        mt: "auto",
        py: 3,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2025 Kanaksan App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
