"use client";

import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

const Recorder = () => {
  const addAudioElement = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "your_blob.webm");

    axios.post("http://127.0.0.1:8000/api/audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        conversation_id: "!!!!!!!!!!!!!!!!!!!!!!", // TODO: Send the real conversation id
      },
    });
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
