import '../styles/PlaylistCard.css'
import Button from "../atoms/Button";

function PlaylistCard({ playlist, onDelete, onView }) {
  const { title, mood, songs } = playlist;

  return (
    <div className={`playlist-card ${mood.toLowerCase()}`}>
      <h3>{title}</h3>
      <p><strong>Mood:</strong> {mood || 'Nessun mood'}</p>
      <p><strong>Canzoni:</strong> {songs.length}</p>

      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            🎵 {song.title} - {song.artist} ({song.genre})
          </li>
        ))}
      </ul>

      <div className="actions">
        <Button onClick={() => onView(playlist)}>👁️ Visualizza</Button>
        <Button onClick={() => onDelete(playlist.id)}>🗑️ Elimina</Button>
      </div>
    </div>
  );
}

export default PlaylistCard;