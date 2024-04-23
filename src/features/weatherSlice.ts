import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityDetail } from "../types/CityDetail";
import { getData } from "../utils/getData";
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import { db } from '../firebase/firebaseinit';

interface InitialState {
  cityDetails: CityDetail[];
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  cityDetails: [],
  loading: true,
  error: "",
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getCity: (state, action: PayloadAction<string>) => {
      return state.cityDetails.find((city) => city.city === action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCityWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCityWeather.fulfilled, (state, action) => {
      state.cityDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getCityWeather.rejected, (state) => {
      state.loading = false;
      state.error = 'error';
    });
  },
});

export default weatherSlice.reducer;
export const { getCity } = weatherSlice.actions;

export const getCityWeather = createAsyncThunk("weather/getCityWeather", async () => {
  const firebaseDB = collection(db, "cities");

  const snapshot = await getDocs(firebaseDB);
  const newCities = [];
  for (const doc of snapshot.docs) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${doc.data().city}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`,
      );

      const data = response.data;
      await updateDoc(doc.ref, {
        currentWeather: data,
      });

      newCities.push({ ...doc.data(), currentWeather: data });
    } catch (err) {
      console.log(err);
    }
  }

  return newCities.map((city) => ({ ...city, city: city.currentWeather.name }));
});

