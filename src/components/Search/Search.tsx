import React from "react";
import "./Search.css";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

const Search: React.FC<SearchProps> = ({ setSearch, setPageNumber, title }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setPageNumber(1); // Reset to the first page when a new search is made
  };

  return (
    <div className="search-container">
      <h2 className="search-heading">{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      <input type="text" placeholder={`Search ${title.toLowerCase()}...`} className="search-input" onChange={handleInputChange} />
    </div>
  );
};

export default Search;
