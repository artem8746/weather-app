import { WeatherData } from "./WeatherData";
import { TDetails } from "./extraTypes";

interface HourlyWeatherResponds {
  cod: string;
  message: number;
  cnt: number;
  list: HourlyWeather[];
}

interface HourlyWeather
  extends Omit<
    WeatherData,
    "coord" | "sys" | "timezone" | "id" | "base" | "name"
  > {
  sys: {
    pod: string;
  };
  rain: {
    "3h": number;
  };
  dt_txt: number;
  details: TDetails;
}

export type { HourlyWeatherResponds, HourlyWeather };
