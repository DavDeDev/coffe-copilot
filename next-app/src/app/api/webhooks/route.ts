import { NextResponse, NextRequest } from "next/server";
import { createConversation } from "@/lib/actions/conversations.actions";

export interface AudioAnalysis {
  text: string;
  summary: string;
  prompt: string;
}

export async function POST(request: NextRequest) {
  // Our Python backends sends webhook containing a JSON body with the audio analysis fields after it has finished processing the audio
  const body: AudioAnalysis = await request.json();
  const conversation = await createConversation(
    body.text,
    body.summary,
    body.prompt
  );
  return await NextResponse.json({ "conversation": conversation });
}
