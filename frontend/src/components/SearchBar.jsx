import React from "react";
import { Search, User } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-section">

      <div className="search-box">

        <Search size={22} />

        <input
          type="text"
          placeholder="Search users, posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <button className="search-button">
        <Search size={24} />
      </button>

      <div className="search-avatar">
        <User size={27} />
      </div>

    </div>
  );
};

export default SearchBar;