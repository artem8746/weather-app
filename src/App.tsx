import "./App.scss";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import "./components/Navigation/Navigation.scss";
import { updateCities } from "./features/weatherSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Autocomplete, Box, Modal, TextField, debounce } from "@mui/material";
import { getCities } from "./utils/fetchClient";
import { actions as cityModalActions } from "./features/addCityModalSlice";
import { ModalContent, StyledBackdrop } from "./components/ModalContent";

function App() {
  const { isOpened, newCity } = useAppSelector(state => state.cityModal);
  const { cities } = useAppSelector(state => state.weather);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getCityWeather());
    // checkRoute();
  }, []);

  const updateAutocompleteCities = useCallback(
    debounce((newCity: string) => {
      if (newCity.trim()) {
        getCities(newCity)
          .then(({ data: { data } }) => {
            const cities = data.map(({ city }: { city: string }) => city);

            setAutocompleteCities(cities);
          })
          .catch(() => {
            updateAutocompleteCities(newCity);
          });
      }
    }, 300),
    [],
  );

  const handleModalOpen = () => {
    dispatch(cityModalActions.changeModalState(true));
  };

  const handleModalClose = () => {
    dispatch(cityModalActions.reset());
  }

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleModalClose();

    const data = new FormData(event.currentTarget);

    const city = data.get("city") as string;

    dispatch(updateCities([...cities, city]));
  };

  const onNewCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(cityModalActions.changeNewCity(e.target.value));

    updateAutocompleteCities(e.target.value);
  };

  return (
    <div className="main">
      {isLoading ? (
        <div className="loading">
          <span></span>
        </div>
      ) : (
        <div className="app">
          <Navigation
            onAddCity={handleModalOpen}
            onEditCities={toggleEdit}
          />
          <Outlet />

          <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={isOpened}
            className="city-modal"
            onClose={handleModalClose}
            slots={{ backdrop: StyledBackdrop }}
          >
            <ModalContent
              sx={{ width: 400 }}
              className="modal-content"
            >
              <h2 id="unstyled-modal-title" className="modal-title">
                Enter city name
              </h2>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Autocomplete
                  fullWidth
                  id="combo-box-demo"
                  options={autocompleteCities}
                  renderInput={(params) => (
                    <TextField
                      value={newCity}
                      onChange={onNewCityChange}
                      {...params}
                      label="City"
                      fullWidth
                      name="city"
                    />
                  )}
                />
              </Box>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;
