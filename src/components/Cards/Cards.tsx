import React from "react";
import { useNavigate } from "react-router-dom";
import { Character, Episode, Location } from "../../../types/types";
import "./Cards.css";

interface CardsProps {
  page: "character" | "location" | "episode";
  results: Character[] | Location[] | Episode[];
}
/**
 * Cards component displays a list of cards (characters, locations, or episodes).
 * Each card includes basic details about the entity and navigates to the respective detailed page on click.
 */
const Cards: React.FC<CardsProps> = ({ page, results }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/${page}/${id}`);
  };

  return (
    <div className="cards-container">
      {results.map((item) => {
        if (page === "character") {
          const character = item as Character;

          return (
            <div key={character.id} className="card" onClick={() => handleCardClick(character.id)}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <div className={`status-badge ${character.status.toLowerCase()}`}>
                {character.status}
              </div>
              <p>
                <strong>Species:</strong> {character.species}
              </p>
              <p>
                <strong>Gender:</strong> {character.gender}
              </p>
              <p>
                <strong>Origin:</strong> {character.origin.name}
              </p>
              <p>
                <strong>Location:</strong> {character.location.name}
              </p>
            </div>
          );
        }

        if (page === "location") {
          const location = item as Location;
          return (
            <div key={location.id} className="card" onClick={() => handleCardClick(location.id)}>
              <h3>{location.name}</h3>
              <p>
                <strong>Type:</strong> {location.type}
              </p>
              <p>
                <strong>Dimension:</strong> {location.dimension}
              </p>
              <p>
                <strong>Residents:</strong> {location.residents?.length}
              </p>
            </div>
          );
        }

        if (page === "episode") {
          const episode = item as Episode;
          return (
            <div key={episode.id} className="card" onClick={() => handleCardClick(episode.id)}>
              <h3>{episode.name}</h3>
              <p>
                <strong>Air Date:</strong> {episode.air_date}
              </p>
              <p>
                <strong>Episode:</strong> {episode.episode}
              </p>
              <p>
                <strong>Characters:</strong> {episode.characters?.length}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Cards;
