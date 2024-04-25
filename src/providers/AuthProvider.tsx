import { useEffect } from "react";
import { firebaseAuth } from "../firebase/firebaseinit";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../app/hooks";
import { getCityWeather } from "../features/weatherSlice";

export const AuthProvider = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        navigate('login');

        return;
      }

      dispatch(getCityWeather());
    })
  }, []);

  return (
    <Outlet />
  )
}