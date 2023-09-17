
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { uploadFile } from '@/lib/gcs';

const mimeType = 'audio/ogg';

const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef(null);

  const [recordingStatus, setRecordingStatus] = useState('inactive');

  const [stream, setStream] = useState(null);

  const [audio, setAudio] = useState(null);

  const [audioChunks, setAudioChunks] = useState([]);

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  const startRecording = async () => {
    setRecordingStatus('recording');
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus('inactive');
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
			console.log(audioUrl);
      setAudio(audioUrl);

      setAudioChunks([]);
    };
  };

	function transcribeAudio() {
		console.log('transcribeAudio');
		fetch('http://localhost:3000/api/upload-audio', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ audio: audio })
		}).then((res) => {
			console.log('res', res);
		})
	}

	function uploadFile() {
		fetch('http://localhost:3000/api/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ audio: audio })
		}).then((res) => {
			console.log('res', res);
		})
		console.log('uploadFileeeeee');
	}

  return (
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === 'inactive' ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === 'recording' ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
				<button onClick={()=>transcribeAudio()}>CLICK HERE TO SEND TO API</button>
				<br/>
				<br/>
				<button onClick={()=>uploadFile()}> UPLOAD TO GCP</button>
      </main>
    </div>
  );
};

export default AudioRecorder;
