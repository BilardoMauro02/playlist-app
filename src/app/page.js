import "../components/styles/App.css"

import ClientHome from "../components/client/ClientHome.js";
import { getTopTracks } from "../components/lib/getTopTracks.js";

export default async function Page() {
  const popularSongs = await getTopTracks();

  const res = await fetch("http://localhost:3000/api/playlist", {
    cache: "no-store",
  });

  const playlists = res.ok ? await res.json() : [];

  return(
    <ClientHome initialPlaylists={playlists} popularSongs={popularSongs} />
  )
}