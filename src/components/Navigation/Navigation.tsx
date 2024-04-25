import React from "react";
import "./Navigation.scss";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import MeetingRoom from "@mui/icons-material/MeetingRoom";
import { firebaseAuth } from "../../firebase/firebaseinit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as weatherActions } from '../../features/weatherSlice';
import { actions as cityModalActions } from '../../features/addCityModalSlice';

export const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isEditing } = useAppSelector(state => state.weather);

  const reloadApp = () => {
    window.location.reload();
  };

  const onEditCities = () => {
    dispatch(weatherActions.changeIsEditing(!isEditing));
  }

  const onAddCity = () => {
    dispatch(cityModalActions.changeModalState(true));
  }

  const handleLogout = async () => {
    await firebaseAuth.signOut();
  };

  const currentDate = new Date();
  const weekday = currentDate.toLocaleString("en-us", { weekday: "short" });
  const month = currentDate.toLocaleString("en-us", { month: "short" });
  const day = currentDate.toLocaleString("en-us", { day: "2-digit" });
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' ? (
        <header className="container add-city">
          <nav>
            <span>Add City</span>
            <div className="right">
              <Button
                variant="contained"
                endIcon={<MeetingRoom />}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <i onClick={onEditCities} className="far fa-edit"></i>
              <i onClick={reloadApp} className="fas fa-sync"></i>
              <i onClick={onAddCity} className="fas fa-plus"></i>
            </div>
          </nav>
        </header>
      ) : (
        <header className="container">
          <nav>
            <Link className="router-link" to="/">
              <i className="fas fa-home"></i>
            </Link>
            <span>{`${weekday}, ${month} ${day}`}</span>
            <span>&deg; C</span>
          </nav>
        </header>
      )}
    </div>
  );
};
