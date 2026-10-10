import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/fonts.css'
import './index.css'
import './App.css'
import './styles/interactions.css'
import './styles/home.css'
import './styles/localization.css'

const root = document.getElementById('root')!
if (
  root.hasChildNodes() &&
  root.dataset.route === (window.location.pathname.replace(/\/$/, '') || '/')
)
  hydrateRoot(
    root,
    <StrictMode>
      <App />
    </StrictMode>
  )
else
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
