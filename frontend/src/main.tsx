import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CurrentThemeProvider from './contexts/themeCtx'
import CurrentUserProvider from './contexts/userCtx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CurrentUserProvider>
    <CurrentThemeProvider>
      <App />
    </CurrentThemeProvider>
  </CurrentUserProvider>
)
