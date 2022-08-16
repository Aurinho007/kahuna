import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/index.css'
import UserProvider from './contexts/UserContext';
import NotifyProvider from './contexts/NotifyContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <NotifyProvider>
      <App />
    </NotifyProvider>
  </UserProvider>
)
