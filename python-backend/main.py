from fastapi import FastAPI
from pathlib import Path
from fastapi import FastAPI, UploadFile
import openai
import os

app = FastAPI()
tmp_file_dir = "/tmp"
Path(tmp_file_dir).mkdir(parents=True, exist_ok=True)
openai.api_key = ""
COHERE_API_KEY = "aojQMA01guv79g9YULby6UPpTtx2o1zDMknnpwhq"


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/media-file")
async def post_media_file(file: UploadFile):

    with open(os.path.join(tmp_file_dir, file.filename), 'wb') as disk_file:
        file_bytes = await file.read()

        disk_file.write(file_bytes)

        print(f"Received file named {file.filename} containing {len(file_bytes)} bytes. ")
        print(f"{tmp_file_dir}/{file.filename}")
        with open(f"{tmp_file_dir}/{file.filename}", 'rb') as audio_file:
            transcription = openai.Audio.transcribe("whisper-1", audio_file)
        co = cohere.Client(API_KEY)
        response = co.summarize(text=transcription['text'], length='medium',
            format='paragraph',
            model='summarize-xlarge',
            additional_command='Seperate into Bullet Points',
            temperature=0.3,
        ).summary

        assert response != ""
        return response
