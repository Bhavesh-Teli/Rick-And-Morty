// src/types/index.ts

// 1. Character Interface
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// 2. Location Interface
export interface Location {
  id: number;
  name: string;
  url: string;
  type?: string;
  dimension?: string;
  residents?: string[];
  created?: string;
}
// 3. Episode Interface
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Filters {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}


// 5. API Response Interface (Generic)
export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}



// 4. Search Filters Interface
export interface SearchFilters {
  status?: string;
  species?: string;
  gender?: string;
  location?: string;
  episode?: string;
  type?: string;
  dimension?: string;
}


// types.ts
export interface FilterOptions {
  status?: string[];
  gender?: string[];
  species?: string[];
  location?: string[];
  episode?: string[];
  type?: string[];
  locationType?: string[];
  dimension?: string[];
}

