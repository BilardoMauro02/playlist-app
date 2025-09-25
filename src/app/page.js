import "../components/styles/App.css";
import ClientSearch from "@/components/client/ClientSearch.js";
import ClientSidebar from "../components/client/ClientSidebar.js";

export async function getTopTracks() {
  const res = await fetch(`http://localhost:3000/api/toptracks`, {
    cache: "no-store",
  });
  return await res.json();
}

export default async function Home() {
  const popularSongs = await getTopTracks();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="sidebar">
        <ClientSidebar />
      </div>

      <main className="home">
        <h1>🎼 Playlist Creator</h1>

        <section>
          <ClientSearch />
        </section>

        <section>
          <h2>Canzoni Popolari</h2>
          <ul className="list">
            {popularSongs.map((track, i) => (
              <li key={i} className="item">
                <img
                  src={track.image?.[2]?.["#text"] || "/placeholder.jpg"}
                  alt={track.name}
                  className="cover"
                />
                <div className="title">{track.name}</div>
                <div className="artist">{track.artist?.name}</div>
                <div className="playcount">{track.playcount} ascolti</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
