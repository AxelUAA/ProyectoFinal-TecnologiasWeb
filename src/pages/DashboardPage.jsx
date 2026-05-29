import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts'
import { useCV } from '../context/CVContext'

const Ico = ({ children, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const IconEmpty = () => (
  <Ico size={36}>
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </Ico>
)

const CATEGORIAS = [
  'Programacion','Bases de datos','Diseno web',
  'Idiomas','Herramientas de desarrollo','Habilidades blandas',
]

const CAT_COLORS = {
  'Programacion':            '#2563eb',
  'Bases de datos':          '#2563eb',
  'Diseno web':              '#0891b2',
  'Idiomas':                 '#059669',
  'Herramientas de desarrollo': '#d97706',
  'Habilidades blandas':     '#db2777',
}

export default function DashboardPage() {
  const { skills, personalInfo } = useCV()

  const byCategory = CATEGORIAS
    .map(cat => ({ cat, items: skills.filter(s => s.categoria === cat) }))
    .filter(g => g.items.length > 0)

  const avg = skills.length
    ? Math.round(skills.reduce((acc, s) => acc + s.nivel, 0) / skills.length)
    : 0

  const top = [...skills].sort((a, b) => b.nivel - a.nivel).slice(0, 3)

  return (
    <>
      <style>{css}</style>
      <div className="db-root">
        <header className="db-header">
          <h1 className="db-title">Dashboard</h1>
          <p className="db-sub">Resumen visual de tu perfil y habilidades.</p>
        </header>

        {skills.length === 0 ? (
          <div className="db-empty">
            <div className="db-empty-icon"><IconEmpty /></div>
            <h2 className="db-empty-title">Sin datos aun</h2>
            <p className="db-empty-body">
              Agrega habilidades en el editor para ver tu dashboard.
            </p>
          </div>
        ) : (
          <div className="db-content">
            <div className="db-stats">
              <div className="db-stat">
                <span className="db-stat-value">{skills.length}</span>
                <span className="db-stat-label">Habilidades</span>
              </div>
              <div className="db-stat">
                <span className="db-stat-value">{byCategory.length}</span>
                <span className="db-stat-label">Categorias</span>
              </div>
              <div className="db-stat">
                <span className="db-stat-value">{avg}%</span>
                <span className="db-stat-label">Promedio</span>
              </div>
              {personalInfo.nombre && (
                <div className="db-stat db-stat--accent">
                  <span className="db-stat-value db-stat-name">
                    {personalInfo.nombre.split(' ')[0]}
                  </span>
                  <span className="db-stat-label">Perfil activo</span>
                </div>
              )}
            </div>

            {top.length > 0 && (
              <section className="db-section">
                <h2 className="db-section-title">Habilidades destacadas</h2>
                <div className="db-top-list">
                  {top.map((s, i) => (
                    <div key={s.id} className="db-top-item">
                      <span className="db-top-rank">{i + 1}</span>
                      <div className="db-top-info">
                        <div className="db-top-row">
                          <span className="db-top-name">{s.nombre}</span>
                          <span className="db-top-pct">{s.nivel}%</span>
                        </div>
                        <div className="db-bar-bg">
                          <div className="db-bar-fill" style={{ width: `${s.nivel}%` }} />
                        </div>
                        <span className="db-top-cat">{s.categoria}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Gráfica de barras: nivel por habilidad ── */}
            <section className="db-section">
              <h2 className="db-section-title">Nivel por habilidad</h2>
              <div className="db-chart-wrap">
                <ResponsiveContainer width="100%" height={Math.max(220, skills.length * 38)}>
                  <BarChart
                    data={[...skills].sort((a, b) => b.nivel - a.nivel)}
                    layout="vertical"
                    margin={{ top: 4, right: 48, left: 8, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--muted)' }} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="nombre" width={110} tick={{ fontSize: 12, fill: 'var(--text-h)', fontWeight: 600 }} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Nivel']}
                      contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                      cursor={{ fill: 'var(--accent-subtle)' }}
                    />
                    <Bar dataKey="nivel" radius={[0, 6, 6, 0]} maxBarSize={22}>
                      {skills.map((s) => (
                        <Cell
                          key={s.id}
                          fill={CAT_COLORS[s.categoria] || '#7c3aed'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* ── Gráfica de dona: distribución por categoría ── */}
            {byCategory.length > 1 && (
              <section className="db-section">
                <h2 className="db-section-title">Distribucion por categoria</h2>
                <div className="db-chart-wrap db-chart-wrap--pie">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={byCategory.map(g => ({ name: g.cat, value: g.items.length }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {byCategory.map((g) => (
                          <Cell key={g.cat} fill={CAT_COLORS[g.cat] || '#7c3aed'} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                        contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                      />
                      <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </section>
            )}

            <section className="db-section">
              <h2 className="db-section-title">Por categoria</h2>
              <div className="db-cats">
                {byCategory.map(g => (
                  <div key={g.cat} className="db-cat-card">
                    <div className="db-cat-header">
                      <span className="db-cat-name">{g.cat}</span>
                      <span className="db-cat-count">{g.items.length}</span>
                    </div>
                    <div className="db-cat-items">
                      {g.items.map(s => (
                        <div key={s.id} className="db-cat-item">
                          <div className="db-cat-item-row">
                            <span className="db-cat-item-name">{s.nombre}</span>
                            <span className="db-cat-item-pct">{s.nivel}%</span>
                          </div>
                          <div className="db-bar-bg db-bar-bg--sm">
                            <div className="db-bar-fill" style={{ width: `${s.nivel}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  )
}

const css = `
.db-root { max-width: 820px; margin: 0 auto; padding-bottom: 4rem; }

.db-header { padding-bottom: 1.75rem; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
.db-title { font-size: 1.5rem; font-weight: 700; color: var(--text-h); margin-bottom: 0.3rem; }
.db-sub { font-size: 0.875rem; color: var(--text); }

.db-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 1rem; padding: 5rem 2rem; text-align: center;
  border: 1px dashed var(--border); border-radius: 16px;
  background: var(--form-bg);
}
.db-empty-icon { color: var(--accent); opacity: 0.45; }
.db-empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text-h); }
.db-empty-body { font-size: 0.875rem; color: var(--text); max-width: 300px; }

.db-content { display: flex; flex-direction: column; gap: 2rem; }

.db-chart-wrap {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1rem 1rem;
  overflow: hidden;
}
.db-chart-wrap--pie { padding: 1rem; }

.db-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
}
.db-stat {
  background: var(--form-bg); border: 1px solid var(--border);
  border-radius: 12px; padding: 1.25rem 1rem;
  display: flex; flex-direction: column; gap: 0.3rem;
  text-align: center; transition: border-color 0.2s;
}
.db-stat:hover { border-color: var(--accent-border); }
.db-stat--accent { border-color: var(--accent-border); background: var(--accent-subtle); }
.db-stat-value {
  font-size: 2rem; font-weight: 700; color: var(--accent);
  line-height: 1; letter-spacing: -0.02em;
}
.db-stat-name { font-size: 1.25rem; }
.db-stat-label {
  font-size: 0.72rem; color: var(--muted); font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
}

.db-section { display: flex; flex-direction: column; gap: 1rem; }
.db-section-title { font-size: 0.9rem; font-weight: 700; color: var(--text-h); margin: 0; }

.db-top-list { display: flex; flex-direction: column; gap: 0.75rem; }
.db-top-item {
  display: flex; align-items: flex-start; gap: 1rem;
  background: var(--form-bg); border: 1px solid var(--border);
  border-radius: 10px; padding: 1rem 1.25rem;
}
.db-top-rank {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--accent-subtle); color: var(--accent);
  font-size: 0.8rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;
}
.db-top-info { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
.db-top-row { display: flex; justify-content: space-between; align-items: center; }
.db-top-name { font-size: 0.9rem; font-weight: 700; color: var(--text-h); }
.db-top-pct { font-size: 0.85rem; font-weight: 700; color: var(--accent); }
.db-top-cat { font-size: 0.72rem; color: var(--muted); font-weight: 500; }

.db-bar-bg {
  height: 6px; background: var(--bar-bg);
  border-radius: 999px; overflow: hidden;
}
.db-bar-bg--sm { height: 4px; }
.db-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent) 0%, #1e40af 100%);
  border-radius: 999px; transition: width 0.5s ease;
}

.db-cats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1rem;
}
.db-cat-card {
  background: var(--form-bg); border: 1px solid var(--border);
  border-radius: 10px; padding: 1rem 1.1rem;
  display: flex; flex-direction: column; gap: 0.75rem;
  transition: border-color 0.2s;
}
.db-cat-card:hover { border-color: var(--accent-border); }
.db-cat-header { display: flex; align-items: center; justify-content: space-between; }
.db-cat-name { font-size: 0.82rem; font-weight: 700; color: var(--text-h); }
.db-cat-count {
  font-size: 0.7rem; font-weight: 700;
  padding: 2px 8px; border-radius: 999px;
  background: var(--cat-bg); color: var(--cat-text);
}
.db-cat-items { display: flex; flex-direction: column; gap: 0.6rem; }
.db-cat-item { display: flex; flex-direction: column; gap: 0.25rem; }
.db-cat-item-row { display: flex; justify-content: space-between; }
.db-cat-item-name { font-size: 0.8rem; color: var(--text); }
.db-cat-item-pct { font-size: 0.78rem; font-weight: 600; color: var(--accent); }
`
