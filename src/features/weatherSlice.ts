import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityDetail } from "../types/CityDetail";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, firebaseAuth } from "../firebase/firebaseinit";
import { getWeatherInfo } from "../utils/fetchClient";

interface InitialState {
  cities: string[];
  cityDetails: CityDetail[];
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  cities: [],
  cityDetails: [],
  loading: true,
  error: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCityWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCityWeather.fulfilled, (state, action) => {
      state.cityDetails = action.payload;
      state.cities = action.payload.map((cityDetail: CityDetail) => cityDetail.city);
      state.loading = false;
    });
    builder.addCase(getCityWeather.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });

    builder.addCase(updateCities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCities.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.loading = false;
    });
    builder.addCase(updateCities.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default weatherSlice.reducer;

export const getCityWeather = createAsyncThunk(
  "weather/getCityWeather",
  async () => {
    const documentId = firebaseAuth.currentUser!.uid;

    const docRef = doc(db, "users", documentId);
    const docSnap = await getDoc(docRef);

    const cities = (docSnap.data() as string[]) || [];

    console.log(cities, "cir");

    const citiesWeatherInfo = [] as CityDetail[];

    for (let i = 0; i < cities.length; i++) {
      try {
        const response = await getWeatherInfo(cities[i]);

        const data = response.data;

        citiesWeatherInfo.push({ city: cities[i], currentWeather: data });
      } catch (err) {
        console.log(err);
      }
    }

    return citiesWeatherInfo;
  },
);

export const updateCities = createAsyncThunk(
  "weather/addCity",
  async (updatedCities: string[], { dispatch }) => {
    const documentId = firebaseAuth.currentUser!.uid;

    const updatedDoc = {
      cities: updatedCities,
    };

    const docRef = doc(db, "users", documentId);

    await updateDoc(docRef, updatedDoc);

    dispatch(getCityWeather);

    return updatedCities;
  },
);
