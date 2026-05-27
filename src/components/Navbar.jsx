import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

/* ── SVG helpers ─────────────────────────────────────────── */
const Ico = ({ children, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const IconEdit  = () => <Ico><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Ico>
const IconEye   = () => <Ico><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Ico>
const IconChart = () => <Ico><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Ico>
const IconInfo  = () => <Ico><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></Ico>
const IconSun   = () => <Ico size={16}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></Ico>
const IconMoon  = () => <Ico size={16}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Ico>
const IconMenu  = () => <Ico size={20}><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Ico>
const IconClose = () => <Ico size={20}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Ico>

const BrandMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <line x1="8" y1="8"  x2="16" y2="8"/>
    <line x1="8" y1="12" x2="13" y2="12"/>
    <line x1="8" y1="16" x2="11" y2="16"/>
  </svg>
)

const NAV_ITEMS = [
  { to: '/editor',    label: 'Editor',      icon: <IconEdit /> },
  { to: '/preview',   label: 'Vista Previa', icon: <IconEye /> },
  { to: '/dashboard', label: 'Dashboard',   icon: <IconChart /> },
  { to: '/about',     label: 'Acerca de',   icon: <IconInfo /> },
]

/* ── Component ───────────────────────────────────────────── */
export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  // Cierra el menú al cambiar de ruta
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Bloquea scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{css}</style>
      <header className="nb-header" ref={menuRef}>
        <nav className="nb-inner" aria-label="Navegación principal">

          {/* Brand */}
          <NavLink to="/" className="nb-brand" end aria-label="CV Builder — Inicio">
            <span className="nb-brand-icon" aria-hidden="true"><BrandMark /></span>
            <span className="nb-brand-name">CV Builder</span>
          </NavLink>

          {/* Desktop links */}
          <ul className="nb-links" role="list">
            {NAV_ITEMS.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => isActive ? 'nb-link nb-link--active' : 'nb-link'}>
                  {icon}
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="nb-right">
            <button
              className="nb-theme-btn"
              onClick={toggleTheme}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <IconSun /> : <IconMoon />}
            </button>

            {/* Hamburger — solo visible en móvil */}
            <button
              className="nb-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="nb-mobile-menu"
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          id="nb-mobile-menu"
          className={`nb-drawer ${menuOpen ? 'nb-drawer--open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <ul role="list">
            {NAV_ITEMS.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => isActive ? 'nb-drawer-link nb-drawer-link--active' : 'nb-drawer-link'}
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Overlay oscuro detrás del drawer */}
      {menuOpen && (
        <div className="nb-overlay" aria-hidden="true" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}

/* ── Styles ──────────────────────────────────────────────── */
const css = `
/* Saca el header del flujo del #root para que sea full-width */
.nb-header {
  position: sticky;
  top: 0;
  z-index: 200;
  /* Rompe el contenedor del #root */
  width: 100vw;
  margin-left: calc(-1 * (100vw - 100%) / 2);
  background: var(--nav-bg);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.nb-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 56px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Brand */
.nb-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: 0.5rem;
}
.nb-brand:hover { text-decoration: none; }

.nb-brand-icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.nb-brand-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

/* Desktop nav links */
.nb-links {
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}

.nb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--nav-text);
  text-decoration: none;
  font-size: 0.825rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 0.18s, color 0.18s;
  white-space: nowrap;
}
.nb-link:hover { background: var(--nav-hover-bg); color: #fff; text-decoration: none; }
.nb-link--active { background: var(--nav-active-bg); color: var(--nav-active-text); }
.nb-link svg { flex-shrink: 0; opacity: 0.8; }
.nb-link--active svg { opacity: 1; }

/* Right controls */
.nb-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: auto;
}

.nb-theme-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: var(--nav-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
  flex-shrink: 0;
}
.nb-theme-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
}

/* Hamburger button — oculto en desktop */
.nb-hamburger {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: var(--nav-text);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s;
  flex-shrink: 0;
}
.nb-hamburger:hover { background: rgba(255,255,255,0.1); color: #fff; }

/* Mobile drawer */
.nb-drawer {
  display: none;
  flex-direction: column;
  background: var(--nav-bg);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 0.75rem 1rem 1rem;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 199;
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
}
.nb-drawer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nb-drawer-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--nav-text);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.18s, color 0.18s;
}
.nb-drawer-link:hover { background: var(--nav-hover-bg); color: #fff; text-decoration: none; }
.nb-drawer-link--active { background: var(--nav-active-bg); color: var(--nav-active-text); }
.nb-drawer-link svg { flex-shrink: 0; }

/* Overlay */
.nb-overlay {
  position: fixed;
  inset: 0;
  z-index: 198;
  background: rgba(0,0,0,0.45);
}

/* ── Responsive breakpoint ── */
@media (max-width: 640px) {
  .nb-links { display: none; }
  .nb-hamburger { display: flex; }
  .nb-drawer--open { display: flex; }
  .nb-brand-name { display: block; } /* siempre visible */
}
`
