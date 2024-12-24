import React from 'react';

const Sidebar = ({ playlists, loginSpotify }) => (
  <div className="sidebar" style={{ background: '#282828', padding: '20px' }}>
    <h2>My Playlists</h2>
    <ul>
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <li key={playlist.id} style={{ margin: '10px 0' }}>
            {playlist.name}
          </li>
        ))
      ) : (
        <li>No playlists found</li>
      )}
    </ul>
    {!playlists.length && <button onClick={loginSpotify}>Login to Spotify</button>}
  </div>
);

export default Sidebar;
