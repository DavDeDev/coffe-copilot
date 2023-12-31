import { NextResponse, NextRequest } from "next/server";
import {
  createConversation,
  updateConversation,
} from "@/lib/actions/conversations.actions";

export interface AudioAnalysis {
  text: string;
  summary: string;
  prompt: string;
  conversation_id: string;
}

export async function POST(request: NextRequest) {
  // Our Python backends sends webhook containing a JSON body with the audio analysis fields after it has finished processing the audio
  const body: AudioAnalysis = await request.json();
  console.log("body", body);
  const conversation = await updateConversation(
    body.text,
    body.summary,
    body.prompt,
    body.conversation_id
  );
  return await NextResponse.json({ "conversation": conversation });
}
