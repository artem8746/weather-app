import React, { forwardRef } from "react";
import "./AddCity.scss";
import { City } from "../City/City";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import clsx from "clsx";
import { actions as cityModalActions } from "../../features/addCityModalSlice";
import { CityDetail } from "../../types/CityDetail";


export const AddCity: React.FC = () => {
  const dispatch = useAppDispatch();

  const { cityDetails } = useAppSelector((state) => state.weather);

  const handleModalOpen = () => {
    dispatch(cityModalActions.changeModalState(true))
  };

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
                <City city={city} edit={false} />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line react/display-name
const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

