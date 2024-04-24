import { Route, Routes } from "react-router-dom";
import { AddCity } from "../AddCity/AddCity";
import { CityDetails } from "../../pages/CityDetails/CityDetails";
import App from "../../App";
import { AuthProvider } from "../../providers/AuthProvider";
import { Login } from "../../pages/Login";
import { SignUp } from "../../pages/SignUp";

export const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthProvider />}>
        <Route element={<App />}>
          <Route index element={<AddCity />} />
          <Route path="/:city" element={<CityDetails />} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />

      <Route path="sign-up" element={<SignUp />} />

      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};
