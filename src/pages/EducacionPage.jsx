import { useState } from 'react'
import { useCV } from '../context/CVContext'
import { validateEducacion } from '../utils/validations'

const INITIAL = {
  institucion: '', programa: '', periodo: '',
  descripcion: '', enlace: '',
}

export default function EducacionPage() {
  const { educacion, addEducacion, editEducacion, deleteEducacion } = useCV()
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateEducacion(values)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    if (editingId) { editEducacion(editingId, values); setEditingId(null) }
    else { addEducacion(values) }
    setValues(INITIAL)
    setErrors({})
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setValues({
      institucion: item.institucion,
      programa: item.programa,
      periodo: item.periodo,
      descripcion: item.descripcion || '',
      enlace: item.enlace || '',
    })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => { setEditingId(null); setValues(INITIAL); setErrors({}) }

  return (
    <>
      <style>{css}</style>
      <div className="ed-page">
        <h1 className="ed-title">Educación</h1>

        <form className="ed-form" onSubmit={handleSubmit} noValidate>
          <h2 className="ed-form-title">
            {editingId ? 'Editar educación' : 'Agregar educación'}
          </h2>

          <div className="ed-row">
            <div className="ed-field">
              <label htmlFor="ed-institucion">Institución *</label>
              <input id="ed-institucion" name="institucion" value={values.institucion}
                onChange={handleChange} placeholder="Ej. Universidad Autónoma" />
              {errors.institucion && <span className="ed-error">{errors.institucion}</span>}
            </div>
            <div className="ed-field">
              <label htmlFor="ed-programa">Programa *</label>
              <input id="ed-programa" name="programa" value={values.programa}
                onChange={handleChange} placeholder="Ej. Ing. en Sistemas" />
              {errors.programa && <span className="ed-error">{errors.programa}</span>}
            </div>
          </div>

          <div className="ed-row">
            <div className="ed-field">
              <label htmlFor="ed-periodo">Periodo *</label>
              <input id="ed-periodo" name="periodo" value={values.periodo}
                onChange={handleChange} placeholder="Ej. 2020 - 2024" />
              {errors.periodo && <span className="ed-error">{errors.periodo}</span>}
            </div>
            <div className="ed-field">
              <label htmlFor="ed-enlace">Enlace</label>
              <input id="ed-enlace" name="enlace" value={values.enlace}
                onChange={handleChange} placeholder="https://certificado.com/..." />
              {errors.enlace && <span className="ed-error">{errors.enlace}</span>}
            </div>
          </div>

          <div className="ed-field">
            <label htmlFor="ed-descripcion">Descripción</label>
            <textarea id="ed-descripcion" name="descripcion" value={values.descripcion}
              onChange={handleChange} placeholder="Detalles adicionales (opcional)" rows={3} />
          </div>

          <div className="ed-btns">
            <button type="submit" className="ed-btn-primary">
              {editingId ? 'Guardar cambios' : 'Agregar'}
            </button>
            {editingId && (
              <button type="button" className="ed-btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {educacion.length > 0 && (
          <div className="ed-list">
            <h2 className="ed-list-title">
              Educación agregada
              <span className="ed-count">{educacion.length}</span>
            </h2>
            <ul className="ed-items">
              {educacion.map(item => (
                <li key={item.id} className="ed-item">
                  <div className="ed-item-info">
                    <div className="ed-item-header">
                      <span className="ed-item-programa">{item.programa}</span>
                      <span className="ed-item-periodo">{item.periodo}</span>
                    </div>
                    <span className="ed-item-inst">{item.institucion}</span>
                    {item.descripcion && (
                      <p className="ed-item-desc">{item.descripcion}</p>
                    )}
                    {item.enlace && (
                      <a href={item.enlace} target="_blank" rel="noopener noreferrer"
                        className="ed-link">Ver enlace</a>
                    )}
                  </div>
                  <div className="ed-item-actions">
                    <button className="ed-btn-edit" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button className="ed-btn-del" onClick={() => deleteEducacion(item.id)}>
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
.ed-page { max-width: 720px; margin: 0 auto; }

.ed-title {
  font-size: 1.4rem; font-weight: 700;
  color: var(--text-h); margin: 0 0 1.75rem;
}

.ed-form {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1.1rem;
  margin-bottom: 2rem;
}
.ed-form-title { font-size: 1rem; font-weight: 700; color: var(--text-h); margin: 0 0 0.25rem; }

.ed-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 560px) { .ed-row { grid-template-columns: 1fr; } }

.ed-field { display: flex; flex-direction: column; gap: 0.3rem; }
.ed-field label { font-size: 0.8rem; font-weight: 600; color: var(--label-color); }
.ed-field input,
.ed-field textarea {
  padding: 0.55rem 0.875rem;
  border: 1px solid var(--input-border);
  border-radius: 8px; font-size: 0.9rem;
  font-family: inherit; background: var(--input-bg);
  color: var(--input-text);
  transition: border-color 0.18s, box-shadow 0.18s;
  resize: vertical;
}
.ed-field input::placeholder,
.ed-field textarea::placeholder { color: var(--muted); }
.ed-field input:focus,
.ed-field textarea:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}
.ed-error { font-size: 0.76rem; color: #dc2626; font-weight: 500; }

.ed-btns { display: flex; gap: 0.75rem; }
.ed-btn-primary {
  background: var(--btn-bg); color: var(--btn-text); border: none;
  padding: 0.6rem 1.5rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 600;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 2px 8px var(--accent-glow);
  transition: background 0.18s, transform 0.15s;
}
.ed-btn-primary:hover { background: var(--btn-hover); transform: translateY(-1px); }
.ed-btn-secondary {
  background: transparent; color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
  padding: 0.6rem 1.2rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 500;
  cursor: pointer; font-family: inherit;
  transition: border-color 0.18s;
}
.ed-btn-secondary:hover { border-color: var(--label-color); }

.ed-list-title {
  font-size: 0.95rem; font-weight: 700; color: var(--text-h);
  margin-bottom: 0.875rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.ed-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 7px;
  background: var(--accent); color: #fff;
  font-size: 0.72rem; font-weight: 700; border-radius: 999px;
}

.ed-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }

.ed-item {
  background: var(--item-bg); border: 1px solid var(--item-border);
  border-radius: 10px; padding: 1rem 1.1rem;
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
  transition: box-shadow 0.18s, border-color 0.18s;
}
.ed-item:hover { border-color: var(--accent-border); box-shadow: var(--shadow); }

.ed-item-info { flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }
.ed-item-header { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.ed-item-programa { font-weight: 700; font-size: 0.9rem; color: var(--text-h); }
.ed-item-periodo {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.03em;
  background: var(--cat-bg, var(--accent-subtle)); color: var(--cat-text, var(--accent));
  padding: 2px 9px; border-radius: 999px;
}
.ed-item-inst { font-size: 0.82rem; color: var(--text); font-weight: 500; }
.ed-item-desc { font-size: 0.78rem; color: var(--muted); margin: 0; line-height: 1.45; }
.ed-link {
  font-size: 0.75rem; font-weight: 600; color: var(--accent);
  text-decoration: none; border-bottom: 1px solid transparent;
  transition: border-color 0.18s; width: fit-content;
}
.ed-link:hover { border-bottom-color: var(--accent); }

.ed-item-actions { display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0; }
.ed-btn-edit {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid var(--accent-border); color: var(--cat-text, var(--accent));
  background: transparent; cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
}
.ed-btn-edit:hover { background: var(--cat-bg, var(--accent-subtle)); border-color: var(--accent); }
.ed-btn-del {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid rgba(220,38,38,0.25); color: #dc2626;
  background: transparent; cursor: pointer;
  transition: background 0.18s;
}
.ed-btn-del:hover { background: rgba(220,38,38,0.07); }
`
