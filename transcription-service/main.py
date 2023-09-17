from pathlib import Path

import httpx
from fastapi import FastAPI, UploadFile
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import assemblyai as aai
import subprocess
import os
import uvicorn
from services.services import generate_conversation_prompts, generate_conversation_summary

load_dotenv()

app = FastAPI()
tmp_file_dir = "/tmp"
Path(tmp_file_dir).mkdir(parents=True, exist_ok=True)

aai.settings.api_key = os.getenv("AAI_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to the origin(s) of your frontend
    allow_credentials=True,
    allow_methods=[""],  # Change this to the allowed HTTP methods
    allow_headers=["*"],  # Change this to the allowed headers
)
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/audio")
async def process_audio(file: UploadFile, conversation_id: str):
    print("CONVERSATION", conversation_id)
    try:
        with open(os.path.join(tmp_file_dir, file.filename), 'wb') as disk_file:
            print(os.path.join(tmp_file_dir, file.filename))
            input_file = await file.read()

            disk_file.write(input_file)

            os.listdir()
            print(f"Received file named {file.filename} containing {len(input_file)} bytes. ")
            print(f"{tmp_file_dir}/{file.filename}")
            print(os.listdir())
            subprocess.run(f'ffmpeg -i "{os.path.join(tmp_file_dir, file.filename)}" "out".mp3',shell=True)

            audio_file = open("out.mp3", "rb")
            config = aai.TranscriptionConfig(speaker_labels=True, speakers_expected=2)

            print("Transcribing...")
            transcriber = aai.Transcriber(config=config)
            transcript = transcriber.transcribe("out.mp3")
            os.remove("out.mp3")

            if not transcript.utterances:
                return {"Summary": "Unavailable"}

            for utterance in transcript.utterances:
                speaker = utterance.speaker
                text = utterance.text
                print(f"Speaker {speaker}: {text}")

            script_text = transcript.text
            if len(script_text) < 250:
                script_text += "".join(" " for i in range(255-len(script_text)))

            background = "I am a software engineering student at a hackathon. I have been networking with fellow hackers, volunteer mentors and company sponsors. Here is a summary of a conversation that I had with a recruiter, can you suggest some future talking points? Make sure to use dash onde for a paragraph and another notation."

            print("Summarizing...")
            conversation_summary = generate_conversation_summary(script_text)

            print("Generating...")
            conversation_prompts = generate_conversation_prompts(background, conversation_summary)

            print("Webhook sent!")
            webhook_data = {"text": script_text, "summary": conversation_summary, "prompt": conversation_prompts, "conversation_id": conversation_id}

            httpx.post("http://localhost:3000/api/webhooks", json=webhook_data)

            return webhook_data
    except Exception:
        raise


def main():
    host = "0.0.0.0"  # Use 0.0.0.0 to allow access from external hosts
    port = 8000  # Choose the port you want to use
    reload = True  # Enable auto-reloading for development

    uvicorn.run("main:app", host=host, port=port, reload=reload)

if __name__ == "__main__":
    main()