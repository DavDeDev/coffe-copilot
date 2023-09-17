"use client";

import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios"

const Recorder = () => {
  const addAudioElement = async (blob) => {
    // This doesn't work - need to convert to an mp4!
    console.log(blob);

    const formData = new FormData();
    formData.append('file', blob, 'your_blob.webm');

    axios.post("http://127.0.0.1:8000/api/audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // We can play the recorded audio back here:
    // const url = URL.createObjectURL(blob);
    // const audio = document.createElement("audio");
    // console.log(url);
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  return (
    <AudioRecorder
      onRecordingComplete={(blob) => addAudioElement(blob)}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
        downloadOnSavePress={false}
      downloadFileExtension="mp3"
    />
  );
};
export default Recorder;
