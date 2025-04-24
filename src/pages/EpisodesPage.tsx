import { fetchEpisodes } from "../components/services/api";
import HomePage from "./Home/HomePage";

const EpisodePage = () => {
  return (
    <HomePage
      fetchData={fetchEpisodes}
      cardsType="episode"
      filterType="episode"
    />
  );
};

export default EpisodePage;
