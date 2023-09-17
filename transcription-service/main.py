from fastapi import FastAPI
from pathlib import Path
from fastapi import FastAPI, UploadFile
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import openai
import os
import cohere, httpx
import uvicorn, asyncio

from services.services import generate_conversation_prompts, generate_conversation_summary

load_dotenv()


app = FastAPI()
tmp_file_dir = "/tmp"
Path(tmp_file_dir).mkdir(parents=True, exist_ok=True)
openai.api_key = ""

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

co = cohere.Client(COHERE_API_KEY)
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


def main():
    host = "0.0.0.0"  # Use 0.0.0.0 to allow access from external hosts
    port = 8000  # Choose the port you want to use
    reload = True  # Enable auto-reloading for development

    uvicorn.run("main:app", host=host, port=port, reload=reload)

if __name__ == "__main__":
    main()