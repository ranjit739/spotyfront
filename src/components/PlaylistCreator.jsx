import React, { useState } from 'react';
import { createPlaylist, getPlaylist } from '../services/service';
import { toast } from 'react-toastify';

const PlaylistCreator = ({ setCreateIsOpen }) => {
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [loading, setLoading] = useState(false);

    const onCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("newPlaylistName", newPlaylistName);
            const res = await createPlaylist({ name: newPlaylistName });
            console.log("Playlist created successfully:", res);
            setNewPlaylistName("");
            getPlaylist()
            setCreateIsOpen(false);  // Close the modal after successful creation
        } catch (error) {
            console.error("Playlist creation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cancel the playlist creation and close the modal
  

    return (
        <div className="max-w-lg mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Create a Playlist</h2>
            <input
                type="text"
                placeholder="Enter playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full p-4 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex space-x-4">
                <button
                    onClick={onCreate}
                    disabled={loading}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                    {loading ? 'Creating...' : 'Create Playlist'}
                </button>
                <button
                    onClick={()=>setCreateIsOpen(false)}
                    className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PlaylistCreator;
