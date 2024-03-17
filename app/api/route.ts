import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    method: "GET",
  });
  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  return Response.json({ message: "Hello, world!", body });
}
