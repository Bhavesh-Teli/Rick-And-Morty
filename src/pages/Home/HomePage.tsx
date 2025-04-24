import { useEffect, useState } from "react";
import { ApiResponse, FilterOptions, SearchFilters, Character, Episode, Location } from "../../../types/types";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
import { fetchCharacterFilterOptions, fetchLocationFilterOptions } from "../../components/services/api";
import "./HomePage.css"
// Define the type of cards based on the page (e.g., character, episode, location)
interface HomePageProps {
  fetchData: (page: number, search: string, filters: SearchFilters) => Promise<ApiResponse<Character | Episode | Location>>;
  cardsType: "character" | "episode" | "location";
  filterType: "character" | "episode" | "location";
}

const HomePage = ({ fetchData, cardsType, filterType }: HomePageProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [search, setSearch] = useState<string>(""); // Search query
  const [filters, setFilters] = useState<SearchFilters>({
    status: "",
    gender: "",
    species: "",
    location: "",
    episode: "",
    type: "",
  });
  const [fetchedData, setFetchedData] = useState<ApiResponse<Character | Episode | Location> | null>(null); // Updated type to handle any type
  const [availableFilters, setAvailableFilters] = useState<FilterOptions>({
    status: [],
    gender: [],
    species: [],
    location: [],
    episode: [],
    type: [],
  });

  // Handle filter change
  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Extract results and pagination info
  const { info, results } = fetchedData || { info: undefined, results: [] };
  const totalPages = info?.pages || 1;

  // Fetch data on page number, filters, or search change
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await fetchData(pageNumber, search, filters);
        setFetchedData(data);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 
            'status' in error.response && error.response.status === 404) {
          setFetchedData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
        } else {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    fetchApiData();
  }, [pageNumber, filters, search, fetchData]); // Dependencies for refetching data

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        if (filterType === "character") {
          const options = await fetchCharacterFilterOptions();
          setAvailableFilters(options);
        } else if (filterType === "location") {
          const options = await fetchLocationFilterOptions();
          setAvailableFilters(options);
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };

    fetchFilters();
  }, [filterType]);
  // Determine the type of data based on cardsType
  const getCardData = (cardsType: "character" | "episode" | "location", results: Character[] | Episode[] | Location[]) => {
    switch (cardsType) {
      case "character":
        return results as Character[]; // Cast to Character[] based on cardsType
      case "episode":
        return results as Episode[]; // Cast to Episode[] based on cardsType
      case "location":
        return results as Location[]; // Cast to Location[] based on cardsType
      default:
        return results; // Fallback
    }
  };

  return (
    <div className="main-container">
      <Search setSearch={setSearch} setPageNumber={setPageNumber} title={cardsType} />
      <Filter onFilterChange={handleFilterChange} availableFilters={availableFilters} filterType={filterType} />
      <div className="content-layout">
        {results.length > 0 ? (
          <Cards page={cardsType} results={getCardData(cardsType, results)} />
        ) : (
          <div className="no-results">
          No results found for the selected filters.
        </div>
        )}
      </div>
      <Pagination pageCount={totalPages} onPageChange={setPageNumber} />
    </div>
  );
};

export default HomePage;
