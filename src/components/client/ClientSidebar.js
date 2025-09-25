"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../organism/Sidebar.js';

export default function ClientSidebar() {
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("playlistList");
    if (stored) {
      try {
        setPlaylists(JSON.parse(stored));
      } catch (e) {
        console.error("Errore parsing playlistList:", e);
      }
    }
  }, []);


  const handleSelectHome = () => {
    router.push('/'); // oppure reset logico
  };

  const handleSelectPlaylist = (playlist) => {
    console.log("Playlist selezionata:", playlist.name);
    // puoi fare router.push(`/playlist/${playlist.name}`) se hai routing dinamico
  };


  return (
    <Sidebar
      playlists={playlists}
      onSelectHome={handleSelectHome}
      onSelectPlaylist={handleSelectPlaylist}
    />
  );
}