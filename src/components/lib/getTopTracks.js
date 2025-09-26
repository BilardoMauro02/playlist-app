export async function getTopTracks() {
  const res = await fetch(`http://localhost:3000/api/toptracks`);

  if (!res.ok) {
    console.error("Errore nella fetch:", res.status);
    return [];
  }

  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Errore nel parsing JSON:", err);
    return [];
  }
}