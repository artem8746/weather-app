import { useEffect } from "react";
import { firebaseAuth } from "../firebase/firebaseinit";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export const AuthProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        navigate("login");
      }
    });
  }, []);

  return <Outlet />;
};
