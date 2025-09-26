"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ClientSidebar from "./ClientSidebar";
import ClientSearch from "./ClientSearch";

export default function ClientHome() {
  const [playlists, setPlaylists] = useState();
  const [popularSongs, setPopularSongs] = useState([]);
  const [playlistList, setPlaylistList] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem("playlistList");
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      console.error("Errore parsing iniziale playlistList:", err);
      return {};
    }
  });

  const router = useRouter();

  const handleSelectPlaylist = (id) => {
    router.push(`/playlist/${encodeURIComponent(id)}`);
  };

  const handleSelectHome = () => {
    router.push("/");
  };

  useEffect(() => {
    try {
      localStorage.setItem("playlistList", JSON.stringify(playlistList));
      window.dispatchEvent(new Event("playlistListUpdated"));
    } catch (err) {
      console.error("Errore salvataggio playlistList:", err);
    }
  }, [playlistList]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [playlistRes, topRes] = await Promise.all([
          fetch("/api/playlist"),
          fetch("/api/toptracks"),
        ]);

        const playlistData = playlistRes.ok ? await playlistRes.json() : [];
        const topData = topRes.ok ? await topRes.json() : [];

        setPlaylists(playlistData || []);
        setPopularSongs(topData || []);
      } catch (err) {
        console.error("Errore fetch iniziale:", err);
        setPlaylists([]);
        setPopularSongs([]);
      }
    };

    fetchInitialData();
  }, []);

  const handleCreatePlaylist = async (newPlaylist) => {
    const res = await fetch("/api/playlist", {
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
