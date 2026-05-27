const Ico = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export default function AboutPage() {
  return (
    <>
      <style>{css}</style>
      <div className="ab-root">
        <header className="ab-header">
          <span className="ab-eyebrow">Proyecto academico</span>
          <h1 className="ab-title">Acerca de CV Builder</h1>
          <p className="ab-lead">
            Una herramienta web para crear curriculos de forma rapida, limpia
            y sin necesidad de registro. Toda la informacion se guarda localmente.
          </p>
        </header>

        <div className="ab-grid">
          <section className="ab-card">
            <div className="ab-card-icon">
              <Ico>
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <line x1="8" y1="8" x2="16" y2="8"/>
                <line x1="8" y1="12" x2="13" y2="12"/>
                <line x1="8" y1="16" x2="11" y2="16"/>
              </Ico>
            </div>
            <h2 className="ab-card-title">Que es</h2>
            <p className="ab-card-body">
              CV Builder guia al usuario en la creacion de su curriculum paso a paso,
              con vista previa en tiempo real y exportacion a PDF.
            </p>
          </section>

          <section className="ab-card">
            <div className="ab-card-icon">
              <Ico><polyline points="20 6 9 17 4 12"/></Ico>
            </div>
            <h2 className="ab-card-title">Caracteristicas</h2>
            <ul className="ab-list">
              <li>Formulario guiado: datos personales y habilidades</li>
              <li>Vista previa en tiempo real del CV generado</li>
              <li>Dashboard visual con graficas de habilidades</li>
              <li>Exportacion a PDF con un solo clic</li>
              <li>Modo oscuro y claro integrado</li>
              <li>Datos almacenados solo en tu dispositivo</li>
            </ul>
          </section>

          <section className="ab-card ab-card--wide">
            <div className="ab-card-icon">
              <Ico>
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </Ico>
            </div>
            <h2 className="ab-card-title">Tecnologias</h2>
            <div className="ab-tech-grid">
              {[
                { name: 'React',        desc: 'UI component library' },
                { name: 'Vite',         desc: 'Build tool & dev server' },
                { name: 'React Router', desc: 'Client-side routing' },
                { name: 'Context API',  desc: 'State management' },
                { name: 'localStorage', desc: 'Persistencia local' },
                { name: 'CSS Variables',desc: 'Theming & dark mode' },
              ].map(t => (
                <div key={t.name} className="ab-tech-item">
                  <span className="ab-tech-name">{t.name}</span>
                  <span className="ab-tech-desc">{t.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

const css = `
.ab-root { max-width: 760px; margin: 0 auto; padding-bottom: 4rem; }

.ab-header {
  padding: 2rem 0 2.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.ab-eyebrow {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.09em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 0.75rem;
}
.ab-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700; color: var(--text-h);
  letter-spacing: -0.02em; margin-bottom: 0.75rem;
}
.ab-lead { font-size: 0.975rem; color: var(--text); max-width: 540px; line-height: 1.65; }

.ab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 600px) { .ab-grid { grid-template-columns: 1fr; } }

.ab-card {
  background: var(--form-bg); border: 1px solid var(--border);
  border-radius: 12px; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 0.75rem;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.ab-card:hover { border-color: var(--accent-border); box-shadow: var(--shadow); }
.ab-card--wide { grid-column: 1 / -1; }

.ab-card-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--accent-subtle); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ab-card-title { font-size: 0.95rem; font-weight: 700; color: var(--text-h); margin: 0; }
.ab-card-body { font-size: 0.875rem; color: var(--text); line-height: 1.6; }

.ab-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem; }
.ab-list li {
  font-size: 0.875rem; color: var(--text); line-height: 1.5;
  padding-left: 1.1rem; position: relative;
}
.ab-list li::before {
  content: ''; position: absolute; left: 0; top: 0.55em;
  width: 5px; height: 5px; border-radius: 50%; background: var(--accent);
}

.ab-tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
@media (max-width: 500px) { .ab-tech-grid { grid-template-columns: 1fr 1fr; } }

.ab-tech-item {
  display: flex; flex-direction: column; gap: 0.2rem;
  background: var(--surface-sunken, var(--bg));
  border: 1px solid var(--border);
  border-radius: 8px; padding: 0.75rem 1rem;
}
.ab-tech-name { font-size: 0.875rem; font-weight: 700; color: var(--text-h); }
.ab-tech-desc { font-size: 0.75rem; color: var(--muted); }
`
