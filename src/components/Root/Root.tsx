import { Route, Routes } from "react-router-dom";
import { AddCity } from "../AddCity/AddCity";
import { CityDetails } from "../../pages/CityDetails/CityDetails";
import App from "../../App";
import { AuthProvider } from "../../providers/AuthProvider";
import { SignIn } from "../../pages/SignIn";

export const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthProvider />}>
        <Route element={<App />}>
          <Route index element={<AddCity />} />
          <Route path="/:city" element={<CityDetails />} />
        </Route>
      </Route>

      <Route path="login" element={<SignIn />} />

      <Route path="sign-up" element={<SignIn isSignUp />} />

      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};
