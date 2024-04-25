import React from "react";
import "./City.scss";
import { CityDetail } from "../../types/CityDetail";
import { Link } from "react-router-dom";

interface Props {
  city: CityDetail;
  edit: boolean;
  onCityRemove: (city: string) => void
}

export const City: React.FC<Props> = ({ city, edit, onCityRemove }) => {
  const handleDeleteButtonClicked = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    onCityRemove(city.city)
  }

  return (
    <Link to={city.city} className="city" style={{ textDecoration: "none" }}>
      {edit && <i onClick={handleDeleteButtonClicked} className="far fa-trash-alt edit"></i>}
      <span>{city.city}</span>
      <div className="weather">
        <span>{Math.round(city.currentWeather.main.temp)}&deg;</span>
        <img
          src={`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`}
          alt=""
        />
      </div>
      <div className="video">
        <video
          autoPlay
          loop
          muted
          src={`../../public/videos/${city.currentWeather.weather[0].icon}.mp4`}
        ></video>
        <div className="bg-overlay"></div>
      </div>
    </Link>
  );
}
