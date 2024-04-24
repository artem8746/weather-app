import React from "react";
import "./AppCity.scss";
import { City } from "../City/City";
import { useAppSelector } from "../../app/hooks";


export const AddCity: React.FC = () => {
  const cities = useAppSelector((state) => state.weather.cityDetails);

  const onAddCity = () => {

  };

  const edit = false;

  return (
    <div>
      {cities.length === 0 ? (
        <div className="no-cities">
          <p>No cities added, add a new one?</p>
          <button onClick={onAddCity}>Add City</button>
        </div>
      ) : (
        <div className="grid">
          {cities.map((city, index) => (
            <div className="city-link" key={index}>
              <City city={city} edit={edit}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
