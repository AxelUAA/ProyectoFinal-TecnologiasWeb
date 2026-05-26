import { useState } from 'react'
import PersonalInfoPage from './PersonalInfoPage'
import SkillsPage from './SkillsPage'

const TABS = [
  { id: 'personal', label: 'Datos personales' },
  { id: 'habilidades', label: 'Habilidades' },
]

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <>
      <style>{css}</style>
      <div className="editor-page">
        <h1 className="editor-title">Editor de CV</h1>

        <div className="editor-tabs" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`editor-tab ${activeTab === tab.id ? 'editor-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="editor-content">
          {activeTab === 'personal' && <PersonalInfoPage embedded />}
          {activeTab === 'habilidades' && <SkillsPage />}
        </div>
      </div>
    </>
  )
}

const css = `
.editor-page {
  max-width: 800px;
  margin: 0 auto;
}

.editor-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0 0 1.5rem;
}

.editor-tabs {
  display: flex;
  gap: 0.25rem;
  border-bottom: 2px solid var(--input-border);
  margin-bottom: 1.75rem;
}

.editor-tab {
  background: transparent;
  border: none;
  padding: 0.55rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  border-radius: 4px 4px 0 0;
  transition: color 0.2s, border-color 0.2s;
}

.editor-tab:hover { color: var(--text-h); }

.editor-tab--active {
  color: var(--text-h);
  border-bottom-color: var(--btn-bg);
}
`
