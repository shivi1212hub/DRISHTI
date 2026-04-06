import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// We rely on window.FaceMesh and window.Camera loaded via CDN scripts in index.html

const WebcamContext = createContext();

export const useWebcam = () => useContext(WebcamContext);

export const WebcamProvider = ({ children }) => {
  const [videoElement, setVideoElement] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [faceResults, setFaceResults] = useState(null);

  useEffect(() => {
    if (!videoElement) return;

    setIsInitializing(true);

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults((results) => {
      setFaceResults(results);
    });

    const camera = new window.Camera(videoElement, {
      onFrame: async () => {
        if (videoElement) {
          await faceMesh.send({ image: videoElement });
        }
      },
      width: 640,
      height: 480
    });

    camera.start().then(() => {
      setIsInitializing(false);
    }).catch(err => {
      console.error("Camera failed to start", err);
      setIsInitializing(false);
    });

    return () => {
      camera.stop();
      faceMesh.close();
    };
  }, [videoElement]);

  const videoRefCallback = React.useCallback((node) => {
    if (node !== null) {
      setVideoElement(node);
    }
  }, []);

  return (
    <WebcamContext.Provider value={{ videoRef: videoRefCallback, isInitializing, faceResults }}>
      {children}
    </WebcamContext.Provider>
  );
};
