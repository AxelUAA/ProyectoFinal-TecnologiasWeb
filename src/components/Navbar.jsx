import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand" end>CV Builder</NavLink>
      <ul className="nav-links">
        <li><NavLink to="/editor">Editor</NavLink></li>
        <li><NavLink to="/preview">Vista Previa</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/about">Acerca de</NavLink></li>
      </ul>
      <div className="nav-right">
        <button
          className="nav-theme-btn"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={darkMode ? 'Modo claro' : 'Modo oscuro'}
        >
          {darkMode ? '☀' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
