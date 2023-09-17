from fastapi import FastAPI
from pathlib import Path
from fastapi import FastAPI, UploadFile
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import assemblyai as aai
import subprocess
import openai
import os
import cohere, httpx
import uvicorn, asyncio
from services.services import generate_conversation_prompts, generate_conversation_summary

load_dotenv()

app = FastAPI()
tmp_file_dir = "/tmp"
Path(tmp_file_dir).mkdir(parents=True, exist_ok=True)

aai.settings.api_key = os.getenv("AAI_API_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to the origin(s) of your frontend
    allow_credentials=True,
    allow_methods=[""],  # Change this to the allowed HTTP methods
    allow_headers=["*"],  # Change this to the allowed headers
)

@app.get("/process")
async def process(WEB_URL:str="http://localhost:3000/api/webhooks"):
    await asyncio.sleep(5)

    webhook_data = {"status": "done", "result": "processed data"}



    httpx.post(WEB_URL, json=webhook_data)
    return webhook_data
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/prompts")
async def get_conversation_prompts():
    # background = "I am a software engineering student at a hackathon. I have been networking with fellow hackers, volunteer mentors and company sponsors. Here is a summary of a conversation that I had with a recruiter, can you suggest some future talking points? Make sure to use dash onde for a paragraph and another notation."
    #
    # mock_conversation_summary = '''Pi grows up in India, where his family owns a zoo. He becomes interested in exploring various religions, including Hinduism, Christianity, and Islam, leading him to follow three different paths of faith. His life takes a dramatic turn when his family decides to sell the zoo and move to Canada. They board a Japanese cargo ship with their animals, but tragedy strikes when the ship sinks in the Pacific Ocean during a storm.
    # Pi is the sole human survivor, left stranded on a lifeboat in the vast ocean. However, he is not alone. He shares the lifeboat with a Bengal tiger named Richard Parker, who was also on the ship. The story primarily revolves around Pi's struggle for survival at sea, where he must coexist with the tiger while facing hunger, thirst, and the harsh realities of nature.
    # The novel explores themes of faith, storytelling, the power of imagination, and the human will to survive in the face of adversity. It challenges the boundaries between reality and fiction, leaving the reader to ponder the reliability of Pi's narrative.'''
    #
    # conversation_summary = generate_conversation_summary(transcription['text'])
    #
    # conversation_prompts = generate_conversation_prompts(background, mock_conversation_summary)

    summary = {"summary": "summary"}
    prompts = {"prompts": "prompts"}


@app.post("/api/media-file")
async def post_media_file(file: UploadFile):

    with open(os.path.join(tmp_file_dir, file.filename), 'wb') as disk_file:
        file_bytes = await file.read()

        disk_file.write(file_bytes)

        print(f"Received file named {file.filename} containing {len(file_bytes)} bytes. ")
        print(f"{tmp_file_dir}/{file.filename}")
        with open(f"{tmp_file_dir}/{file.filename}", 'rb') as audio_file:
            transcription = openai.Audio.transcribe("whisper-1", audio_file)
        response = co.summarize(text=transcription['text'], length='medium',
            format='paragraph',
            model='summarize-xlarge',
            additional_command='Seperate into Bullet Points',
            temperature=0.3,
        ).summary

        assert response != ""
        return response

@app.post("/api/audio")
async def process_audio(file: UploadFile):
    with open(os.path.join(tmp_file_dir, file.filename), 'wb') as disk_file:
        print(os.path.join(tmp_file_dir, file.filename))
        input_file = await file.read()

        disk_file.write(input_file)
       
        os.listdir()
        print(f"Received file named {file.filename} containing {len(input_file)} bytes. ")
        print(f"{tmp_file_dir}/{file.filename}")
        print(os.listdir())
        subprocess.run(f'ffmpeg -i "{os.path.join(tmp_file_dir, file.filename)}" "out".mp3',shell=True)
        
        audio_file= open("out.mp3", "rb")
        # transcription = openai.Audio.transcribe("whisper-1", audio_file)
        config = aai.TranscriptionConfig(speaker_labels=True, speakers_expected=2)

        transcriber = aai.Transcriber(config=config)
        transcript = transcriber.transcribe("out.mp3")
        os.remove("out.mp3")
        for utterance in transcript.utterances:
            speaker = utterance.speaker
            text = utterance.text
            print(f"Speaker {speaker}: {text}")
        co = cohere.Client(COHERE_API_KEY)

        script_text = transcript.text
        if len(script_text) < 250: 
            script_text += "".join(" " for i in range(255-len(script_text)))

        response = co.summarize(text=script_text, length='medium',
            format='paragraph',
            model='summarize-xlarge',
            additional_command='Seperate into Bullet Points',
            temperature=0.3,
        ).summary
        return {"Summary": response}

    return {"Hello": file.filename}


def main():
    host = "0.0.0.0"  # Use 0.0.0.0 to allow access from external hosts
    port = 8000  # Choose the port you want to use
    reload = True  # Enable auto-reloading for development

    uvicorn.run("main:app", host=host, port=port, reload=reload)

if __name__ == "__main__":
    main()