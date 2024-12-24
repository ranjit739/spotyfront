import React, { useState, useEffect } from 'react';
import PlaylistCreator from './PlaylistCreator';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const OpenCreateField = () => {
    setCreateIsOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="flex justify-between bg-black py-3"
        style={{
          background: '#1d1d1d',
          color: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
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
            cursor: isAuthenticated ? 'pointer' : 'not-allowed',
          }}
          onClick={() => navigate("/dashboard")}
          disabled={!isAuthenticated}
        >
          Dashboard
        </button>

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
              cursor: isAuthenticated ? 'pointer' : 'not-allowed',
            }}
            onClick={() => navigate("/myplaylist")}
            disabled={!isAuthenticated}
          >
            My Playlist
          </button>

          <button
            disabled={createIsOpen || !isAuthenticated}
            className="playlist-button"
            style={{
              backgroundColor: '#1DB954',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '16px',
              cursor: isAuthenticated ? 'pointer' : 'not-allowed',
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
              cursor: isAuthenticated ? 'pointer' : 'not-allowed',
            }}
            onClick={() => handleLogout()}
            disabled={!isAuthenticated}
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
