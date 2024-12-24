const UpdatePlaylist = () => {
    return (
      <div className="container mt-5">
        <h2>Update Playlist</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Playlist Name</label>
            <input type="text" className="form-control" placeholder="Enter playlist name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" placeholder="Enter description"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    );
  };
  
  export default UpdatePlaylist;