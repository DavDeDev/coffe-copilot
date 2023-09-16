"use client";

import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const Recorder = () => {
  const addAudioElement = async (blob) => {
    // This doesn't work - need to convert to an mp4!
    console.log(blob);

    fetch("http://127.0.0.1:8000/api/media-file", {
      method: "POST",
      body: blob,
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
      //   downloadOnSavePress={true}
      downloadFileExtension="webm"
    />
  );
};
export default Recorder;
