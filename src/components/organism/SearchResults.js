"use client";

import { useEffect, useState } from "react";
import TrackItem from "../molecules/TrackItem.js";

import '../styles/SearchResults.css'

export default function SearchResults({ query, onAddTrack }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchTracks = async () => {
      try {
        const res = await fetch(
          `/api/search-track?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setTracks(data.tracks || []);
      } catch (err) {
        console.error("Errore fetch:", err);
        setTracks([]);
      }
    };

    fetchTracks();
  }, [query]);

  return (
    <div className="search-results-container">
      <ul className="track-list">
        {tracks.map((track, i) => (
          <TrackItem key={i} track={track} onAdd={() => onAddTrack(track)} />
        ))}
      </ul>
    </div>
  );
}
