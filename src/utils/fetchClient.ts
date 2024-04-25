import axios from "axios";

export const getWeatherInfo = (city: string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`,
  );
};

export const getCities = (city: string) => {
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: {
      namePrefix: city,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_CITY_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_CITY_API_HOST,
    },
  };

  return axios.request(options);
};
