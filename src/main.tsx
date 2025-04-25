import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerSW({
  onNeedRefresh() {
    console.log('New content available. Please refresh.');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});
