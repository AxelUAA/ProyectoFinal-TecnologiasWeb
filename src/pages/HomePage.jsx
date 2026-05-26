import { Link } from 'react-router-dom'
import { useCV } from '../context/CVContext'

export default function HomePage() {
  const { personalInfo, skills } = useCV()
  const hasData = personalInfo.nombre || skills.length > 0

  return (
    <>
      <style>{css}</style>
      <div className="home-page">
        <div className="home-hero">
          <h1 className="home-title">CV Builder</h1>
          <p className="home-subtitle">
            Crea tu currículum vitae de forma rápida y sencilla. Completa tu
            información, visualiza el resultado y expórtalo cuando estés listo.
          </p>
          <div className="home-actions">
            <Link to="/editor" className="home-btn-primary">
              {hasData ? 'Continuar editando' : 'Empezar ahora'}
            </Link>
            {hasData && (
              <Link to="/preview" className="home-btn-secondary">
                Ver vista previa
              </Link>
            )}
          </div>
        </div>

        <div className="home-cards">
          <div className="home-card">
            <span className="home-card-icon">✏️</span>
            <h2>Editor</h2>
            <p>Ingresa tus datos personales, habilidades, experiencia y más.</p>
            <Link to="/editor" className="home-card-link">Ir al editor →</Link>
          </div>
          <div className="home-card">
            <span className="home-card-icon">👁️</span>
            <h2>Vista previa</h2>
            <p>Visualiza cómo quedará tu CV antes de exportarlo.</p>
            <Link to="/preview" className="home-card-link">Ver preview →</Link>
          </div>
          <div className="home-card">
            <span className="home-card-icon">📊</span>
            <h2>Dashboard</h2>
            <p>Revisa un resumen visual de tus habilidades y datos.</p>
            <Link to="/dashboard" className="home-card-link">Ver dashboard →</Link>
          </div>
        </div>
      </div>
    </>
  )
}

const css = `
.home-page {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  text-align: left;
}

.home-hero {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem 0 1rem;
}

.home-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0;
  letter-spacing: -1px;
}

.home-subtitle {
  font-size: 1.05rem;
  color: var(--text);
  max-width: 560px;
  line-height: 1.6;
}

.home-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.home-btn-primary {
  background: var(--btn-bg);
  color: var(--btn-text);
  text-decoration: none;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.2s;
}
.home-btn-primary:hover { background: var(--btn-hover); }

.home-btn-secondary {
  background: transparent;
  color: var(--text-h);
  text-decoration: none;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid var(--input-border);
  transition: border-color 0.2s;
}
.home-btn-secondary:hover { border-color: var(--text-h); }

.home-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .home-cards { grid-template-columns: 1fr; }
  .home-title { font-size: 2rem; }
}

.home-card {
  background: var(--form-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.home-card-icon { font-size: 1.5rem; }

.home-card h2 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0;
}

.home-card p {
  font-size: 0.875rem;
  color: var(--text);
  line-height: 1.5;
  flex: 1;
}

.home-card-link {
  font-size: 0.85rem;
  color: var(--cat-text);
  text-decoration: none;
  font-weight: 600;
  margin-top: 0.25rem;
}
.home-card-link:hover { text-decoration: underline; }
`
