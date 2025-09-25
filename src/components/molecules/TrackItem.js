import "../styles/TrackItem.css";

import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function TrackItem({ track, onAdd }) {
  return (
    <ul className="track-list">
      <li className="track-item">
        <div className="track-info">
          <strong>{track.name}</strong> – {track.artist}
        </div>
        <Button type="button" onClick={() => onAdd(track)}>
          ➕
        </Button>
      </li>
    </ul>
  );
}
