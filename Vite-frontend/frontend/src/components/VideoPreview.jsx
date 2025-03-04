import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import "../App.css";

const VideoPreview = ({ videoURL, subtitles }) => {
  const [playing, setPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);

  // Extract audio from the uploaded video
  useEffect(() => {
    if (videoURL) {
      const extractAudio = async () => {
        const video = document.createElement("video");
        video.src = videoURL;
        video.crossOrigin = "anonymous";

        // Wait for the video to load
        await new Promise((resolve) => {
          video.onloadedmetadata = resolve;
        });

        // Create an audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        // Create a media element source
        const source = audioContext.createMediaElementSource(video);
        audioSourceRef.current = source;

        // Create a destination (optional: connect to speakers)
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);

        // Create a blob URL for the audio
        const mediaRecorder = new MediaRecorder(destination.stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
        };

        // Start recording
        mediaRecorder.start();
        video.play();

        // Stop recording after a short delay (adjust as needed)
        setTimeout(() => {
          mediaRecorder.stop();
          video.pause();
        }, 5000); // Adjust the duration as needed
      };

      extractAudio();
    }
  }, [videoURL]);

  // Initialize WaveSurfer
  useEffect(() => {
    if (audioURL && waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        cursorWidth: 1,
        height: 80,
        progressColor: "#FE6E00", // Orange
        responsive: true,
        waveColor: "#C4C4C4", // Light Gray
        cursorColor: "transparent",
      });

      wavesurferRef.current.load(audioURL);

      return () => {
        wavesurferRef.current.destroy();
      };
    }
  }, [audioURL]);

  // Handle play/pause
  const handlePlay = () => {
    setPlaying(!playing);
    wavesurferRef.current.playPause();
  };

  // Generate timestamps for the timeline
  const generateTimestamps = (duration) => {
    const timestamps = [];
    const interval = 10; // Show a timestamp every 10 seconds
    for (let i = 0; i <= duration; i += interval) {
      const minutes = Math.floor(i / 60);
      const seconds = i % 60;
      timestamps.push(`${padNumber(minutes, 2)}:${padNumber(seconds, 2)}`);
    }
    return timestamps;
  };

  // Utility function to pad numbers with leading zeros
  const padNumber = (number, length) => {
    return number.toString().padStart(length, "0");
  };

  // Function to format subtitles into WebVTT format
  const formatSubtitlesToVTT = (subtitles) => {
    let vttContent = "WEBVTT\n\n";
    subtitles.forEach((subtitle) => {
      vttContent += `${subtitle.id}\n`;
      vttContent += `${subtitle.start} --> ${subtitle.end}\n`;
      vttContent += `${subtitle.text}\n\n`;
    });
    return vttContent;
  };

  return (
    <div className="video-container">
      <div className="video-box">
        <h2 className="video-title">Video Uploaded</h2>
        {videoURL ? (
          <>
            <video className="video-player" controls>
              <source src={videoURL} type="video/mp4" />
              {subtitles && subtitles.length > 0 && (
                <track
                  src={URL.createObjectURL(
                    new Blob([formatSubtitlesToVTT(subtitles)], { type: "text/vtt" })
                  )}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                  default
                />
              )}
              Your browser does not support the video tag.
            </video>

            {/* Timeline Section */}
            <div className="timeline-container">
              <div className="waveform-container">
                <button className="play-button" onClick={handlePlay}>
                  {!playing ? "Play" : "Pause"}
                </button>
                <div ref={waveformRef} className="waveform" />
              </div>

              {/* Timestamps */}
              <div className="timestamps">
                {wavesurferRef.current &&
                  generateTimestamps(wavesurferRef.current.getDuration()).map(
                    (timestamp, index) => (
                      <span key={index} className="timestamp">
                        {timestamp}
                      </span>
                    )
                  )}
              </div>
            </div>
          </>
        ) : (
          <p className="video-placeholder">No video uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;