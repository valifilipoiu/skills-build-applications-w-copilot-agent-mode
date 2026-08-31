import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

if (!import.meta.env.VITE_CODESPACE_NAME) {
  console.info('VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000 for API calls.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
