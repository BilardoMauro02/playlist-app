import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get("artist");
  const title = searchParams.get("title");

  if (!artist || !title) {
    return NextResponse.json({ error: "Parametri mancanti" }, { status: 400 });
  }

  const query = `${artist} ${title} official music video`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  return NextResponse.json({ url: youtubeUrl }, { status: 200 });
}