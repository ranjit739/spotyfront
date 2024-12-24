import React, { useState } from 'react';
import { getPlaylist, addSongToPlaylist } from '../services/service';

const PlaylistCard = ({ searchResults }) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [songsDetails, setSongsDetails] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for both fetch and add operations

  // Fetch playlists and open modal
  const addToPlayList = async (track) => {
    setSongsDetails(track);
    setLoading(true); // Start loader when fetching playlists
    try {
      const res = await getPlaylist();
      setPlaylists(res.data);
      setIsRenameModalOpen(true);
      setSelectedPlaylistId(null); // Reset selected playlist
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false); // End loader once fetch is complete
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsRenameModalOpen(false);
  };

  // Add song to selected playlist
  const handleAddToPlaylist = async (playlistId) => {
    setLoading(true); // Show loader when adding song to the playlist
    try {
      await addSongToPlaylist(playlistId, songsDetails);
      closeModal(); // Close the modal after adding song
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    } finally {
      setLoading(false); // End loader after song is added
    }
  };

  return (
    <>
      <div className="search-results my-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Search Results</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((track) => (
            <li
              key={track.id}
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4 flex flex-col items-center">
                {track.album.images?.[0]?.url && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-32 h-32 rounded-full shadow-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-bold text-center truncate">{track.name}</h3>
                <p className="text-sm text-gray-300 mt-2 text-center">
                  <span className="font-medium">Artist:</span>{' '}
                  {track.artists.map((artist) => artist.name).join(', ')}
                </p>
                <p className="text-sm text-gray-400 mt-1 text-center">
                  <span className="font-medium">Album:</span> {track.album.name}
                </p>
              </div>
              <button
                className="btn btn-link"
                onClick={() => addToPlayList(track)} // Pass the track to addToPlayList
                disabled={loading} // Disable the button while loading
              >
                {loading ? 'Loading...' : 'Add to Playlist'}
              </button>
            </li>
          ))}
        </ul>

        {/* Playlist Selection Modal */}
        {isRenameModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
              <h2 className="text-xl font-semibold mb-4">Select Playlist</h2>
              {/* Loader when playlists are being fetched */}
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <ul className="space-y-2">
                  {playlists?.map((playlist) => (
                    <li
                      key={playlist._id}
                      className={`py-2 px-4 rounded cursor-pointer text-black hover:bg-gray-200 ${selectedPlaylistId === playlist._id ? 'bg-gray-300' : ''}`}
                      onClick={() => setSelectedPlaylistId(playlist._id)} // Set selected playlist
                    >
                      {playlist.name}
                    </li>
                  ))}
                </ul>
              )}

              {/* Close button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Add button */}
              <div className="mt-4 text-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={() => handleAddToPlaylist(selectedPlaylistId)} // Add song to selected playlist
                  disabled={loading || !selectedPlaylistId} // Disable button if loading or no playlist is selected
                >
                  {loading ? 'Adding...' : 'Add to Playlist'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaylistCard;
