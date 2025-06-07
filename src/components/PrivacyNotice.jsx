import { Typography, Link, Box } from '@mui/material';

function PrivacyNotice() {
  return (
    <Box sx={{ textAlign: 'center', py: 1 }}>
      <Typography variant="caption" color="text.secondary">
        This app uses location for weather data and anonymous analytics to improve user experience. 
        <Link 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            alert('Privacy Policy: We collect minimal data (location for weather, anonymous usage analytics). No personal data is stored or shared.');
          }}
          sx={{ ml: 0.5 }}
        >
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
}

export default PrivacyNotice;