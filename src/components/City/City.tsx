import React from "react";
import { db } from "../../firebase/firebaseinit";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import "./City.scss";
import { CityDetail } from "../../types/CityDetail";
import { Link } from "react-router-dom";

interface Props {
  city: CityDetail;
  edit: boolean;
}

export const City: React.FC<Props> = ({ city, edit }) => {
  const removeCity = async () => {
    const citiesRef = collection(db, "cities");
    const q = query(citiesRef, where("city", "==", city.city));
    const snapshot = await getDocs(q);

    snapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <Link to={city.city} className="city" style={{ textDecoration: "none" }}>
      {edit && <i onClick={removeCity} className="far fa-trash-alt edit"></i>}
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
};
