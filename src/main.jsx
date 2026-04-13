import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('Mounting KAFM Origin...');
const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found!');
} else {
  // Removed StrictMode to prevent Three.js context-loss during double-mounts
  ReactDOM.createRoot(root).render(<App />)
}
