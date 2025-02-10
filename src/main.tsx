import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { JobProvider } from './context/JobContext.tsx'


createRoot(document.getElementById('root')!).render(
  <JobProvider>
     <StrictMode>
    <App />
  </StrictMode>

  </JobProvider>
 
)
