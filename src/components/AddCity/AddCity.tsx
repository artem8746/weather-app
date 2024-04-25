import React, { forwardRef, useCallback, useState } from "react";
import "./AddCity.scss";
import { City } from "../City/City";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import clsx from "clsx";
import { Autocomplete, Box, TextField, debounce } from "@mui/material";
import { updateCities } from "../../features/weatherSlice";
import { getCities } from "../../utils/fetchClient";
import { actions as cityModalActions } from "../../features/addCityModalSlice";


export const AddCity: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpened, newCity } = useAppSelector(state => state.cityModal);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const { cityDetails, cities } = useAppSelector((state) => state.weather);

  const handleModalOpen = () => {
    dispatch(cityModalActions.changeModalState(true))
  };

  const handleModalClose = () => {
    dispatch(cityModalActions.reset());
  };

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
    <div>
      {cityDetails.length === 0 ? (
        <div className="no-cities">
          <p style={{ color: "black" }}>No cities added, add a new one?</p>
          <button onClick={handleModalOpen}>Add City</button>

          <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={isOpened}
            onClose={handleModalClose}
            slots={{ backdrop: StyledBackdrop }}
          >
            <ModalContent sx={{ width: 400 }}>
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

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);
