import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.tsx'
import { DemoAuthProvider } from './context/DemoAuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DemoAuthProvider>
        <App />
      </DemoAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
