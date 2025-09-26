"use client";
import React, { useEffect, useState } from "react";

export default function PlaylistPage({ params }) {
  const { id } = React.use(params);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("playlistList");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTracks(parsed[id] || []);
      } catch (err) {
        console.error("Errore parsing:", err);
      }
    }
  }, [id]);

  return (
    <>
      <h2>🎧 {id.replace("playlist-", "")}</h2>
      {tracks.length === 0 ? (
        <p>Playlist vuota</p>
      ) : (
        <ul className="playlist-grid">
          {tracks.map((track, i) => (
            <li key={i}>
              <div>{track.name} – {track.artist}</div>
              {track.youtubeUrl && (
                <a href={track.youtubeUrl} target="_blank">▶️ YouTube</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}