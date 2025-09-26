export async function getPlaylistById(id) {
  if (!id) return null;

  try {
    const res = await fetch(`/api/playlists/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.warn("fetchPlaylistById: risposta non OK", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchPlaylistById: errore fetch", err);
    return null;
  }
}
