import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <span className="nav-brand">CV Builder</span>
      <ul className="nav-links">
        <li><NavLink to="/" end>Datos Personales</NavLink></li>
        <li><NavLink to="/habilidades">Habilidades</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/preview">Vista Previa</NavLink></li>
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
