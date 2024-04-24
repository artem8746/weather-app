import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HourlyForecast from "../../components/HourlyForecast/HourlyForecast";
import iconUrlFromCode from "../../utils/iconUrlFromCode";
import WeatherInfoBlock from "../../components/WeatherInfoBlock/WeatherInfoBlock";
import toLocalTime from "../../utils/toLocalTime";
import { WeatherData } from "../../types/WeatherData";

export const CityDetails: React.FC = () => {
  const { city } = useParams();

  const [cityDetails, setCityDetails] = useState<WeatherData | null>(null);


  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`
        );
        setCityDetails(response.data);
      } catch (error) {
        console.error("Error fetching city details:", error);
        setCityDetails(null);
      }
    };

    fetchCityDetails();
  }, [city]);

  if (!cityDetails) {
    return <div>Loading...</div>; // Або інша обробка загрузки
  }

  console.log(cityDetails);


  return (
    <div style={{ marginTop: "100px" }}>
      <Paper
        sx={{
          marginTop: "24px",
          p: "20px",
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "25px",
          minHeight: "375px",
        }}
        elevation={2}
      >
        <Box>
          <Box display="flex" alignItems="start">
            <Box>
              <img
                src={iconUrlFromCode(cityDetails.weather[0].icon)}
                alt="weather icon"
                width="115"
                height="115"
              />

              <Box display="flex" borderBottom="1px solid #D3D3D3">
                <Typography
                  fontSize="24px"
                  maxWidth="140px"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textTransform="capitalize"
                  marginRight={1}
                >
                  {cityDetails.name},
                </Typography>
                <Typography fontSize="24px">{cityDetails.sys.country}</Typography>
              </Box>

              <Typography fontSize="48px">{`${cityDetails.main.temp.toFixed()}°C`}</Typography>

              <Box display="flex" columnGap="5px" color="black">
                <Typography>{`High: ${cityDetails.main.temp_max.toFixed()}°C`}</Typography>|
                <Typography>{`Low: ${cityDetails.main.temp_min.toFixed()}°C`}</Typography>
              </Box>
            </Box>
          </Box>

          <WeatherInfoBlock
            mt={2}
            humidity={cityDetails.main.humidity}
            speed={cityDetails.wind.speed}
            feels_like={cityDetails.main.feels_like}
          />
        </Box>

        <Box order={{ md: 0, xs: 3 }}>
          <Typography fontSize={18}>
            Local time: {`${toLocalTime(cityDetails.dt * 1000, cityDetails.timezone, 'dddd, h:mm a')}`}
          </Typography>
        </Box>

        <Box textAlign={{ sm: 'end', xs: 'start' }} order={{ md: 0, xs: 2 }}>
          <Typography fontSize={18}>Hourly Forecast</Typography>
          <HourlyForecast
            lat={cityDetails.coord.lat}
            lon={cityDetails.coord.lon}
            timezone={cityDetails.timezone}
          />
        </Box>

      </Paper>
    </div>
  );
};
