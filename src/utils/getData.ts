import { collection, getDocs, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import { db } from '../firebase/firebaseinit'; // Adjust the import path if necessary

export const getData = async () => {
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
};