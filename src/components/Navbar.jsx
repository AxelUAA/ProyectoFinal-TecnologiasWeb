import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const Ico = ({ children, size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const IconEdit  = () => <Ico><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Ico>
const IconEye   = () => <Ico><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Ico>
const IconChart = () => <Ico><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Ico>
const IconInfo  = () => <Ico><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></Ico>
const IconSun   = () => <Ico size={16}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></Ico>
const IconMoon  = () => <Ico size={16}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Ico>

const BrandMark = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <line x1="8" y1="8" x2="16" y2="8"/>
    <line x1="8" y1="12" x2="13" y2="12"/>
    <line x1="8" y1="16" x2="11" y2="16"/>
  </svg>
)

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <nav className="navbar" role="navigation" aria-label="Navegacion principal">
      <NavLink to="/" className="nav-brand" end aria-label="CV Builder — Inicio">
        <span className="nav-brand-icon" aria-hidden="true">
          <BrandMark />
        </span>
        <span>CV Builder</span>
      </NavLink>

      <ul className="nav-links" role="list">
        <li><NavLink to="/editor"><IconEdit /><span>Editor</span></NavLink></li>
        <li><NavLink to="/preview"><IconEye /><span>Vista Previa</span></NavLink></li>
        <li><NavLink to="/dashboard"><IconChart /><span>Dashboard</span></NavLink></li>
        <li><NavLink to="/about"><IconInfo /><span>Acerca de</span></NavLink></li>
      </ul>

      <div className="nav-right">
        <button
          className="nav-theme-btn"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={darkMode ? 'Modo claro' : 'Modo oscuro'}
        >
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </nav>
  )
}
