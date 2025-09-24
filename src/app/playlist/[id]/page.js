import { notFound } from 'next/navigation';

export async function getUserPlaylists() {
  // Nessuna playlist iniziale
  return [];
}


export default async function PlaylistPage({ params }) {
  const { id } = params;
  const playlists = await getUserPlaylists(); // recupera tutte le playlist create dall’utente
  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) return notFound();

  return (
    <main className="app">
      <h1>🎧 {playlist.title}</h1>
      <p>Mood: {playlist.mood}</p>

      <ul>
        {playlist.songs.map((song, i) => (
          <li key={i}>
            🎵 {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </main>
  );
}