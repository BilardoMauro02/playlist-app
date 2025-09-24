import Button from '../atoms/Button';

export default function TrackItem({ track }) {
  return (
    <li className="track-item">
      <div>
        <strong>{track.name}</strong> – {track.artist}
      </div>
      <form action="/api/prepare-add" method="POST">
        <input type="hidden" name="trackId" value={track.id} />
        <input type="hidden" name="trackName" value={track.name} />
        <input type="hidden" name="trackArtist" value={track.artist} />
        <Button type="submit">➕ Aggiungi alla playlist</Button>
      </form>
    </li>
  );
}