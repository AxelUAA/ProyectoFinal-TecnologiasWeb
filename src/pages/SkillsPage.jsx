import { useState } from 'react'
import { useCV } from '../context/CVContext'
import { validateSkill } from '../utils/validations'

const CATEGORIAS = [
  'Programación',
  'Bases de datos',
  'Diseño web',
  'Idiomas',
  'Herramientas de desarrollo',
  'Habilidades blandas',
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
    } else {
      addSkill(data)
    }
    setValues(INITIAL)
    setErrors({})
  }

  const handleEdit = (skill) => {
    setEditingId(skill.id)
    setValues({
      nombre: skill.nombre,
      categoria: skill.categoria,
      nivel: String(skill.nivel),
      descripcion: skill.descripcion || '',
    })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    setEditingId(null)
    setValues(INITIAL)
    setErrors({})
  }

  return (
    <>
      <style>{css}</style>

      <div className="sk-page">
        <h1 className="sk-title">Habilidades</h1>

        {/* Formulario */}
        <form className="sk-form" onSubmit={handleSubmit} noValidate>
          <h2 className="sk-form-title">
            {editingId ? 'Editar habilidad' : 'Agregar habilidad'}
          </h2>

          <div className="sk-row">
            <div className="sk-field">
              <label htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                placeholder="Ej. JavaScript"
              />
              {errors.nombre && <span className="sk-error">{errors.nombre}</span>}
            </div>

            <div className="sk-field">
              <label htmlFor="categoria">Categoría *</label>
              <select
                id="categoria"
                name="categoria"
                value={values.categoria}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIAS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.categoria && <span className="sk-error">{errors.categoria}</span>}
            </div>
          </div>

          <div className="sk-row">
            <div className="sk-field">
              <label htmlFor="nivel">Nivel (1-100) *</label>
              <input
                id="nivel"
                name="nivel"
                type="number"
                min="1"
                max="100"
                value={values.nivel}
                onChange={handleChange}
                placeholder="Ej. 80"
              />
              {errors.nivel && <span className="sk-error">{errors.nivel}</span>}
            </div>

            <div className="sk-field">
              <label htmlFor="descripcion">Descripción breve</label>
              <input
                id="descripcion"
                name="descripcion"
                value={values.descripcion}
                onChange={handleChange}
                placeholder="Ej. 3 años de experiencia"
              />
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

        {/* Lista */}
        {skills.length > 0 && (
          <div className="sk-list">
            <h2 className="sk-list-title">
              Habilidades agregadas <span className="sk-count">{skills.length}</span>
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
                    <button className="sk-btn-del" onClick={() => deleteSkill(skill.id)}>
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
.sk-title { font-size: 1.6rem; margin-bottom: 1.5rem; color: #1e1e2e; }

.sk-form {
  background: #f8f9fc;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.sk-form-title { margin: 0 0 0.5rem; font-size: 1.1rem; color: #333; }

.sk-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 560px) { .sk-row { grid-template-columns: 1fr; } }

.sk-field { display: flex; flex-direction: column; gap: 0.3rem; }
.sk-field label { font-size: 0.875rem; font-weight: 600; color: #444; }
.sk-field input,
.sk-field select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  color: #1e1e2e;
  transition: border-color 0.2s;
}
.sk-field input:focus,
.sk-field select:focus { outline: none; border-color: #89b4fa; }
.sk-error { font-size: 0.78rem; color: #e74c3c; }

.sk-btns { display: flex; gap: 0.75rem; }
.sk-btn-primary {
  background: #1e1e2e; color: white; border: none;
  padding: 0.55rem 1.4rem; border-radius: 6px;
  font-size: 0.9rem; cursor: pointer; transition: background 0.2s;
}
.sk-btn-primary:hover { background: #313244; }
.sk-btn-secondary {
  background: transparent; color: #555;
  border: 1px solid #ccc; padding: 0.55rem 1.2rem;
  border-radius: 6px; font-size: 0.9rem; cursor: pointer;
}
.sk-btn-secondary:hover { border-color: #888; }

.sk-list-title {
  font-size: 1.1rem; margin-bottom: 1rem; color: #333;
  display: flex; align-items: center; gap: 0.5rem;
}
.sk-count {
  background: #1e1e2e; color: white;
  font-size: 0.8rem; padding: 0.1rem 0.5rem; border-radius: 99px;
}

.sk-items { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }

.sk-item {
  background: white; border: 1px solid #e0e0e0; border-radius: 8px;
  padding: 1rem; display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
}
.sk-item-info { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
.sk-item-header { display: flex; align-items: center; gap: 0.6rem; }
.sk-item-nombre { font-weight: 700; font-size: 0.95rem; color: #1e1e2e; }
.sk-item-cat {
  font-size: 0.72rem; background: #eef2ff; color: #4361ee;
  padding: 0.1rem 0.5rem; border-radius: 99px;
}
.sk-bar-wrap {
  height: 6px; background: #e9ecef; border-radius: 99px; overflow: hidden;
}
.sk-bar { height: 100%; background: #89b4fa; border-radius: 99px; transition: width 0.3s; }
.sk-item-footer { display: flex; justify-content: space-between; align-items: center; }
.sk-item-desc { font-size: 0.8rem; color: #777; }
.sk-nivel { font-size: 0.8rem; font-weight: 600; color: #555; }

.sk-item-actions { display: flex; flex-direction: column; gap: 0.4rem; }
.sk-btn-edit {
  font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 5px;
  border: 1px solid #89b4fa; color: #4361ee; background: transparent;
  cursor: pointer; transition: background 0.2s;
}
.sk-btn-edit:hover { background: #eef2ff; }
.sk-btn-del {
  font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 5px;
  border: 1px solid #fca5a5; color: #e74c3c; background: transparent;
  cursor: pointer; transition: background 0.2s;
}
.sk-btn-del:hover { background: #fff5f5; }
`
