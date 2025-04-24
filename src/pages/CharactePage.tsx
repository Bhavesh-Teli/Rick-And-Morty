import { fetchCharacters } from "../components/services/api";
import HomePage from "./Home/HomePage";

const CharacterPage = () => {
  return (
    <HomePage
      fetchData={fetchCharacters}
      cardsType="character"
      filterType="character"
    />
  );
};

export default CharacterPage;
