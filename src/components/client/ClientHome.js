"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ClientSidebar from "./ClientSidebar";
import ClientSearch from "./ClientSearch";

export default function ClientHome({ initialPlaylists, popularSongs }) {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [playlistList, setPlaylistList] = useState({});
  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

    const handleSelectPlaylist = (id) => {
        router.push(`/playlist/${encodeURIComponent(id)}`);
    };

    const handleSelectHome = () => {
        router.push("/");
    };

  // Carica da localStorage al primo render
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("playlistList");
    if (stored) {
      try {
        setPlaylistList(JSON.parse(stored));
      } catch (err) {
        console.error("Errore parsing playlistList:", err);
      }
    }

    setHydrated(true);
  }, []);

  // Salva su localStorage quando playlistList cambia
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem("playlistList", JSON.stringify(playlistList));
      window.dispatchEvent(new Event("playlistListUpdated"));
    } catch (err) {
      console.error("Errore salvataggio playlistList:", err);
    }
  }, [playlistList, hydrated]);

  const handleCreatePlaylist = async (newPlaylist) => {
    const res = await fetch("/api/playlists", {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updated = await fetch("/api/playlists");
      const data = await updated.json();
      setPlaylists(data);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
        <ClientSidebar 
        playlists={playlists}
        onSelectHome={handleSelectHome}
        onSelectPlaylist={handleSelectPlaylist}
        />
      <main className="home">
        <h1>🎼 Playlist Creator</h1>

        <section>
          <ClientSearch
            onCreate={handleCreatePlaylist}
            playlistList={playlistList}
            setPlaylistList={setPlaylistList}
          />
        </section>

        <section>
          <h2>Canzoni Popolari</h2>
          <ul className="list">
            {popularSongs.map((track, i) => (
              <li key={i} className="item">
                <img
                  src={track.image?.[2]?.["#text"] || "/placeholder.jpg"}
                  alt={track.name}
                  className="cover"
                />
                <div className="title">{track.name}</div>
                <div className="artist">{track.artist?.name}</div>
                <div className="playcount">{track.playcount} ascolti</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}