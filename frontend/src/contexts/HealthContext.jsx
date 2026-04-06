import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useWebcam } from './WebcamContext';
import { getBlinkStatus, getScreenDistance } from '../utils/eyeTracking';

const HealthContext = createContext();

export const useHealth = () => useContext(HealthContext);

export const HealthProvider = ({ children }) => {
  const { faceResults } = useWebcam();

  const [metrics, setMetrics] = useState({ blinkRate: 14, distance: 45, screenTime: 0 });
  const [status, setStatus] = useState({ isFatigued: false, needsBreak: false, skipCount: 0 });
  const [session, setSession] = useState({ startTime: new Date(), lastBreak: new Date() });

  // References to compute blink mechanics reliably over time
  const isCurrentlyBlinkingRef = useRef(false);
  const totalBlinksRef = useRef(0);
  
  // Timer for screen time (running sum in seconds)
  const secondsElapsedRef = useRef(0);
  
  // High-frequency processing loop driven by React Effect matching Video framerate updates
  useEffect(() => {
    if (!faceResults || !faceResults.multiFaceLandmarks || faceResults.multiFaceLandmarks.length === 0) {
      return; 
    }

    const landmarks = faceResults.multiFaceLandmarks[0];

    // Compute metrics
    const currentDistance = getScreenDistance(landmarks);
    const isEyesClosed = getBlinkStatus(landmarks);

    // Register a full blink if state changes open -> closed
    if (isEyesClosed && !isCurrentlyBlinkingRef.current) {
      isCurrentlyBlinkingRef.current = true;
      totalBlinksRef.current += 1;
    } else if (!isEyesClosed && isCurrentlyBlinkingRef.current) {
      isCurrentlyBlinkingRef.current = false;
    }

    setMetrics(prev => {
      // Moderate smoothing window for responsive distance
      const smoothedDistance = Math.round((prev.distance * 0.85) + (currentDistance * 0.15));
      
      return {
        ...prev,
        distance: Math.min(Math.max(smoothedDistance, 15), 100)
      };
    });
  }, [faceResults]);

  // Slower update loop (1 second ticks)
  useEffect(() => {
    const ticker = setInterval(() => {
      secondsElapsedRef.current += 1;
      const minutes = parseFloat((secondsElapsedRef.current / 60).toFixed(1));
      
      const sessionDurationMins = Math.max(minutes, 0.1);
      // Calculate Blinks per minute
      const currentBlinkRate = Math.round(totalBlinksRef.current / sessionDurationMins);

      setMetrics(prev => ({
        ...prev,
        screenTime: minutes,
        blinkRate: currentBlinkRate
      }));

    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  // Periodic heartbeat to Backend
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      try {
        await fetch('http://localhost:3001/api/v1/health-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metrics, status, session })
        });
      } catch (error) {
        console.warn('Backend not reachable', error.message);
      }
    }, 10000); 

    return () => clearInterval(syncInterval);
  }, [metrics, status, session]);

  return (
    <HealthContext.Provider value={{ metrics, setMetrics, status, setStatus, session, setSession }}>
      {children}
    </HealthContext.Provider>
  );
};
