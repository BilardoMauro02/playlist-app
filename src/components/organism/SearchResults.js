'use client';

import { useEffect, useState } from 'react';
import TrackItem from '../molecules/TrackItem.js';

export default function SearchResults({ query }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchTracks = async () => {
      const res = await fetch(`/api/search-track?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setTracks(data.tracks || []);
    };

    fetchTracks();
  }, [query]);

  return (
    <ul className="track-list">
      {tracks.map((track, i) => (
        <TrackItem key={i} track={track} />
      ))}
    </ul>
  );
}