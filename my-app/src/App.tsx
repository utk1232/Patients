import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/header'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Register from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<><Header /><Dashboard /></>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;