const SearchSongs = () => {
    return (
      <div className="container mt-5">
        <h2>Search Songs</h2>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Search for songs..." />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <div className="mt-4">
          {/* Display search results here */}
          <p>No results found.</p>
        </div>
      </div>
    );
  };
  
  export default SearchSongs;