import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import LoginPage from './pages/LoginPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import ChatListPage from './pages/ChatListPage.jsx'
import Navigation from './components/Navigation.jsx'
import './styles/globals.css'
import RegisterPage from './pages/RegisterPage.jsx'
import PostCreatePage from './pages/PostCreatePage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import PostUpdatePage from './pages/PostUpdatePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

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
            <Route 
              path="/register" 
              element={<RegisterPage />} 
            /> 
            <Route path="/post/new" element={<PostCreatePage />} />
            <Route path="/post/:postId" element={<PostDetailPage />}/>
            <Route path="/post/edit/:postId" element={<PostUpdatePage />}/>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/profile" element={<ProfilePage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App