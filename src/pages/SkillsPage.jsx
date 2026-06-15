import { useState } from 'react'
import { useCV } from '../context/CVContext'
import { validateSkill } from '../utils/validations'
import { confirmDialog, toastSuccess } from '../utils/toast'

const CATEGORIAS = [
  'Programacion','Bases de datos','Diseno web',
  'Idiomas','Herramientas de desarrollo','Habilidades blandas',
]

const INITIAL = { nombre: '', categoria: '', nivel: '', descripcion: '' }

export default function SkillsPage() {
  const { skills, addSkill, editSkill, deleteSkill } = useCV()
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const existingNames = () =>
    skills.filter(s => s.id !== editingId).map(s => s.nombre.trim().toLowerCase())

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateSkill(values, existingNames())
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const data = { ...values, nivel: Number(values.nivel) }
    if (editingId) {
      editSkill(editingId, data)
      setEditingId(null)
      toastSuccess('Habilidad actualizada.')
    } else {
      addSkill(data)
      toastSuccess(`"${values.nombre}" agregada.`)
    }
    setValues(INITIAL)
    setErrors({})
  }

  const handleEdit = (skill) => {
    setEditingId(skill.id)
    setValues({ nombre: skill.nombre, categoria: skill.categoria,
      nivel: String(skill.nivel), descripcion: skill.descripcion || '' })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (skill) => {
    const confirmed = await confirmDialog({
      title: '¿Eliminar habilidad?',
      text: `"${skill.nombre}" será eliminada de tu CV.`,
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      icon: 'warning',
    })
    if (confirmed) {
      deleteSkill(skill.id)
      toastSuccess(`"${skill.nombre}" eliminada.`)
    }
  }

  const handleCancel = () => { setEditingId(null); setValues(INITIAL); setErrors({}) }

  return (
    <>
      <style>{css}</style>
      <div className="sk-page">
        <h1 className="sk-title">Habilidades</h1>

        <form className="sk-form" onSubmit={handleSubmit} noValidate>
          <h2 className="sk-form-title">
            {editingId ? 'Editar habilidad' : 'Agregar habilidad'}
          </h2>

          <div className="sk-row">
            <div className="sk-field">
              <label htmlFor="sk-nombre">Nombre *</label>
              <input id="sk-nombre" name="nombre" value={values.nombre}
                onChange={handleChange} placeholder="Ej. JavaScript" />
              {errors.nombre && <span className="sk-error">{errors.nombre}</span>}
            </div>
            <div className="sk-field">
              <label htmlFor="sk-categoria">Categoria *</label>
              <select id="sk-categoria" name="categoria" value={values.categoria}
                onChange={handleChange}>
                <option value="">Selecciona una categoria</option>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.categoria && <span className="sk-error">{errors.categoria}</span>}
            </div>
          </div>

          <div className="sk-row">
            <div className="sk-field">
              <label htmlFor="sk-nivel">Nivel (1-100) *</label>
              <input id="sk-nivel" name="nivel" type="number"
                min="1" max="100" value={values.nivel}
                onChange={handleChange} placeholder="Ej. 80" />
              {errors.nivel && <span className="sk-error">{errors.nivel}</span>}
            </div>
            <div className="sk-field">
              <label htmlFor="sk-desc">Descripcion breve</label>
              <input id="sk-desc" name="descripcion" value={values.descripcion}
                onChange={handleChange} placeholder="Ej. 3 anos de experiencia" />
              {errors.descripcion && <span className="sk-error">{errors.descripcion}</span>}
            </div>
          </div>

          <div className="sk-btns">
            <button type="submit" className="sk-btn-primary">
              {editingId ? 'Guardar cambios' : 'Agregar'}
            </button>
            {editingId && (
              <button type="button" className="sk-btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {skills.length > 0 && (
          <div className="sk-list">
            <h2 className="sk-list-title">
              Habilidades agregadas
              <span className="sk-count">{skills.length}</span>
            </h2>
            <ul className="sk-items">
              {skills.map(skill => (
                <li key={skill.id} className="sk-item">
                  <div className="sk-item-info">
                    <div className="sk-item-header">
                      <span className="sk-item-nombre">{skill.nombre}</span>
                      <span className="sk-item-cat">{skill.categoria}</span>
                    </div>
                    <div className="sk-bar-wrap">
                      <div className="sk-bar" style={{ width: `${skill.nivel}%` }} />
                    </div>
                    <div className="sk-item-footer">
                      {skill.descripcion && (
                        <span className="sk-item-desc">{skill.descripcion}</span>
                      )}
                      <span className="sk-nivel">{skill.nivel}%</span>
                    </div>
                  </div>
                  <div className="sk-item-actions">
                    <button className="sk-btn-edit" onClick={() => handleEdit(skill)}>
                      Editar
                    </button>
                    <button className="sk-btn-del" onClick={() => handleDelete(skill)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

const css = `
.sk-page { max-width: 720px; margin: 0 auto; }

.sk-title {
  font-size: 1.4rem; font-weight: 700;
  color: var(--text-h); margin: 0 0 1.75rem;
}

.sk-form {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1.1rem;
  margin-bottom: 2rem;
}
.sk-form-title { font-size: 1rem; font-weight: 700; color: var(--text-h); margin: 0 0 0.25rem; }

.sk-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 560px) { .sk-row { grid-template-columns: 1fr; } }

.sk-field { display: flex; flex-direction: column; gap: 0.3rem; }
.sk-field label { font-size: 0.8rem; font-weight: 600; color: var(--label-color); }
.sk-field input,
.sk-field select {
  padding: 0.55rem 0.875rem;
  border: 1px solid var(--input-border);
  border-radius: 8px; font-size: 0.9rem;
  font-family: inherit; background: var(--input-bg);
  color: var(--input-text);
  transition: border-color 0.18s, box-shadow 0.18s;
  appearance: none; -webkit-appearance: none;
}
.sk-field input::placeholder { color: var(--muted); }
.sk-field input:focus,
.sk-field select:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}
.sk-error { font-size: 0.76rem; color: #dc2626; font-weight: 500; }

.sk-btns { display: flex; gap: 0.75rem; }
.sk-btn-primary {
  background: var(--btn-bg); color: var(--btn-text); border: none;
  padding: 0.6rem 1.5rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 600;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 2px 8px var(--accent-glow);
  transition: background 0.18s, transform 0.15s;
}
.sk-btn-primary:hover { background: var(--btn-hover); transform: translateY(-1px); }
.sk-btn-secondary {
  background: transparent; color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
  padding: 0.6rem 1.2rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 500;
  cursor: pointer; font-family: inherit;
  transition: border-color 0.18s;
}
.sk-btn-secondary:hover { border-color: var(--label-color); }

.sk-list-title {
  font-size: 0.95rem; font-weight: 700; color: var(--text-h);
  margin-bottom: 0.875rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.sk-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 7px;
  background: var(--accent); color: #fff;
  font-size: 0.72rem; font-weight: 700; border-radius: 999px;
}

.sk-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }

.sk-item {
  background: var(--item-bg); border: 1px solid var(--item-border);
  border-radius: 10px; padding: 1rem 1.1rem;
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
  transition: box-shadow 0.18s, border-color 0.18s;
}
.sk-item:hover { border-color: var(--accent-border); box-shadow: var(--shadow); }

.sk-item-info { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
.sk-item-header { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.sk-item-nombre { font-weight: 700; font-size: 0.9rem; color: var(--text-h); }
.sk-item-cat {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.03em;
  background: var(--cat-bg); color: var(--cat-text);
  padding: 2px 9px; border-radius: 999px; text-transform: uppercase;
}
.sk-bar-wrap { height: 5px; background: var(--bar-bg); border-radius: 999px; overflow: hidden; }
.sk-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent) 0%, #5b21b6 100%);
  border-radius: 999px; transition: width 0.4s ease;
}
.sk-item-footer { display: flex; justify-content: space-between; align-items: center; }
.sk-item-desc { font-size: 0.78rem; color: var(--muted); }
.sk-nivel { font-size: 0.78rem; font-weight: 700; color: var(--accent); }

.sk-item-actions { display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0; }
.sk-btn-edit {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid var(--accent-border); color: var(--cat-text);
  background: transparent; cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
}
.sk-btn-edit:hover { background: var(--cat-bg); border-color: var(--accent); }
.sk-btn-del {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid rgba(220,38,38,0.25); color: #dc2626;
  background: transparent; cursor: pointer;
  transition: background 0.18s;
}
.sk-btn-del:hover { background: rgba(220,38,38,0.07); }
`
