import "../styles/PlaylistCard.css";
import Button from "../atoms/Button";
import { useState } from "react";

function PlaylistCard({ playlist, onDelete, onView }) {
  const [expanded, setExpanded] = useState(false);
  const { title, songs } = playlist;
  console.log("Songs ricevuti:", songs);


  return (
    
    <div className="playlist-card">
      <h3>{title}</h3>
      <p>
        <strong>Canzoni:</strong> {songs.length}
      </p>

      <div className="actions">
        <Button onClick={() => setExpanded(!expanded)}>
          {expanded ? "👁️ Nascondi" : "👁️ Visualizza"}
        </Button>
        <Button onClick={() => onDelete(playlist.id)}>🗑️ Elimina</Button>
      </div>

      {expanded && (
        <ul className="playlist-list">
          {songs.map((song, index) => (
            <li key={index}>
              
              🎵 {song.title} – {song.artist}
              {song.youtubeUrl && (
                <a
                  href={song.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                >
                  <span>🎬</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlaylistCard;
