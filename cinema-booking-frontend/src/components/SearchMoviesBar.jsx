import React from "react";

const SearchMoviesBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Step 2: Handle search query change
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by title..."
      />
      {/* You can add a search button if needed */}
    </div>
  );
};

export default SearchMoviesBar;