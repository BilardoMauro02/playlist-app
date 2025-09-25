"use client";

import "../styles/ClientSearch.css";
import PlaylistCard from "../molecules/PlaylistCard";

import { useState, useEffect } from "react";
import SearchBar from "../molecules/SearchBar";
import SearchResults from "../organism/SearchResults";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function ClientSearch() {
  const [query, setQuery] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [playlistList, setPlaylistList] = useState({});
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchYoutubeUrl = async (track) => {
    try {
      const res = await fetch(`/api/youtube-search?artist=${encodeURIComponent(track.artist)}&title=${encodeURIComponent(track.name)}`);
      if (!res.ok) return null;
      const data = await res.json();
      console.log("Risposta API:", data);
      return data.url || null;
      
    } catch (err) {
      console.error("Errore YouTube:", err);
      return null;
    }
  };

  // Carica da localStorage
  useEffect(() => {
    const savedPlaylist = localStorage.getItem("playlist");
    if (savedPlaylist) setPlaylist(JSON.parse(savedPlaylist));

    const savedList = localStorage.getItem("playlistList");
    if (savedList) setPlaylistList(JSON.parse(savedList));
  }, []);

  // Salva su localStorage
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("playlistList", JSON.stringify(playlistList));
  }, [playlist, playlistList]);

  const handleAddClick = (track) => {
    setSelectedTrack(track);
    setShowModal(true);
  };

  return (
    <>
      <div className={showModal ? "blur-overlay" : ""}>
        <section>
          <SearchBar query={query} setQuery={setQuery} />  
        </section>
        <section className="search-results-wrapper">
        <div className="search-results">
          <SearchResults query={query} onAddTrack={handleAddClick} />
        </div>
        </section>
        <h2>🎧 Playlist</h2>
        {Object.keys(playlistList).length > 0 && (
          <section className="playlist-grid">
            {Object.entries(playlistList).map(([name, tracks], i) => (
              <PlaylistCard
                key={name}
                playlist={{
                  id: `playlist-${i}`,
                  title: name,
                  songs: tracks.map((t) => ({
                    title: t.name,
                    artist: t.artist,
                    youtubeUrl: t.youtubeUrl,
                  })),
                }}
                onDelete={(id) => {
                  const updated = { ...playlistList };
                  delete updated[name];
                  setPlaylistList(updated);
                  localStorage.setItem("playlistList", JSON.stringify(updated));
                }}
                onView={(playlist) => {
                  console.log("Visualizza playlist:", playlist);
                }}
              />
            ))}
          </section>
        )}
      </div>

      {showModal && selectedTrack && (
        <>
          <div className="modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="modal">
            <h2>🎶 Aggiungi a playlist</h2>

            <h3>Playlist esistenti</h3>
            <ul>
              {Object.keys(playlistList).map((name) => (
                <li key={name}>
                  <Button
                    onClick={async () => {
                      const youtubeUrl = await fetchYoutubeUrl(selectedTrack);
                      const trackWithUrl = { ...selectedTrack, youtubeUrl };

                      const updated = {
                        ...playlistList,
                        [name]: [...(playlistList[name] || []), trackWithUrl],
                      };

                      setPlaylistList(updated);
                      localStorage.setItem(
                        "playlistList",
                        JSON.stringify(updated)
                      );
                      setShowModal(false);
                    }}
                  >
                    ➕ {name}
                  </Button>
                </li>
              ))}
            </ul>

            <h3>Crea nuova playlist</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target.playlistName.value.trim();
                if (!name) return;

                const youtubeUrl = await fetchYoutubeUrl(selectedTrack);
                const trackWithUrl = { ...selectedTrack, youtubeUrl };

                const updated = {
                  ...playlistList,
                  [name]: [trackWithUrl],
                };

                setPlaylistList(updated);
                localStorage.setItem("playlistList", JSON.stringify(updated));
                setShowModal(false);
              }}
            >
              <Input name="playlistName" placeholder="Nome playlist" />
              <Button type="submit">➕ Crea e aggiungi</Button>
            </form>

            <Button onClick={() => setShowModal(false)}>❌ Chiudi</Button>
          </div>
        </>
      )}
    </>
  );
}
