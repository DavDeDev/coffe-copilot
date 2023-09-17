import { NextResponse } from 'next/server';

import axios from 'axios';
import fs from 'fs-extra';

export async function POST(request:Request) {

  console.log('request.body', request.body);
  console.log('request.files', request.files);
  // const { url } = await request.body;
  // replace with your API token
  const YOUR_API_TOKEN = 'e0734713318f414583f133c62b9b4517';

  // URL of the file to transcribe
  const FILE_URL =
    'https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3';

  // AssemblyAI transcript endpoint (where we submit the file)
  const transcript_endpoint = 'https://api.assemblyai.com/v2/transcript';

  // request parameters where speaker_labels has been enabled
  const data = {
    audio_url: FILE_URL,
    speaker_labels: true,
  };

  // HTTP request headers
  const headers = {
    Authorization: YOUR_API_TOKEN,
    'Content-Type': 'application/json',
  };

  // submit for transcription via HTTP request
  const response = await axios.post(transcript_endpoint, data, {
    headers: headers,
  });

  // polling for transcription completion
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${response.data.id}`;

  while (true) {
    const pollingResponse = await axios.get(pollingEndpoint, {
      headers: headers,
    });
    const transcriptionResult = pollingResponse.data;

    if (transcriptionResult.status === 'completed') {
      // print the results
      console.log(transcriptionResult);
      break;
    } else if (transcriptionResult.status === 'error') {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  return NextResponse.json({ message: 'Hello World' });
}
