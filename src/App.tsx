import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import CardDetails from "./components/Cards/CardDetails/CardDetails";
import CharacterPage from "./pages/CharactePage";
import LocationPage from "./pages/LocationPage";
import EpisodePage from "./pages/EpisodesPage";


const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<CharacterPage />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/episodes" element={<EpisodePage />} />
        <Route path="/:page/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
};

export default App;
