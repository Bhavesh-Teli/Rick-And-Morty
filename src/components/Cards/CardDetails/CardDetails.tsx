import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character, Location, Episode } from "../../../../types/types";
import Cards from "../Cards";
import {
  fetchCharacterById,
  fetchLocationById,
  fetchEpisodeById,
} from "../../services/api";
import "./CardDetails.module.css";

type PageType = "character" | "location" | "episode";

const CardDetails: React.FC = () => {
  const { page, id } = useParams<{ page: PageType; id: string }>();
  console.log(page, id);
  const [data, setData] = useState<Character | Location | Episode | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);

  console.log("data", data)
  useEffect(() => {
    const fetchData = async () => {
      if (!page || !id) return; // Guard clause to avoid undefined values

      try {
        let result: Character | Location | Episode | undefined;

        if (page === "character") {
          result = await fetchCharacterById(id);
        } else if (page === "location") {
          result = await fetchLocationById(id);
          const residentUrls = result?.residents; // these are URLs
          const residentIds = residentUrls?.map(url => url.split("/").pop()); // extract IDs
          const residentData = await Promise.all(
            residentIds?.map(id => fetchCharacterById(id!)) || []
          );

          setResidents(residentData);
        } else if (page === "episode") {
          result = await fetchEpisodeById(id);
          const episodeData = result as Episode;
          const characterUrls = episodeData.characters;
          const characterIds = characterUrls.map((url) => url.split("/").pop());
          const characterData = await Promise.all(
            characterIds.map((id) => fetchCharacterById(id!))
          );
          setResidents(characterData);
        }

        if (result !== undefined) {
          setData(result);
        } else {
          console.warn("No data returned for the specified page and id.");
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    fetchData();
  }, [page, id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="card-details-container">
      {page === "character" && data && (
        <div className="card-details-header">
          <img
            className="card-details-image"
            src={(data as Character).image}
            alt={(data as Character).name}
          />
          <div className="card-details-info">
            <h2>{(data as Character).name}</h2>
            <span className={`status-badge ${(data as Character).status}`}>
              {(data as Character).status}
            </span>
            <p><strong>Species:</strong> {(data as Character).species}</p>
            <p><strong>Gender:</strong> {(data as Character).gender}</p>
            <p><strong>Type:</strong> {(data as Character).type || "N/A"}</p>
            <p><strong>Location:</strong> {(data as Character).location.name}</p>
            <p><strong>Episodes:</strong> {(data as Character).episode.map((ep) => ep.split("/").pop()).join(", ")}</p>
          </div>
        </div>
      )}

      {page === "location" && data && (
        <div className="card-details-info">
          <h2>{(data as Location).name}</h2>
          <p><strong>Type:</strong> {(data as Location).type}</p>
          <p><strong>Dimension:</strong> {(data as Location).dimension}</p>
          <p><strong>Residents:</strong></p>
          <Cards page="character" results={residents} />
        </div>
      )}

      {page === "episode" && data && (
        <div className="card-details-info">
          <h2>{(data as Episode).name}</h2>
          <p><strong>Air Date:</strong> {(data as Episode).air_date}</p>
          <p><strong>Episode:</strong> {(data as Episode).episode}</p>
          <p><strong>Characters:</strong></p>
          <Cards page="character" results={residents} />
        </div>
      )}
    </div>
  );
};

export default CardDetails;
