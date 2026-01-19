import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import './NavBar.css';

function NavBar(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  const navItems = [
    { path: '/', icon: 'home', label: 'Главная' },
    { path: '/analiz', icon: 'nutrition', label: 'Питание' },
    { path: '/forum', icon: 'forum', label: 'Форум' },
  ];

  return (
    <nav 
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-content">
        {/* Logo */}
        <Link to="/" className="sidebar-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {isExpanded && <span className="logo-text">GYMBROS</span>}
        </Link>

        {/* Navigation Items */}
        <div className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              title={item.label}
            >
              {item.icon === 'home' && (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )}
              {item.icon === 'nutrition' && (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )}
              {item.icon === 'forum' && (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              )}
              {isExpanded && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="sidebar-auth">
          <Link to="/register" className="auth-btn" title="Регистрация">
            <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            {isExpanded && <span className="auth-label">Регистрация</span>}
          </Link>
          <Link to="/login" className="auth-btn" title="Войти">
            <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            {isExpanded && <span className="auth-label">Войти</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
