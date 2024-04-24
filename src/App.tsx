import { Button } from "@mui/material";
import { Box } from "@mui/material";
import "./App.scss";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AddCity } from "./components/AddCity/AddCity";
import axios from "axios";
import { db } from "./firebase/firebaseinit";
import { collection, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { Navigation } from "./components/Navigation";
import { CityDetail } from "./types/CityDetail";

import "./components/Navigation/Navigation.scss";
import { CityDetails } from "./pages/CityDetails/CityDetails";
import { getCityWeather } from "./features/weatherSlice";
import { useAppDispatch } from "./app/hooks";
// import { WeatherData } from "./types/WeatherData";

function App() {
  const [isDay, setIsDay] = useState(null);
  const [isNight, setIsNight] = useState(null);
  const [city] = useState("Vinnytsia");
  const [modalOpen, setModalOpen] = useState(null);
  const [addCityActive, setAddCityActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [cities, setCities] = useState<CityDetail[]>([]);

  useEffect(() => {
    dispatch(getCityWeather());
    // checkRoute();
  }, []);

  // useEffect(() => {
  //   checkRoute();
  // }, [location]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  // const checkRoute = () => {
  //   if (location.pathname === "/add-city") {
  //     setAddCityActive(true);
  //   } else {
  //     setAddCityActive(false);
  //   }
  // };

  const dayTime = () => {
    setIsDay(!isDay);
  };

  const nightTime = () => {
    setIsNight(!isNight);
  };

  const resetDays = () => {
    setIsDay(false);
    setIsNight(false);
  };

  // const getCurrentWeather = () => {
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`,
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching weather data:", error);
  //     });
  // };

  const onAddCity = () => {
    setEdit(false);
  }

  return (
    <div className="main">
      {isLoading ? (
        <div className="loading">
          <span></span>
        </div>
      ) : (
        <div className="app">
          {/* {modalOpen && <Modal onCloseModal={toggleModal} APIkey={APIkey} cities={cities} />} */}
          <Navigation
            onAddCity={toggleModal}
            onEditCity={toggleEdit}
            addCityActive={addCityActive}
            isDay={isDay}
            isNight={isNight}
          />
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
