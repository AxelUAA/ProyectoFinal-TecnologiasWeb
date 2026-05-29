import { useRef, useState } from 'react'
import { useCV } from '../context/CVContext'
import { generatePDF } from '../utils/pdfGenerator'

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

const IconDownload = () => (
  <Ico size={16}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </Ico>
)

const IconLink = () => (
  <Ico size={13}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </Ico>
)

export default function PreviewPage() {
  const { personalInfo, skills, proyectos, educacion, experiencia } = useCV()
  const [exporting, setExporting] = useState(false)
  const hasData = personalInfo.nombre || skills.length > 0

  const handleExport = async () => {
    setExporting(true)
    try {
      await generatePDF('cv-preview-document', `CV-${personalInfo.nombre || 'DevProfile'}.pdf`)
    } finally {
      setExporting(false)
    }
  }

  const enlaces = [
    personalInfo.linkedin && { label: 'LinkedIn', url: personalInfo.linkedin },
    personalInfo.github   && { label: 'GitHub',   url: personalInfo.github },
    personalInfo.portfolio && { label: 'Portfolio', url: personalInfo.portfolio },
  ].filter(Boolean)

  return (
    <>
      <style>{css}</style>
      <div className="pv-root">
        <header className="pv-header">
          <div className="pv-header-left">
            <h1 className="pv-title">Vista Previa</h1>
            <p className="pv-sub">Asi lucira tu CV al exportarlo.</p>
          </div>
          {hasData && (
            <button
              className={`pv-export-btn ${exporting ? 'pv-export-btn--loading' : ''}`}
              onClick={handleExport}
              disabled={exporting}
            >
              <IconDownload />
              {exporting ? 'Generando PDF...' : 'Exportar PDF'}
            </button>
          )}
        </header>

        {hasData ? (
          <div id="cv-preview-document" className="pv-document" aria-label="Vista previa del CV">

            {/* ── Encabezado ─────────────────────────────── */}
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

            {/* ── Perfil profesional ─────────────────────── */}
            {personalInfo.descripcion && (
              <section className="pv-doc-section">
                <h3 className="pv-doc-section-title">Perfil profesional</h3>
                <p className="pv-doc-text">{personalInfo.descripcion}</p>
              </section>
            )}

            {/* ── Habilidades ────────────────────────────── */}
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
                      {s.categoria && <span className="pv-skill-cat">{s.categoria}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Proyectos ──────────────────────────────── */}
            {proyectos.length > 0 && (
              <section className="pv-doc-section">
                <h3 className="pv-doc-section-title">Proyectos</h3>
                <div className="pv-list">
                  {proyectos.map(p => (
                    <div key={p.id} className="pv-item">
                      <div className="pv-item-header">
                        <span className="pv-item-title">{p.nombre}</span>
                      </div>
                      <div className="pv-item-urls">
                        {p.repositorio && (
                          <div className="pv-url-row">
                            <span className="pv-url-label"><IconLink /> Repositorio:</span>
                            <a href={p.repositorio} target="_blank" rel="noreferrer" className="pv-enlace-url">{p.repositorio}</a>
                          </div>
                        )}
                        {p.deploy && (
                          <div className="pv-url-row">
                            <span className="pv-url-label"><IconLink /> Demo:</span>
                            <a href={p.deploy} target="_blank" rel="noreferrer" className="pv-enlace-url">{p.deploy}</a>
                          </div>
                        )}
                      </div>
                      {p.descripcion && <p className="pv-item-desc">{p.descripcion}</p>}
                      {p.tecnologias && (
                        <div className="pv-tags">
                          {p.tecnologias.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                            <span key={t} className="pv-tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Educacion ──────────────────────────────── */}
            {educacion.length > 0 && (
              <section className="pv-doc-section">
                <h3 className="pv-doc-section-title">Educacion</h3>
                <div className="pv-list">
                  {educacion.map(e => (
                    <div key={e.id} className="pv-item">
                      <div className="pv-item-header">
                        <span className="pv-item-title">{e.programa}</span>
                        {e.periodo && <span className="pv-item-period">{e.periodo}</span>}
                      </div>
                      {e.institucion && <span className="pv-item-sub">{e.institucion}</span>}
                      {e.descripcion && <p className="pv-item-desc">{e.descripcion}</p>}
                      {e.enlace && (
                        <div className="pv-url-row">
                          <span className="pv-url-label"><IconLink /> Certificado:</span>
                          <a href={e.enlace} target="_blank" rel="noreferrer" className="pv-enlace-url">{e.enlace}</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Experiencia ────────────────────────────── */}
            {experiencia.length > 0 && (
              <section className="pv-doc-section">
                <h3 className="pv-doc-section-title">Experiencia</h3>
                <div className="pv-list">
                  {experiencia.map(e => (
                    <div key={e.id} className="pv-item">
                      <div className="pv-item-header">
                        <span className="pv-item-title">{e.puesto}</span>
                        {e.periodo && <span className="pv-item-period">{e.periodo}</span>}
                      </div>
                      {e.empresa && <span className="pv-item-sub">{e.empresa}</span>}
                      {e.descripcion && <p className="pv-item-desc">{e.descripcion}</p>}
                      {e.tecnologias && (
                        <div className="pv-tags">
                          {e.tecnologias.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                            <span key={t} className="pv-tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Enlaces profesionales ──────────────────── */}
            {enlaces.length > 0 && (
              <section className="pv-doc-section pv-doc-section--last">
                <h3 className="pv-doc-section-title">Enlaces profesionales</h3>
                <div className="pv-enlaces">
                  {enlaces.map(e => (
                    <div key={e.label} className="pv-enlace-item">
                      <span className="pv-enlace-label"><IconLink /> {e.label}</span>
                      <a href={e.url} target="_blank" rel="noreferrer" className="pv-enlace-url">
                        {e.url}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

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
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.pv-header-left { display: flex; flex-direction: column; gap: 0.2rem; }
.pv-title { font-size: 1.5rem; font-weight: 700; color: var(--text-h); margin: 0; }
.pv-sub { font-size: 0.875rem; color: var(--text); margin: 0; }

.pv-export-btn {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.55rem 1.2rem;
  background: var(--btn-bg); color: var(--btn-text);
  border: none; border-radius: 8px;
  font-size: 0.875rem; font-weight: 600; cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  white-space: nowrap;
}
.pv-export-btn:hover:not(:disabled) { background: var(--btn-hover); }
.pv-export-btn--loading { opacity: 0.7; cursor: not-allowed; }

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

/* Header */
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
.pv-doc-name { font-size: 1.4rem; font-weight: 700; color: var(--text-h); letter-spacing: -0.02em; margin: 0; }
.pv-doc-role { font-size: 0.9rem; color: var(--accent); font-weight: 500; margin: 0; }
.pv-doc-contact { display: flex; flex-wrap: wrap; gap: 0.3rem 1rem; margin-top: 0.25rem; }
.pv-doc-contact span { font-size: 0.78rem; color: var(--text); font-weight: 500; }

/* Sections */
.pv-doc-section {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 0.875rem;
}
.pv-doc-section--last { border-bottom: none; }
.pv-doc-section-title {
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.09em; text-transform: uppercase;
  color: var(--accent); margin: 0;
}
.pv-doc-text { font-size: 0.875rem; color: var(--text); line-height: 1.65; margin: 0; }

/* Skills */
.pv-skills-grid { display: flex; flex-direction: column; gap: 0.7rem; }
.pv-skill-row { display: flex; flex-direction: column; gap: 0.25rem; }
.pv-skill-meta { display: flex; justify-content: space-between; align-items: center; }
.pv-skill-name { font-size: 0.85rem; font-weight: 600; color: var(--text-h); }
.pv-skill-pct { font-size: 0.78rem; font-weight: 700; color: var(--accent); }
.pv-skill-bar-bg { height: 5px; background: var(--bar-bg); border-radius: 999px; overflow: hidden; }
.pv-skill-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent) 0%, #1e40af 100%);
  border-radius: 999px;
}
.pv-skill-cat { font-size: 0.7rem; color: var(--muted); }

/* List items (proyectos, educacion, experiencia) */
.pv-list { display: flex; flex-direction: column; gap: 1rem; }
.pv-item { display: flex; flex-direction: column; gap: 0.3rem; }
.pv-item-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap; }
.pv-item-title { font-size: 0.9rem; font-weight: 700; color: var(--text-h); }
.pv-item-period { font-size: 0.75rem; color: var(--muted); font-weight: 500; white-space: nowrap; }
.pv-item-sub { font-size: 0.8rem; color: var(--accent); font-weight: 500; }
.pv-item-desc { font-size: 0.82rem; color: var(--text); line-height: 1.6; margin: 0.1rem 0 0; }
.pv-item-urls { display: flex; flex-direction: column; gap: 0.2rem; }
.pv-url-row { display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; }
.pv-url-label { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 700; color: var(--text-h); white-space: nowrap; }

/* Tags */
.pv-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.25rem; }
.pv-tag {
  font-size: 0.7rem; font-weight: 600;
  padding: 2px 8px; border-radius: 999px;
  background: var(--cat-bg); color: var(--cat-text);
}

/* Links */
.pv-link {
  display: inline-flex; align-items: center; gap: 0.25rem;
  font-size: 0.75rem; font-weight: 600;
  color: var(--accent); text-decoration: none;
  padding: 2px 8px; border-radius: 6px;
  border: 1px solid var(--accent-border);
  background: var(--accent-subtle);
  transition: background 0.15s;
}
.pv-link:hover { background: var(--accent-border); }

/* Enlaces profesionales */
.pv-enlaces { display: flex; flex-direction: column; gap: 0.5rem; }
.pv-enlace-item { display: flex; flex-direction: column; gap: 0.1rem; }
.pv-enlace-label {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.82rem; font-weight: 700; color: var(--text-h);
}
.pv-enlace-url {
  font-size: 0.78rem; color: var(--accent);
  text-decoration: none; word-break: break-all;
}
.pv-enlace-url:hover { text-decoration: underline; }

@media (max-width: 480px) {
  .pv-doc-header { flex-direction: column; align-items: flex-start; padding: 1.25rem; }
  .pv-doc-section { padding: 1.25rem; }
}
`
