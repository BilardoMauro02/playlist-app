import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=c15489b43b9dfb3b5b7073706a8b40b2&format=json`);
  const json = await res.json();

  const tracks = json.results.trackmatches.track.map((t) => ({
    id: t.mbid || `${t.name}-${t.artist}`,
    name: t.name,
    artist: t.artist,
  }));

  return NextResponse.json({ tracks });
}