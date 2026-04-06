import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WebcamProvider } from './contexts/WebcamContext.jsx'
import { HealthProvider } from './contexts/HealthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebcamProvider>
      <HealthProvider>
        <App />
      </HealthProvider>
    </WebcamProvider>
  </StrictMode>,
)
