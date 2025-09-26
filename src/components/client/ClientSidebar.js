"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../organism/Sidebar.js';

export default function ClientSidebar({ playlists, onSelectHome, onSelectPlaylist }) {
  const [loaclPlaylists, setLocalPlaylist] = useState({});

  useEffect(() => {
    const updateFromStorage = () => {
    const stored = localStorage.getItem("playlistList");
    if (stored) {
      try {
        setLocalPlaylist(JSON.parse(stored));
      } catch (e) {
        console.error("Errore parsing playlistList:", e);
      }
    }
  };
    window.addEventListener("playlistListUpdated", updateFromStorage);
    return () => window.removeEventListener("playlistListUpdated", updateFromStorage);

  }, []);

  return (
    <Sidebar
      playlists={loaclPlaylists}
      onSelectHome={onSelectHome}
      onSelectPlaylist={onSelectPlaylist}
    />
  );
}