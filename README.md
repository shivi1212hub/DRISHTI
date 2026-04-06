# DRISHTI 👁️
Drishti AI is a real-time digital wellness application designed to reduce computer vision syndrome . Using browser-based computer vision and facial tracking, it monitors a user's blinking rate and distance from the screen, then provides personalized suggestions such as the 20-20-20 rule to encourage healthier viewing habits.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-00B2A0?style=for-the-badge&logo=google&logoColor=white)](https://mediapipe.dev/)

## 🌟 Key Features

*   **Real-time Blink Tracking:** Uses Google's MediaPipe FaceMesh to calculate Eye Aspect Ratio (EAR) at 30+ FPS, determining if your blinking cadence drops below healthy thresholds during deep focus.
*   **Distance Estimation:** Sophisticated mathematical heuristics track the Pythagorean diagonal volume of your face to measure exactly how many centimeters away you are sitting from your screen.
*   **Translucent Sanctuary UI:** A beautiful, responsive, clinical dark-mode user interface mapped from high-fidelity Google Stitch designs.
*   **Encrypted Clinical Profiles:** Personalized user data forms seamlessly integrated with visual performance insights.
*   **AI Insight Coaching:** Contextual, dynamic notifications like the "20-20-20 Rule" are triggered automatically when erratic or strained ocular behaviors are detected.

## 🛠️ Project Architecture

This application operates as a Monorepo:

### `frontend/`
Bootstrapped with Vite and React.
*   **`/contexts`**: Contains `WebcamContext.jsx` (mounts the invisible `window.Camera` and streams `faceMesh` data) alongside `HealthContext.jsx` (which crunches raw landmarks using exponential moving averages).
*   **`/views`**: React conversions of the static Stitch dashboard components (Onboarding, Clinical Insights, and Clinical Profile).
*   **`/utils`**: Pure mathematical heuristics (Euclidean metrics) for `eyeTracking.js`.

### `backend/`
A lightweight Node.js/Express environment set up for MongoDB integration to store biometric session logs and analytical trends securely.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   NPM or Yarn
*   A functional webcam

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/I-U-5-H/Drishti-hack-matrix.git
   cd drishti
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Start the Backend:**
   ```bash
   cd ../backend
   npm install
   npm start
   ```

## 🔒 Privacy & Data Design
Drishti AI processes all facial landmarks strictly within the local client's browser layer. Raw video streams are **never** transmitted over the network; only distilled biometric metrics (blink counts, timestamps, and distance numbers) interact with the broader ecosystem.
