import { useState } from 'react'
import PersonalInfoPage from './PersonalInfoPage'
import SkillsPage from './SkillsPage'
import ProjectsPage from './ProjectsPage'
import EducacionPage from './EducacionPage'
import ExperienciaPage from './ExperienciaPage'

const TABS = [
  { id: 'personal',    label: 'Datos personales' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos',   label: 'Proyectos' },
  { id: 'educacion',   label: 'Educación' },
  { id: 'experiencia', label: 'Experiencia' },
]

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <>
      <style>{css}</style>
      <div className="ep-root">
        <header className="ep-header">
          <h1 className="ep-title">Editor de CV</h1>
          <p className="ep-sub">Completa cada seccion para construir tu curriculum profesional.</p>
        </header>

        <div className="ep-tabbar" role="tablist" aria-label="Secciones del editor">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`ep-panel-${tab.id}`}
              id={`ep-tab-${tab.id}`}
              className={`ep-tab ${activeTab === tab.id ? 'ep-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="ep-tab-num" aria-hidden="true">{i + 1}</span>
              <span className="ep-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div
          className="ep-panel"
          role="tabpanel"
          id={`ep-panel-${activeTab}`}
          aria-labelledby={`ep-tab-${activeTab}`}
        >
          {activeTab === 'personal'    && <PersonalInfoPage embedded />}
          {activeTab === 'habilidades' && <SkillsPage />}
          {activeTab === 'proyectos'   && <ProjectsPage />}
          {activeTab === 'educacion'   && <EducacionPage />}
          {activeTab === 'experiencia' && <ExperienciaPage />}
        </div>
      </div>
    </>
  )
}

const css = `
.ep-root {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.ep-header {
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
}
.ep-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 0.3rem;
}
.ep-sub { font-size: 0.875rem; color: var(--text); }

.ep-tabbar {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.ep-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  padding: 0.8rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.18s, border-color 0.18s;
  border-radius: 0;
  letter-spacing: -0.01em;
  font-family: inherit;
}
.ep-tab:hover { color: var(--text-h); }
.ep-tab--active {
  color: var(--text-h);
  font-weight: 600;
  border-bottom-color: var(--accent);
}
.ep-tab-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: 700;
  background: var(--border);
  color: var(--text);
  flex-shrink: 0;
  transition: background 0.18s, color 0.18s;
}
.ep-tab--active .ep-tab-num {
  background: var(--accent);
  color: #fff;
}
@media (max-width: 480px) {
  .ep-tab { padding: 0.7rem 0.9rem; font-size: 0.8rem; }
  .ep-tab-num { display: none; }
}
`
