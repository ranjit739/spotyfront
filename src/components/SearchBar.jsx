import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => (
  <div>
    <input
      type="text"
      placeholder="Search for a song..."
      value={searchQuery}
      onChange={onSearchChange}
      style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
    />
    <button onClick={onSearchSubmit}>Search</button>
  </div>
);

export default SearchBar;
