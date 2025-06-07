import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  Thermostat as TempIcon,
  Water as HumidityIcon,
  Air as WindIcon,
  WbSunny as UVIcon,
  Visibility as AirQualityIcon,
  LocalFlorist as PollenIcon,
  WbTwilight as SunIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

const API_KEY = 'yoHPZPX2dTzu50CWkJ0QxA2ChiN4m2az';
const REALTIME_API_URL = 'https://api.tomorrow.io/v4/weather/realtime';
const FORECAST_API_URL = 'https://api.tomorrow.io/v4/weather/forecast';

function MetadataDisplay({ selectedDate }) {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState('requesting'); // 'requesting', 'granted', 'denied', 'error'

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [selectedDate, location]);

  const requestLocation = () => {
    setLocationStatus('requesting');
    
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLocationStatus('granted');
        setError(null);
      },
      (error) => {
        setLocationStatus('denied');
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied by user');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable');
            break;
          case error.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('An unknown error occurred');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // Cache for 10 minutes
      }
    );
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      const isFuture = selectedDate > today;
      
      let url, response, data;
      
      if (isToday) {
        // Use realtime API for current weather
        url = `${REALTIME_API_URL}?location=${location.lat},${location.lng}&apikey=${API_KEY}`;
        
        const options = {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'accept-encoding': 'deflate, gzip, br'
          }
        };
        
        response = await fetch(url, options);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }
        
        data = await response.json();
        
        if (data.data && data.data.values) {
          // Map realtime API response to our expected format
          const values = data.data.values;
          setWeatherData({
            temperature: values.temperature,
            temperatureMax: values.temperature, // Current temp as max for today
            temperatureMin: values.temperature, // Current temp as min for today
            humidity: values.humidity,
            windSpeed: values.windSpeed,
            windDirection: values.windDirection,
            precipitationProbability: values.precipitationProbability,
            uvIndex: values.uvIndex,
            particulateMatter25: null, // Not available in realtime API
            sunriseTime: null, // Not available in realtime API
            sunsetTime: null, // Not available in realtime API
            locationName: data.location?.name || 'Your Location'
          });
        } else {
          throw new Error('No weather data found');
        }
      } else if (isFuture) {
        // For future dates, show message about forecast limitation
        setError('Future weather forecasts require premium plan');
      } else {
        // For past dates, show message about historical data
        setError('Historical weather data requires premium plan');
      }
    } catch (err) {
      setError(err.message);
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAirQualityLevel = (pm25) => {
    if (pm25 <= 12) return { level: 'Good', color: 'success' };
    if (pm25 <= 35) return { level: 'Moderate', color: 'warning' };
    if (pm25 <= 55) return { level: 'Unhealthy for Sensitive', color: 'error' };
    return { level: 'Unhealthy', color: 'error' };
  };

  const getUVLevel = (uvIndex) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'success' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'warning' };
    if (uvIndex <= 7) return { level: 'High', color: 'error' };
    return { level: 'Very High', color: 'error' };
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getDayOfYear = () => {
    const start = new Date(selectedDate.getFullYear(), 0, 0);
    const diff = selectedDate - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  // Location permission states
  if (locationStatus === 'requesting') {
    return (
      <Box sx={{ mb: 2, textAlign: 'center', p: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          📍 Requesting location access...
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Allow location access to see weather insights
        </Typography>
      </Box>
    );
  }

  if (locationStatus === 'denied' || locationStatus === 'error') {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert 
          severity="info" 
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={requestLocation}
              sx={{ textTransform: 'none' }}
            >
              Retry
            </Button>
          }
        >
          <Typography variant="body2">
            📍 Location needed for weather insights
          </Typography>
          <Typography variant="caption" display="block">
            {error || 'Enable location access to see local weather data'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2" sx={{ ml: 1 }}>Loading weather data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        Weather data unavailable: {error}
      </Alert>
    );
  }

  if (!weatherData) return null;

  const airQuality = weatherData.particulateMatter25 !== null ? 
    getAirQualityLevel(weatherData.particulateMatter25) : 
    { level: 'Unknown', color: 'default' };
  const uvLevel = getUVLevel(weatherData.uvIndex || 0);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        📊 {selectedDate.toDateString() === new Date().toDateString() ? 'Current Weather' : 'Weather Insights'}
      </Typography>
      
      <Grid container spacing={1}>
        {/* Temperature */}
        <Grid xs={6} sm={4} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <TempIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                  Temperature
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {Math.round(weatherData.temperature)}°C
              </Typography>
              {weatherData.temperatureMax !== weatherData.temperatureMin && (
                <Typography variant="caption" display="block">
                  H: {Math.round(weatherData.temperatureMax)}° L: {Math.round(weatherData.temperatureMin)}°
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Air Quality - Only show if data available */}
        {weatherData.particulateMatter25 !== null && (
          <Grid xs={6} sm={4} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <AirQualityIcon color="primary" fontSize="small" />
                  <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                    Air Quality
                  </Typography>
                </Box>
                <Chip 
                  label={airQuality.level} 
                  color={airQuality.color} 
                  size="small"
                  sx={{ fontSize: '0.7rem', height: '20px' }}
                />
                <Typography variant="caption" display="block">
                  PM2.5: {Math.round(weatherData.particulateMatter25 || 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* UV Index */}
        <Grid xs={6} sm={4} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <UVIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                  UV Index
                </Typography>
              </Box>
              <Typography variant="body2">
                {Math.round(weatherData.uvIndex || 0)}
              </Typography>
              <Chip 
                label={uvLevel.level} 
                color={uvLevel.color} 
                size="small"
                sx={{ fontSize: '0.7rem', height: '20px' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Humidity & Rain */}
        <Grid xs={6} sm={4} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <HumidityIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                  Humidity
                </Typography>
              </Box>
              <Typography variant="body2">
                {Math.round(weatherData.humidity || 0)}%
              </Typography>
              <Typography variant="caption">
                Rain: {Math.round(weatherData.precipitationProbability || 0)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Wind */}
        <Grid xs={6} sm={4} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <WindIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                  Wind
                </Typography>
              </Box>
              <Typography variant="body2">
                {Math.round(weatherData.windSpeed || 0)} km/h
              </Typography>
              <Typography variant="caption">
                {getWindDirection(weatherData.windDirection || 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sunrise/Sunset - Only show if data available */}
        {(weatherData.sunriseTime || weatherData.sunsetTime) && (
          <Grid xs={6} sm={4} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <SunIcon color="primary" fontSize="small" />
                  <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                    Sun Times
                  </Typography>
                </Box>
                <Typography variant="caption" display="block">
                  ↑ {weatherData.sunriseTime ? formatTime(weatherData.sunriseTime) : '--'}
                </Typography>
                <Typography variant="caption" display="block">
                  ↓ {weatherData.sunsetTime ? formatTime(weatherData.sunsetTime) : '--'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Day Info */}
        <Grid xs={6} sm={4} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                  Day Info
                </Typography>
              </Box>
              <Typography variant="caption" display="block">
                Day {getDayOfYear()} of {new Date(selectedDate.getFullYear(), 11, 31).getDate() === 31 ? '365' : '366'}
              </Typography>
              <Typography variant="caption" display="block">
                Week {Math.ceil(getDayOfYear() / 7)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Location Info */}
        <Grid xs={6} sm={4} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  📍 Location
                </Typography>
              </Box>
              <Typography variant="caption" display="block">
                {weatherData.locationName || 'Your Location'}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MetadataDisplay;