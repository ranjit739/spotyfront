import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePlaylist, getPlaylist, updatePlaylist } from '../services/service'; // Assuming you have this service
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const MyPlaylist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); // State to manage active dropdown
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false); // Modal visibility state
  const [currentPlaylist, setCurrentPlaylist] = useState(null); // Playlist being renamed
  const [newName, setNewName] = useState(""); // New name input state

  // Fetch the playlist
  const fetchPlayList = async () => {
    setLoading(true);
    try {
      const res = await getPlaylist(); // Assuming getPlaylist() is an async function
      console.log("Successfully fetched playlists:", res);
      setPlaylists(res?.data); // Assuming res.data is the playlist array
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayList(); // Fetch playlists when component mounts
  }, []);

  // Handle viewing the playlist
  const handleViewPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  // Handle deleting the playlist
  const handleDeletePlaylist = async (playlistId) => {
    setLoading(true);
    try {
      const res = await deletePlaylist(playlistId); // Assuming deletePlaylist() is an async function
      console.log("Successfully deleted playlist:", res);
      fetchPlayList();
    } catch (error) {
      console.error("Error deleting playlist:", error);
      setError(error.message);
      toast.error(`Playlist delete failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle opening the rename modal
  const handleRenameClick = (playlist) => {
    setCurrentPlaylist(playlist); // Set the playlist being renamed
    setNewName(playlist.name); // Set current name as default
    setIsRenameModalOpen(true); // Open the modal
  };

  // Handle renaming the playlist
  const handleRenameSubmit = async (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      toast.error("Playlist name cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await updatePlaylist(currentPlaylist._id, { name: newName });
      console.log("Successfully renamed playlist:", res);
      fetchPlayList(); // Re-fetch playlists after updating
      setIsRenameModalOpen(false); // Close the modal
      toast.success("Playlist renamed successfully!");
    } catch (error) {
      console.error("Error renaming playlist:", error);
      setError(error.message);
      toast.error(`Rename failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">My Playlists</h2>

      {/* Show loader if playlists are being fetched */}
      {loading && <Loader />}

      {/* Show error if any */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Display Playlists */}
      {!loading && playlists.length === 0 && (
        <div className="text-center text-gray-500">No playlists found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists?.map((playlist) => (
          <div key={playlist._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm rounded-full px-2 py-1">
                {playlist.songs.length} Songs
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{playlist.name}</h3>
              <p className="text-sm text-gray-600">{playlist.description}</p>
            </div>
            <div className="flex justify-between p-4 bg-gray-100">
              <button
                onClick={() => handleViewPlaylist(playlist._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleRenameClick(playlist)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Rename
              </button>
              <button
                onClick={() => handleDeletePlaylist(playlist._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rename Modal */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-xl font-semibold mb-4">Rename Playlist</h2>
            <form onSubmit={handleRenameSubmit}>
              <div className="mb-4">
                <label htmlFor="newName" className="block text-sm font-medium text-gray-700">
                  New Playlist Name
                </label>
                <input
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter new name"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsRenameModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaylist;
