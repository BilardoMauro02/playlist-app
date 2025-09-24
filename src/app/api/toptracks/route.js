import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c15489b43b9dfb3b5b7073706a8b40b2&format=json'
  );
  const data = await res.json();
  const topTracks = data.tracks?.track;

  // Se è un array valido, restituiscilo
  if (Array.isArray(topTracks)) {
    return NextResponse.json(topTracks.slice(0, 10));
  }

  // Altrimenti, restituisci errore
  return NextResponse.json({ error: 'Formato dati non valido' });
}
