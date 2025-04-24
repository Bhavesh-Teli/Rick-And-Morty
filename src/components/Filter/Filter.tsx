import React, { useState, useEffect } from "react";
import "./Filter.css";
import {FilterOptions , SearchFilters } from "../../../types/types";

// Reusable SelectFilter component
const SelectFilter = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) => (
  <div className="select-wrapper">
    <label>{label}</label>
    <select value={value} onChange={onChange} className="filter-select">
      <option value="">Select {label}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

const getEpisodeNumbers = (episodes: string[]) => {
  return episodes.map((epUrl) => epUrl.split("/").pop() || "");
};

interface FilterProps {
  onFilterChange: (filters: SearchFilters) => void;
  availableFilters: FilterOptions;
  filterType: "character" | "location" | "episode"; // new prop for filter type
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, availableFilters, filterType }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    status: "",
    gender: "",
    species: "",
    location: "",
    episode: "",
    type: "",
    dimension: "",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(filters)
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      gender: "",
      species: "",
      location: "",
      episode: "",
      type: "",
    });
  };

  return (
    <div className="filter-wrapper">
      {/* Character Filters */}
      {filterType === "character" && (
        <div className="filter-row">
          <SelectFilter
            label="Status"
            value={filters.status || ""}
            onChange={(e) => handleChange("status", e.target.value)}
            options={availableFilters.status || []}
          />
          <SelectFilter
            label="Gender"
            value={filters.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            options={availableFilters.gender || []}
          />
          <SelectFilter
            label="Species"
            value={filters.species || ""}
            onChange={(e) => handleChange("species", e.target.value)}
            options={availableFilters.species || []}
          />
          {/* Type filter for Character */}
          <SelectFilter
            label="Type"
            value={filters.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
            options={availableFilters.type || []} 
          />
        </div>
      )}

      {/* Location Filters */}
      {filterType === "location" && (
        <div className="filter-row">
          <SelectFilter
            label="Dimension"
            value={filters.dimension || ""}
            onChange={(e) => handleChange("dimension", e.target.value)}
            options={availableFilters.dimension || []}
          />
          <SelectFilter
            label="Type"
            value={filters.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
            options={availableFilters.type || []}  
          />
        </div>
      )}

      {/* Episode Filters */}
      {filterType === "episode" && (
        <div className="filter-row">
          <div className="select-wrapper">
            <label>Episode</label>
            <select
              value={filters.episode || ""}
              onChange={(e) => handleChange("episode", e.target.value)}
              className="filter-select"
            >
              <option value="">Select Episode</option>
              {getEpisodeNumbers(availableFilters.episode || []).map((num) => (
                <option key={num} value={num}>
                  Episode {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <button onClick={clearFilters} className="clear-btn">Clear Filters</button>
    </div>
  );
};

export default Filter;
