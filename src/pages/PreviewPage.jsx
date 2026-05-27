import { useCV } from '../context/CVContext'

const Ico = ({ children, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const IconFile = () => (
  <Ico>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </Ico>
)

export default function PreviewPage() {
  const { personalInfo, skills } = useCV()
  const hasData = personalInfo.nombre || skills.length > 0

  return (
    <>
      <style>{css}</style>
      <div className="pv-root">
        <header className="pv-header">
          <h1 className="pv-title">Vista Previa</h1>
          <p className="pv-sub">Asi lucira tu CV al exportarlo.</p>
        </header>

        {hasData ? (
          <div className="pv-document" aria-label="Vista previa del CV">
            <div className="pv-doc-header">
              <div className="pv-doc-avatar" aria-hidden="true">
                {personalInfo.foto
                  ? <img src={personalInfo.foto} alt="" />
                  : <span>{(personalInfo.nombre || 'C').charAt(0).toUpperCase()}</span>
                }
              </div>
              <div className="pv-doc-identity">
                <h2 className="pv-doc-name">{personalInfo.nombre || 'Tu nombre'}</h2>
                {personalInfo.profesion && (
                  <p className="pv-doc-role">{personalInfo.profesion}</p>
                )}
                <div className="pv-doc-contact">
                  {personalInfo.email    && <span>{personalInfo.email}</span>}
                  {personalInfo.telefono && <span>{personalInfo.telefono}</span>}
                  {personalInfo.ciudad   && <span>{personalInfo.ciudad}</span>}
                </div>
              </div>
            </div>

            {personalInfo.descripcion && (
              <section className="pv-doc-section">
                <h3 className="pv-doc-section-title">Perfil profesional</h3>
                <p className="pv-doc-text">{personalInfo.descripcion}</p>
              </section>
            )}

            {skills.length > 0 && (
              <section className="pv-doc-section">
                <h3 className="pv-doc-section-title">Habilidades</h3>
                <div className="pv-skills-grid">
                  {skills.map(s => (
                    <div key={s.id} className="pv-skill-row">
                      <div className="pv-skill-meta">
                        <span className="pv-skill-name">{s.nombre}</span>
                        <span className="pv-skill-pct">{s.nivel}%</span>
                      </div>
                      <div className="pv-skill-bar-bg">
                        <div className="pv-skill-bar" style={{ width: `${s.nivel}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="pv-coming-soon">
              <span>Exportacion a PDF — proximamente</span>
            </div>
          </div>
        ) : (
          <div className="pv-empty">
            <div className="pv-empty-icon"><IconFile /></div>
            <h2 className="pv-empty-title">Tu CV esta vacio</h2>
            <p className="pv-empty-body">
              Completa tus datos en el Editor para ver la vista previa aqui.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

const css = `
.pv-root { max-width: 820px; margin: 0 auto; padding-bottom: 4rem; }

.pv-header {
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.pv-title { font-size: 1.5rem; font-weight: 700; color: var(--text-h); margin-bottom: 0.3rem; }
.pv-sub { font-size: 0.875rem; color: var(--text); }

.pv-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 1rem; padding: 5rem 2rem; text-align: center;
  border: 1px dashed var(--border); border-radius: 16px;
  background: var(--form-bg);
}
.pv-empty-icon { color: var(--accent); opacity: 0.45; }
.pv-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text-h); }
.pv-empty-body { font-size: 0.875rem; color: var(--text); max-width: 300px; }

.pv-document {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.pv-doc-header {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 2rem 2rem 1.5rem;
  background: var(--accent-subtle);
  border-bottom: 1px solid var(--accent-border);
}
.pv-doc-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--accent); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.75rem; font-weight: 700;
  flex-shrink: 0; overflow: hidden; letter-spacing: -0.02em;
}
.pv-doc-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pv-doc-identity { display: flex; flex-direction: column; gap: 0.3rem; }
.pv-doc-name {
  font-size: 1.4rem; font-weight: 700;
  color: var(--text-h); letter-spacing: -0.02em;
}
.pv-doc-role { font-size: 0.9rem; color: var(--accent); font-weight: 500; }
.pv-doc-contact { display: flex; flex-wrap: wrap; gap: 0.3rem 1rem; margin-top: 0.25rem; }
.pv-doc-contact span { font-size: 0.78rem; color: var(--text); font-weight: 500; }

.pv-doc-section {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 0.875rem;
}
.pv-doc-section-title {
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.09em; text-transform: uppercase;
  color: var(--accent); margin: 0;
}
.pv-doc-text { font-size: 0.875rem; color: var(--text); line-height: 1.65; }

.pv-skills-grid { display: flex; flex-direction: column; gap: 0.7rem; }
.pv-skill-row { display: flex; flex-direction: column; gap: 0.3rem; }
.pv-skill-meta { display: flex; justify-content: space-between; align-items: center; }
.pv-skill-name { font-size: 0.85rem; font-weight: 600; color: var(--text-h); }
.pv-skill-pct { font-size: 0.78rem; font-weight: 700; color: var(--accent); }
.pv-skill-bar-bg { height: 5px; background: var(--bar-bg); border-radius: 999px; overflow: hidden; }
.pv-skill-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent) 0%, #5b21b6 100%);
  border-radius: 999px; transition: width 0.5s ease;
}

.pv-coming-soon {
  padding: 1rem 2rem; text-align: center;
  font-size: 0.78rem; color: var(--muted); font-weight: 500;
  letter-spacing: 0.02em; border-top: 1px solid var(--border);
}

@media (max-width: 480px) {
  .pv-doc-header { flex-direction: column; align-items: flex-start; padding: 1.25rem; }
  .pv-doc-section { padding: 1.25rem; }
}
`
