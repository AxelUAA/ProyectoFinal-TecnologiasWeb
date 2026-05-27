import { Link } from 'react-router-dom'
import { useCV } from '../context/CVContext'

/* ─── Inline SVG icons ──────────────────────────────────────── */
const Ico = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const IconPencil = () => <Ico><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Ico>
const IconEye   = () => <Ico><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Ico>
const IconChart = () => <Ico><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Ico>
const IconArrow = () => <Ico size={15}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Ico>
const IconCheck = () => <Ico size={14}><polyline points="20 6 9 17 4 12"/></Ico>

const FEATURES = [
  {
    icon: <IconPencil />,
    title: 'Editor',
    desc: 'Completa tu perfil, habilidades y datos de contacto en un formulario limpio y guiado.',
    to: '/editor',
    label: 'Ir al editor',
  },
  {
    icon: <IconEye />,
    title: 'Vista previa',
    desc: 'Visualiza tu CV terminado antes de exportarlo. Lo que ves es exactamente lo que obtienes.',
    to: '/preview',
    label: 'Ver preview',
  },
  {
    icon: <IconChart />,
    title: 'Dashboard',
    desc: 'Un resumen visual de tus habilidades que te ayuda a identificar áreas de mejora.',
    to: '/dashboard',
    label: 'Ver dashboard',
  },
]

const PERKS = [
  'Sin registro — datos solo en tu navegador',
  'Exporta a PDF con un clic',
  'Modo claro y oscuro',
  'Diseño limpio y profesional',
]

export default function HomePage() {
  const { personalInfo, skills } = useCV()
  const hasData = personalInfo.nombre || skills.length > 0

  return (
    <>
      <style>{css}</style>
      <div className="hp-root">

        {/* Hero */}
        <section className="hp-hero">
          <div className="hp-eyebrow">
            <span className="hp-badge">CV Builder</span>
          </div>

          <h1 className="hp-title">
            Tu currículum,<br />
            <span className="hp-title-em">diseñado para destacar</span>
          </h1>

          <p className="hp-sub">
            Crea un CV profesional en minutos. Sin registros, sin plantillas
            rígidas.
          </p>

          <div className="hp-actions">
            <Link to="/editor" className="hp-btn-primary">
              {hasData ? 'Continuar editando' : 'Empezar ahora'}
            </Link>
            {hasData && (
              <Link to="/preview" className="hp-btn-ghost">
                Ver mi CV
              </Link>
            )}
          </div>

          <ul className="hp-perks" aria-label="Ventajas incluidas">
            {PERKS.map(p => (
              <li key={p} className="hp-perk">
                <span className="hp-perk-check" aria-hidden="true"><IconCheck /></span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Section divider */}
        <div className="hp-divider" aria-hidden="true">
          <span>Todo lo que necesitas</span>
        </div>

        {/* Feature cards */}
        <section className="hp-cards" aria-label="Secciones principales">
          {FEATURES.map(f => (
            <article key={f.to} className="hp-card">
              <div className="hp-card-icon" aria-hidden="true">{f.icon}</div>
              <h2 className="hp-card-title">{f.title}</h2>
              <p className="hp-card-desc">{f.desc}</p>
              <Link to={f.to} className="hp-card-link">
                {f.label}
                <span className="hp-card-arrow" aria-hidden="true"><IconArrow /></span>
              </Link>
            </article>
          ))}
        </section>

      </div>
    </>
  )
}

const css = `
.hp-root {
  max-width: 820px;
  margin: 0 auto;
  padding-bottom: 4rem;
}

/* ── Hero ────────────────────────────── */
.hp-hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 3.5rem 0 2.5rem;
}

.hp-eyebrow { display: flex; align-items: center; }

.hp-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}

.hp-title {
  font-size: clamp(2rem, 5vw, 2.9rem);
  font-weight: 700;
  color: var(--text-h);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
}

.hp-title-em {
  color: var(--accent);
}

.hp-sub {
  font-size: 1rem;
  color: var(--text);
  max-width: 500px;
  line-height: 1.65;
}

/* Buttons */
.hp-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hp-btn-primary {
  display: inline-flex;
  align-items: center;
  background: var(--accent);
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  box-shadow: 0 2px 10px var(--accent-glow);
  transition: background 0.18s, transform 0.15s, box-shadow 0.15s;
}
.hp-btn-primary:hover {
  background: var(--btn-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px var(--accent-glow);
  text-decoration: none;
}

.hp-btn-ghost {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--text-h);
  text-decoration: none;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid var(--border);
  transition: border-color 0.18s, background 0.18s;
}
.hp-btn-ghost:hover {
  border-color: var(--input-border);
  background: var(--surface-sunken);
  text-decoration: none;
}

/* Perks */
.hp-perks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.hp-perk {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 500;
}
.hp-perk-check {
  display: flex;
  align-items: center;
  color: var(--accent);
}

/* ── Divider label ───────────────────── */
.hp-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 1.75rem;
  color: var(--muted);
}
.hp-divider::before,
.hp-divider::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--border);
}
.hp-divider span {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ── Feature cards ───────────────────── */
.hp-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.hp-card {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  text-align: left;
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
}
.hp-card:hover {
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.hp-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--accent-subtle);
  color: var(--accent);
  flex-shrink: 0;
}

.hp-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0;
}

.hp-card-desc {
  font-size: 0.85rem;
  color: var(--text);
  line-height: 1.55;
  flex: 1;
}

.hp-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  margin-top: 0.25rem;
  transition: gap 0.18s;
}
.hp-card-link:hover { gap: 0.5rem; text-decoration: none; }

.hp-card-arrow {
  display: flex;
  align-items: center;
  transition: transform 0.18s;
}
.hp-card-link:hover .hp-card-arrow { transform: translateX(3px); }

/* ── Responsive ──────────────────────── */
@media (max-width: 680px) {
  .hp-hero { padding: 2rem 0 1.5rem; }
  .hp-title { font-size: 1.85rem; }
  .hp-cards { grid-template-columns: 1fr; }
}
@media (min-width: 481px) and (max-width: 680px) {
  .hp-cards { grid-template-columns: 1fr 1fr; }
}
`
