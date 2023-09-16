import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  //console.log(request.body);
  return await NextResponse.json({ message: body });
}
