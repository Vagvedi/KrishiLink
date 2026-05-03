import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Suppress browser extension communication errors
window.addEventListener('error', (event) => {
  if (event.message.includes('listener indicated an asynchronous response by returning true, but the message channel closed')) {
    event.preventDefault()
    console.warn('Suppressed browser extension communication error')
    return false
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
