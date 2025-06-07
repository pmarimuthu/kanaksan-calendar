import { Box, Container, Typography } from "@mui/material";
import PrivacyNotice from './PrivacyNotice';

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
        <PrivacyNotice />
      </Container>
    </Box>
  );
}

export default Footer;
