import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchviewPlaylist, updateSongInPlaylist, deleteSongFromPlaylist } from '../services/service';
import { toast } from 'react-toastify';

const ViewAllSongs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const res = await fetchviewPlaylist(id);
      setSongs(res?.data?.songs || []);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [id]);

  const openModal = (track) => {
    setSelectedSong(track);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
  };

  const handleUpdateSong = async () => {
    setLoading(true);
    try {
      await updateSongInPlaylist(id, selectedSong);
      toast.success('Song updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Error updating song:', error);
      toast.error('Failed to update song');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSong = async () => {
    setLoading(true);
    try {
      await deleteSongFromPlaylist(id, selectedSong.songId);
      toast.success('Song deleted successfully from playlist!');
      closeModal();
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error('Failed to delete song from playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results my-8">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Playlist Songs</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((track) => (
          <li key={track.songId} className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
            <div className="p-4 flex flex-col items-center">
              <img src={track.albumImage || 'default_image_url'} alt={track.title} className="w-32 h-32 shadow-lg mb-4" />
              <h3 className="text-lg font-bold text-center truncate">{track.title}</h3>
              <p className="text-sm text-gray-300 mt-2 text-center"><span className="font-medium">Artist:</span> {track.artist}</p>
              <p className="text-sm text-gray-400 mt-1 text-center"><span className="font-medium">Album:</span> {track.album}</p>
            </div>
            <button className="btn btn-link" onClick={() => openModal(track)} disabled={loading}>
              {loading ? 'Loading...' : 'Delete Song'}
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Delete Song</h2>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{selectedSong?.title}</h3>
                <p className="text-sm text-gray-600">{selectedSong?.artist}</p>

                <div className="mt-4 text-center">
                  
                  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleDeleteSong} disabled={loading || !selectedSong}>
                    {loading ? 'Deleting...' : 'Delete Song'}
                  </button>
                </div>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                  &times;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllSongs;
