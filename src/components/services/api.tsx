import axios from "axios";
import { Character, ApiResponse, Location, Episode, Filters, FilterOptions } from "../../../types/types";

// Base URL for the Rick and Morty API
const BASE_URL = "https://rickandmortyapi.com/api";

// Helper function to convert a parameter object into a query string
const toQueryParams = (params: Record<string, string | number>): string => {
  const filteredParams: Record<string, string> = {};

  // Filter out undefined values and convert everything to string
  for (const key in params) {
    if (params[key] !== undefined) {
      filteredParams[key] = String(params[key]);
    }
  }

  return new URLSearchParams(filteredParams).toString();
};

// Fetch paginated characters with optional filters
export const fetchCharacters = async (page: number = 1, name: string = "", filters: Filters = {}): Promise<ApiResponse<Character>> => {
  const queryParams = toQueryParams({ page, name, ...filters });
  const response = await axios.get<ApiResponse<Character>>(`${BASE_URL}/character?${queryParams}`);
  return response.data;
};

// Fetch a single character by ID
export const fetchCharacterById = async (id: number | string): Promise<Character> => {
  const response = await axios.get<Character>(`${BASE_URL}/character/${id}`);
  return response.data;
};

// Fetch paginated locations with optional filters
export const fetchLocations = async (page: number = 1, name: string = "", filters: Filters = {}): Promise<ApiResponse<Location>> => {
  const queryParams = toQueryParams({ page, name, ...filters });
  const response = await axios.get<ApiResponse<Location>>(`${BASE_URL}/location?${queryParams}`);
  return response.data;
};

// Fetch a single location by ID
export const fetchLocationById = async (id: string | number): Promise<Location> => {
  const response = await axios.get<Location>(`${BASE_URL}/location/${id}`);
  return response.data;
};

// Fetch paginated episodes with optional search by name
export const fetchEpisodes = async (page: number = 1, name: string = "", filters: Filters = {}): Promise<ApiResponse<Episode>> => {
  const queryParams = toQueryParams({ page, name, ...filters });
  const response = await axios.get<ApiResponse<Episode>>(`${BASE_URL}/episode?${queryParams}`);
  return response.data;
};

// Fetch a single episode by ID
export const fetchEpisodeById = async (id: string | number): Promise<Episode> => {
  const response = await axios.get<Episode>(`${BASE_URL}/episode/${id}`);
  return response.data;
};

// Fetch filter options for characters by scraping all pages
export const fetchCharacterFilterOptions = async (): Promise<FilterOptions> => {
  // Helper to remove duplicates
  const unique = <T,>(arr: T[]) => Array.from(new Set(arr.filter(Boolean)));

  const allCharacters: Character[] = [];
  let nextUrl: string | null = `${BASE_URL}/character`;

  // Loop through all character pages
  while (nextUrl) {
    const { data }: { data: ApiResponse<Character> } = await axios.get(nextUrl);
    allCharacters.push(...data.results);
    nextUrl = data.info.next;
  }

  // Extract distinct values for filters
  return {
    status: ["Alive", "Dead", "Unknown"],
    gender: ["Male", "Female", "Genderless", "Unknown"],
    species: unique(allCharacters.map((c) => c.species)),
    type: unique(allCharacters.map((c) => c.type)),
    location: unique(allCharacters.map((c) => c.location.name)),
    episode: unique(allCharacters.flatMap((c) => c.episode)),
  };
};

// Fetch filter options for locations by scraping all pages
export const fetchLocationFilterOptions = async (): Promise<FilterOptions> => {
  const unique = <T,>(arr: T[]) => Array.from(new Set(arr.filter(Boolean)));

  const allLocations: Location[] = [];
  let locationNextUrl: string | null = `${BASE_URL}/location`;

  // Loop through all location pages
  while (locationNextUrl) {
    const { data }: { data: ApiResponse<Location> } = await axios.get(locationNextUrl);
    allLocations.push(...data.results);
    locationNextUrl = data.info.next;
  }

  // Extract distinct types and dimensions
  return {
    type: unique(allLocations.map((l) => l.type).filter((t): t is string => t !== undefined)),
    dimension: unique(allLocations.map((l) => l.dimension).filter((d): d is string => d !== undefined)),
  };
};
