import React, { useState } from 'react';
import PlaylistCreator from './PlaylistCreator';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const navigate = useNavigate();

  const OpenCreateField = () => {
    setCreateIsOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate("/login");
  };

  return (
    <>
      <div
        className="flex justify-between bg-black py-3"
        style={{
          background: '#1d1d1d',
          color: '#fff',
          position: 'sticky',  // This makes the header sticky
          top: 0,  // Keeps it fixed at the top
          zIndex: 1000,  // Ensures it stays above other content when scrolling
          width: '100%',  // Ensures the header spans the full width of the screen
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Optional shadow to make the header stand out
        }}
      >
        <button
          className="playlist-button mx-3"
          style={{
            backgroundColor: '#1DB954',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '50px',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {/* Playlist Button */}
        <div className="relative">
          <button
            className="playlist-button mx-3"
            style={{
              backgroundColor: '#1DB954',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => navigate("/myplaylist")}
          >
            My Playlist
          </button>

          <button
            disabled={createIsOpen}
            className="playlist-button"
            style={{
              backgroundColor: '#1DB954',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => OpenCreateField()}
          >
            Create Playlist
          </button>

          <button
            className="playlist-button mx-2"
            style={{
              backgroundColor: '#1DB954',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>

      {createIsOpen && <PlaylistCreator setCreateIsOpen={setCreateIsOpen} />}
    </>
  );
};

export default Header;
