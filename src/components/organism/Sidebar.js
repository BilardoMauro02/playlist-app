import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ playlists, onSelectHome, onSelectPlaylist }) => {
  return (
    <aside className="sidebar">
      <button className="home-button" onClick={onSelectHome}>
        Home
      </button>
      <ul className="playlist-list">
        {!playlists || Object.keys(playlists).length === 0 ? (
          <li className="playlist-item">Nessuna playlist trovata</li>
        ) : (
          Object.keys(playlists).map((name, i) => (
            <li key={i} className="playlist-item">
              {name}
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
