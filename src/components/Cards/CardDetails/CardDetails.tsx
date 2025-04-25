import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character, Location, Episode } from "../../../../types/types";
import Cards from "../Cards";
import { fetchCharacterById, fetchLocationById, fetchEpisodeById } from "../../services/api";
import "./CardDetails.css";
import Loader from "../../Loader/Loader";

type PageType = "character" | "location" | "episode";

/**
 * CardDetails component is responsible for displaying detailed information
 * about a specific character, location, or episode based on the `page` and `id` URL parameters.
 */

const CardDetails: React.FC = () => {
  const { page, id } = useParams<{ page: PageType; id: string }>();
  const [data, setData] = useState<Character | Location | Episode | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Function to fetch the relevant data based on the page type (character, location, episode)
    const fetchData = async () => {
      if (!page || !id) return; // Guard clause to avoid undefined values

      try {
        setLoading(true);
        let result: Character | Location | Episode | undefined;

        if (page === "character") {
          result = await fetchCharacterById(id);
        } else if (page === "location") {
          result = await fetchLocationById(id);
          const residentUrls = result?.residents; // these are URLs
          const residentIds = residentUrls?.map((url) => url.split("/").pop()); // extract IDs
          const residentData = await Promise.all(residentIds?.map((id) => fetchCharacterById(id!)) || []);

          setResidents(residentData);
        } else if (page === "episode") {
          result = await fetchEpisodeById(id);
          const episodeData = result as Episode;
          const characterUrls = episodeData.characters;
          const characterIds = characterUrls.map((url) => url.split("/").pop());
          const characterData = await Promise.all(characterIds.map((id) => fetchCharacterById(id!)));
          setResidents(characterData);
        }

        if (result) {
          setData(result);
        } else {
          console.warn("No data returned.");
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
      } finally {
        setLoading(false); // End loader
      }
    };

    fetchData();
  }, [page, id]);
  if (loading) return <Loader />;


  if (page === "character") {
    const character = data as Character;

    return (
      <div className="card-details-container">
        <div className="card-details-header">
          <img className="card-details-image" src={character.image} alt={character.name} />
          <div className="card-details-info">
            <h2>{character.name}</h2>
            <div className={`status-badge ${character.status}`}>{character.status}</div>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Type:</strong> {character.type || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {character.location?.name}
            </p>
            <p>
              <strong>Episodes:</strong>{" "}
              {Array.isArray(character.episode) ? character.episode.map((ep) => ep.split("/").pop()).join(", ") : "No episodes available"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (page === "location") {
    const location = data as Location;
    return (
      <div className="card-details-container">
        <div className="card-details-info">
          <h2>{location.name}</h2>
          <p>
            <strong>Type:</strong> {location.type}
          </p>
          <p>
            <strong>Dimension:</strong> {location.dimension}
          </p>
          <p>
            <strong>Residents:</strong>
          </p>
          <Cards page="character" results={residents} />
        </div>
      </div>
    );
  }

  if (page === "episode") {
    const episode = data as Episode;
    return (
      <div className="card-details-container">
        <div className="card-details-info">
          <h2>{episode.name}</h2>
          <p>
            <strong>Air Date:</strong> {episode.air_date}
          </p>
          <p>
            <strong>Episode:</strong> {episode.episode}
          </p>
          <p>
            <strong>Characters:</strong>
          </p>
          <Cards page="character" results={residents} />
        </div>
      </div>
    );
  }
};

export default CardDetails;
