import axios from "axios";

export const getWeatherInfo = (city: string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`
  );
} 