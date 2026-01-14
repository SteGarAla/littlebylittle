"use client";

import { useRef } from "react";

export default function Home() {
  // video is of type HTMLVideoElement or null
  const videoRef = useRef<HTMLVideoElement | null>(null);

  async function startCamera() {
    // returns mediaStream object if successful (only using users camera no audio being captured)
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    // checking if we have anything running and make that the current
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  }

  // grassy.matcha.darkchocolate.its weird because the flavor sticks to your tongue and its like matcha
  async function stopCamera() {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const stream = video.srcObject as MediaStream | null;

    stream?.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }

  return (
    <>
      <div> littlebylittle - book collection</div>
      <video ref={videoRef} autoPlay playsInline />
      <button type="button" onClick={startCamera}>
        {" "}
        start the camera
      </button>
      <button type="button" onClick={stopCamera}>
        {" "}
        stop the camera
      </button>
    </>
  );
}
