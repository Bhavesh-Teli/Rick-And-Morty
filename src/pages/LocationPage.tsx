import { fetchLocations } from "../components/services/api";
import HomePage from "./Home/HomePage";

const LocationPage= () => {
  return (
    <HomePage
      fetchData={fetchLocations}
      cardsType="location"
      filterType="location"
    />
  );
};

export default LocationPage;
