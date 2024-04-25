import { Box } from "@mui/material";
import { HourlyWeatherResponds } from "../../types/HourlyWeatherTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toLocalTime from "../../utils/toLocalTime";
import WeatherByTimeBlock from "../WeatherByTimeBlock/WeatherByTimeBlock";

type THourlyForecastProps = {
  lat: number;
  lon: number;
  timezone: number;
};

export default function HourlyForecast({
  lat,
  lon,
  timezone,
}: THourlyForecastProps): JSX.Element {
  const { city } = useParams();

  const [weatherForecast, setWeatherForecast] =
    useState<HourlyWeatherResponds | null>(null);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lat=${lat}&lon=${lon}&cnt=8&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`,
        );
        setWeatherForecast(response.data);
      } catch (error) {
        console.error("Error fetching city details:", error);
        setWeatherForecast(null);
      }
    };

    fetchCityDetails();
  }, [city]);

  console.log(weatherForecast);

  if (!weatherForecast) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      display="flex"
      gap="10px"
      maxWidth="420px"
      minWidth="210px"
      width="100%"
      flexWrap="wrap"
      justifyContent={{ sm: "flex-end", xs: "flex-start" }}
    >
      {weatherForecast.list.map((weather) => (
        <WeatherByTimeBlock
          key={weather.dt}
          time={toLocalTime(weather.dt * 1000, timezone, "h:mm a")}
          icon={weather.weather[0].icon}
          temp={weather.main.temp}
          details={weather.weather[0].main}
        />
      ))}
    </Box>
  );
}
