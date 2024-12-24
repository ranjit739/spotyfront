import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../config/config';
import PlaylistCard from '../components/PlaylistCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const clientId = CLIENT_ID;
  const clientSecret = CLIENT_SECRET;
  const redirect_uri = REDIRECT_URI;
  const code = new URLSearchParams(window.location.search).get('code'); // Get the `code` from URL query params
  const navigate = useNavigate();

  // Function to automatically log in to Spotify
  const loginSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state`;
    window.location.href = authUrl; // Automatically redirect the user to Spotify's login page
  };

  // UseEffect to handle automatic login flow
  useEffect(() => {
    // If `code` exists in the URL, exchange it for an access token
    if (code) {
      const base64Credentials = new TextEncoder().encode(`${clientId}:${clientSecret}`);
      const base64String = btoa(String.fromCharCode(...base64Credentials));

      axios
        .post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            code,
            redirect_uri,
            grant_type: 'authorization_code',
          }),
          {
            headers: {
              Authorization: `Basic ${base64String}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((response) => {
          setAccessToken(response.data.access_token);
        })
        .catch((error) => {
          console.error('Error getting access token:', error);
        });
    } 
    // If there is no `code` and the user doesn't have an access token, trigger Spotify login
    else if (!accessToken) {
      loginSpotify();
    }
  }, [code, accessToken]); // This effect will run when the `code` or `accessToken` changes

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (!searchQuery || !accessToken) return;

    axios
      .get('https://api.spotify.com/v1/search', {
        params: {
          q: searchQuery,
          type: 'track',
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSearchResults(response.data.tracks.items);
      })
      .catch((error) => {
        console.error('Error searching for songs:', error);
      });
  };

  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#1d1d1d',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <div
        className="main-content"
        style={{
          flex: 1,
          padding: '20px',
          width: '100%',
        }}
      >
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '10px',
            margin: '20px 0',
            borderRadius: '5px',
            border: '1px solid #444',
            background: '#333',
            color: '#fff',
          }}
        />
        <button
        onClick={handleSearchSubmit}
        style={{ marginBottom: '20px' }}
        className="border border-white text-white px-4 py-2 rounded-lg  hover:text-black transition-all"
      >
        Search
      </button>
      

        {/* Display Playlist Cards */}
        {playlists.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl text-white font-semibold mb-4">Your Playlists</h2>
            {playlists.map((playlist, index) => (
              <div key={index} className="bg-gray-700 p-4 mb-4 rounded-lg">
                <h3 className="text-xl text-white">{playlist.name}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Display Search Results */}
        {searchResults.length > 0 && <PlaylistCard searchResults={searchResults} />}
      </div>
    </div>
  );
};

export default Dashboard;
