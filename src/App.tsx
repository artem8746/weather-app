import "./App.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import "./components/Navigation/Navigation.scss";
import { getCityWeather } from "./features/weatherSlice";
import { useAppDispatch } from "./app/hooks";

function App() {
  const [modalOpen, setModalOpen] = useState(null);
  const [addCityActive, setAddCityActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getCityWeather());
    // checkRoute();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

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
          <Navigation
            onAddCity={toggleModal}
            onEditCities={toggleEdit}
            addCityActive={addCityActive}
          />
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
