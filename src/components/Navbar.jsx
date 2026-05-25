import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="nav-brand">CV Builder</span>
      <ul className="nav-links">
        <li><NavLink to="/" end>Datos Personales</NavLink></li>
        <li><NavLink to="/habilidades">Habilidades</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/preview">Vista Previa</NavLink></li>
      </ul>
    </nav>
  )
}
