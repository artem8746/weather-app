import React from "react";
import "./AddCity.scss";
import { City } from "../City/City";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as cityModalActions } from "../../features/addCityModalSlice";
import { CityDetail } from "../../types/CityDetail";
import { updateCities } from "../../features/weatherSlice";


export const AddCity: React.FC = () => {
  const dispatch = useAppDispatch();

  const { cityDetails, isEditing, cities } = useAppSelector((state) => state.weather);

  const handleModalOpen = () => {
    dispatch(cityModalActions.changeModalState(true))
  };

  const handleCityRemove = (cityToRemove: string) => {
    const newCities = cities.filter(city => city !== cityToRemove)

    dispatch(updateCities(newCities));
  }

  return (
    <div>
      {cityDetails.length === 0 ? (
        <div className="no-cities">
          <p style={{ color: "black" }}>No cities added, add a new one?</p>
          <button onClick={handleModalOpen}>Add City</button>
        </div>
      ) : (
        <div className="grid">
          {cityDetails.map(
            (city: CityDetail, index: React.Key | null | undefined) => (
              <div className="city-link" key={index}>
                <City city={city} edit={isEditing} onCityRemove={handleCityRemove} />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

