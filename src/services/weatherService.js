import { WEATHER_CONFIG } from "../constants/weather.js";

export class WeatherService {
  static async getCurrentWeather(location) {
    const url = `${WEATHER_CONFIG.APIS.REALTIME}?location=${location.lat},${location.lng}&apikey=${WEATHER_CONFIG.API_KEY}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "accept-encoding": "deflate, gzip, br",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Realtime API Error: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();

    if (data.data && data.data.values) {
      return {
        ...data.data.values,
        locationName: data.location?.name || "Your Location",
        isRealtime: true,
      };
    }

    throw new Error("No current weather data found");
  }

  static async getHistoricalWeather(location, date) {
    const targetDate = date.toISOString().split("T")[0];
    const startTime = `${targetDate}T00:00:00Z`;
    const endTime = `${targetDate}T23:59:59Z`;

    const payload = {
      location: `${location.lat}, ${location.lng}`,
      fields: WEATHER_CONFIG.FIELDS.HISTORICAL,
      timesteps: ["1d"],
      startTime,
      endTime,
      units: 'metric'
    };

    const url = `${WEATHER_CONFIG.APIS.HISTORICAL}?apikey=${WEATHER_CONFIG.API_KEY}`;

    const response = await fetch(WEATHER_CONFIG.APIS.HISTORICAL, {
      method: "POST",
      headers: {
        'accept': 'application/json', 
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401 || errorData.code === 401001) {
        throw new Error("PLAN_LIMITATION");
      }

      throw new Error(
        `Historical API Error: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();

    if (data.data && data.data.timelines && data.data.timelines.length > 0) {
      const dayData = data.data.timelines[0].intervals[0].values;
      return {
        ...dayData,
        isRealtime: false,
      };
    }

    throw new Error("No historical weather data found");
  }

  static async getLocationInfo(location) {
    const response = await fetch(
      `${WEATHER_CONFIG.APIS.REVERSE_GEOCODE}?format=json&lat=${location.lat}&lon=${location.lng}&accept-language=en`
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();
    const address = data.address || {};

    // Try multiple fallbacks for city/location name
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.suburb ||
      address.neighbourhood ||
      address.county ||
      address.state_district ||
      address.state ||
      address.region ||
      address.postcode ||
      "Location";

    // Try multiple fallbacks for country
    const country = address.country || "Unknown";
    const countryCode = address.country_code?.toUpperCase() || "";

    // Additional location context
    const locationContext = [];
    if (address.state && address.state !== city)
      locationContext.push(address.state);
    if (address.county && address.county !== city)
      locationContext.push(address.county);
    if (
      address.region &&
      address.region !== city &&
      address.region !== address.state
    )
      locationContext.push(address.region);

    return {
      city,
      country,
      countryCode,
      flag: this.getCountryFlag(countryCode),
      fullAddress: data.display_name,
      locationContext: locationContext.slice(0, 2), // Take max 2 additional context items
      coordinates: `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`,
    };
  }

  static getCountryFlag(countryCode) {
    if (!countryCode) return "🌍";

    const flagOffset = 0x1f1e6;
    const asciiOffset = 0x41;
    const firstChar = countryCode.charCodeAt(0) - asciiOffset + flagOffset;
    const secondChar = countryCode.charCodeAt(1) - asciiOffset + flagOffset;

    return String.fromCodePoint(firstChar, secondChar);
  }
}
