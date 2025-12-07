import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { MessageCircle, Home, MessageSquare, LogOut, User } from 'lucide-react'

const Navigation = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleGoProfile = () => {
    navigate('/profile')
  }

  const navLinks = [
    {
      to: '/',
      icon: Home,
      label: '홈'
    },
    {
      to: '/chat',
      icon: MessageSquare,
      label: '채팅'
    }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Citiz</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{link.label}</span>
                </NavLink>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleGoProfile}
              className="flex items-center space-x-3 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
            >
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff`}
                alt={user?.username}
                className="h-8 w-8 rounded-full"
              />
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 py-3 space-y-1">
          {navLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <IconComponent className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation