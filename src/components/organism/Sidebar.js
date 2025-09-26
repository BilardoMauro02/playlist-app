import React from "react";
import "../styles/Sidebar.css";

function Sidebar({ playlists, onSelectHome, onSelectPlaylist }) {
  return (
    <div className="sidebar">
      <button className="home-button" onClick={onSelectHome}>
        🏠 Home
      </button>
      <ul>
        {Object.entries(playlists).map(([id, tracks]) => (
          <li className="playlist-item" key={id} onClick={() => onSelectPlaylist(id)}>
            {id.replace("playlist-", "")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;