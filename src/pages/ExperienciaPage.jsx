import { useState } from 'react'
import { useCV } from '../context/CVContext'
import { validateExperiencia } from '../utils/validations'
import { confirmDialog, toastSuccess } from '../utils/toast'

const INITIAL = {
  puesto: '', empresa: '', periodo: '',
  descripcion: '', tecnologias: '',
}

export default function ExperienciaPage() {
  const { experiencia, addExperiencia, editExperiencia, deleteExperiencia } = useCV()
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
    const errs = validateExperiencia(values)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    if (editingId) {
      editExperiencia(editingId, values)
      setEditingId(null)
      toastSuccess('Experiencia actualizada.')
    } else {
      addExperiencia(values)
      toastSuccess(`"${values.puesto}" en ${values.empresa} agregado.`)
    }
    setValues(INITIAL)
    setErrors({})
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setValues({
      puesto: item.puesto,
      empresa: item.empresa,
      periodo: item.periodo,
      descripcion: item.descripcion || '',
      tecnologias: item.tecnologias || '',
    })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (item) => {
    const confirmed = await confirmDialog({
      title: '¿Eliminar experiencia?',
      text: `"${item.puesto}" en ${item.empresa} será eliminado.`,
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      icon: 'warning',
    })
    if (confirmed) {
      deleteExperiencia(item.id)
      toastSuccess(`"${item.puesto}" eliminado.`)
    }
  }

  const handleCancel = () => { setEditingId(null); setValues(INITIAL); setErrors({}) }

  return (
    <>
      <style>{css}</style>
      <div className="ex-page">
        <h1 className="ex-title">Experiencia</h1>

        <form className="ex-form" onSubmit={handleSubmit} noValidate>
          <h2 className="ex-form-title">
            {editingId ? 'Editar experiencia' : 'Agregar experiencia'}
          </h2>

          <div className="ex-row">
            <div className="ex-field">
              <label htmlFor="ex-puesto">Puesto *</label>
              <input id="ex-puesto" name="puesto" value={values.puesto}
                onChange={handleChange} placeholder="Ej. Desarrollador Frontend" />
              {errors.puesto && <span className="ex-error">{errors.puesto}</span>}
            </div>
            <div className="ex-field">
              <label htmlFor="ex-empresa">Empresa *</label>
              <input id="ex-empresa" name="empresa" value={values.empresa}
                onChange={handleChange} placeholder="Ej. Google" />
              {errors.empresa && <span className="ex-error">{errors.empresa}</span>}
            </div>
          </div>

          <div className="ex-row">
            <div className="ex-field">
              <label htmlFor="ex-periodo">Periodo *</label>
              <input id="ex-periodo" name="periodo" value={values.periodo}
                onChange={handleChange} placeholder="Ej. Ene 2022 - Presente" />
              {errors.periodo && <span className="ex-error">{errors.periodo}</span>}
            </div>
            <div className="ex-field">
              <label htmlFor="ex-tecnologias">Tecnologías</label>
              <input id="ex-tecnologias" name="tecnologias" value={values.tecnologias}
                onChange={handleChange} placeholder="Ej. React, TypeScript" />
            </div>
          </div>

          <div className="ex-field">
            <label htmlFor="ex-descripcion">Descripción</label>
            <textarea id="ex-descripcion" name="descripcion" value={values.descripcion}
              onChange={handleChange} placeholder="Responsabilidades y logros (opcional)" rows={3} />
          </div>

          <div className="ex-btns">
            <button type="submit" className="ex-btn-primary">
              {editingId ? 'Guardar cambios' : 'Agregar'}
            </button>
            {editingId && (
              <button type="button" className="ex-btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {experiencia.length > 0 && (
          <div className="ex-list">
            <h2 className="ex-list-title">
              Experiencia agregada
              <span className="ex-count">{experiencia.length}</span>
            </h2>
            <ul className="ex-items">
              {experiencia.map(item => (
                <li key={item.id} className="ex-item">
                  <div className="ex-item-info">
                    <div className="ex-item-header">
                      <span className="ex-item-puesto">{item.puesto}</span>
                      <span className="ex-item-periodo">{item.periodo}</span>
                    </div>
                    <span className="ex-item-empresa">{item.empresa}</span>
                    {item.tecnologias && (
                      <span className="ex-item-tech">{item.tecnologias}</span>
                    )}
                    {item.descripcion && (
                      <p className="ex-item-desc">{item.descripcion}</p>
                    )}
                  </div>
                  <div className="ex-item-actions">
                    <button className="ex-btn-edit" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button className="ex-btn-del" onClick={() => handleDelete(item)}>
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
.ex-page { max-width: 720px; margin: 0 auto; }

.ex-title {
  font-size: 1.4rem; font-weight: 700;
  color: var(--text-h); margin: 0 0 1.75rem;
}

.ex-form {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1.1rem;
  margin-bottom: 2rem;
}
.ex-form-title { font-size: 1rem; font-weight: 700; color: var(--text-h); margin: 0 0 0.25rem; }

.ex-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 560px) { .ex-row { grid-template-columns: 1fr; } }

.ex-field { display: flex; flex-direction: column; gap: 0.3rem; }
.ex-field label { font-size: 0.8rem; font-weight: 600; color: var(--label-color); }
.ex-field input,
.ex-field textarea {
  padding: 0.55rem 0.875rem;
  border: 1px solid var(--input-border);
  border-radius: 8px; font-size: 0.9rem;
  font-family: inherit; background: var(--input-bg);
  color: var(--input-text);
  transition: border-color 0.18s, box-shadow 0.18s;
  resize: vertical;
}
.ex-field input::placeholder,
.ex-field textarea::placeholder { color: var(--muted); }
.ex-field input:focus,
.ex-field textarea:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}
.ex-error { font-size: 0.76rem; color: #dc2626; font-weight: 500; }

.ex-btns { display: flex; gap: 0.75rem; }
.ex-btn-primary {
  background: var(--btn-bg); color: var(--btn-text); border: none;
  padding: 0.6rem 1.5rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 600;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 2px 8px var(--accent-glow);
  transition: background 0.18s, transform 0.15s;
}
.ex-btn-primary:hover { background: var(--btn-hover); transform: translateY(-1px); }
.ex-btn-secondary {
  background: transparent; color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
  padding: 0.6rem 1.2rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 500;
  cursor: pointer; font-family: inherit;
  transition: border-color 0.18s;
}
.ex-btn-secondary:hover { border-color: var(--label-color); }

.ex-list-title {
  font-size: 0.95rem; font-weight: 700; color: var(--text-h);
  margin-bottom: 0.875rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.ex-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 7px;
  background: var(--accent); color: #fff;
  font-size: 0.72rem; font-weight: 700; border-radius: 999px;
}

.ex-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }

.ex-item {
  background: var(--item-bg); border: 1px solid var(--item-border);
  border-radius: 10px; padding: 1rem 1.1rem;
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
  transition: box-shadow 0.18s, border-color 0.18s;
}
.ex-item:hover { border-color: var(--accent-border); box-shadow: var(--shadow); }

.ex-item-info { flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }
.ex-item-header { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.ex-item-puesto { font-weight: 700; font-size: 0.9rem; color: var(--text-h); }
.ex-item-periodo {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.03em;
  background: var(--cat-bg, var(--accent-subtle)); color: var(--cat-text, var(--accent));
  padding: 2px 9px; border-radius: 999px;
}
.ex-item-empresa { font-size: 0.82rem; color: var(--text); font-weight: 500; }
.ex-item-tech {
  font-size: 0.75rem; color: var(--muted); font-style: italic;
}
.ex-item-desc { font-size: 0.78rem; color: var(--muted); margin: 0; line-height: 1.45; }

.ex-item-actions { display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0; }
.ex-btn-edit {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid var(--accent-border); color: var(--cat-text, var(--accent));
  background: transparent; cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
}
.ex-btn-edit:hover { background: var(--cat-bg, var(--accent-subtle)); border-color: var(--accent); }
.ex-btn-del {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid rgba(220,38,38,0.25); color: #dc2626;
  background: transparent; cursor: pointer;
  transition: background 0.18s;
}
.ex-btn-del:hover { background: rgba(220,38,38,0.07); }
`
