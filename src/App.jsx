import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import ChatPage from './pages/ChatPage'
import ChatListPage from './pages/ChatListPage'
import Navigation from './components/Navigation'
import './styles/globals.css'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navigation />}
        
        <main className={`${isAuthenticated ? 'pt-16' : ''}`}>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/chat" 
              element={
                isAuthenticated ? <ChatListPage /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/chat/:roomId" 
              element={
                isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App