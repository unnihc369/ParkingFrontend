import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ParkingLotProvider } from './context/ParkingLotContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ParkingLotProvider>
      <App />
      </ParkingLotProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
