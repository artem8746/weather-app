import { Route, Routes } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";
import { AddCity } from "../components/AddCity/AddCity";
import { CityDetails } from "../pages/CityDetails";
import App from "../App";

export const Root: React.FC = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AddCity />} />
        <Route path="/:city" element={<CityDetails />} />
      </Route>

      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};
