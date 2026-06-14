import { useState } from 'react'
import { useCV } from '../context/CVContext'
import { validateProyecto } from '../utils/validations'
import { confirmDialog, toastSuccess } from '../utils/toast'

const INITIAL = {
  nombre: '', descripcion: '', tecnologias: '',
  repositorio: '', deploy: '', imagen: '',
}

export default function ProjectsPage() {
  const { proyectos, addProyecto, editProyecto, deleteProyecto } = useCV()
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const existingNames = () =>
    proyectos.filter(p => p.id !== editingId).map(p => p.nombre.trim().toLowerCase())

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateProyecto(values, existingNames())
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    if (editingId) {
      editProyecto(editingId, values)
      setEditingId(null)
      toastSuccess('Proyecto actualizado.')
    } else {
      addProyecto(values)
      toastSuccess(`"${values.nombre}" agregado.`)
    }
    setValues(INITIAL)
    setErrors({})
  }

  const handleEdit = (proyecto) => {
    setEditingId(proyecto.id)
    setValues({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      tecnologias: proyecto.tecnologias,
      repositorio: proyecto.repositorio || '',
      deploy: proyecto.deploy || '',
      imagen: proyecto.imagen || '',
    })
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (proyecto) => {
    const confirmed = await confirmDialog({
      title: '¿Eliminar proyecto?',
      text: `"${proyecto.nombre}" será eliminado de tu CV.`,
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      icon: 'warning',
    })
    if (confirmed) {
      deleteProyecto(proyecto.id)
      toastSuccess(`"${proyecto.nombre}" eliminado.`)
    }
  }

  const handleCancel = () => { setEditingId(null); setValues(INITIAL); setErrors({}) }

  return (
    <>
      <style>{css}</style>
      <div className="pj-page">
        <h1 className="pj-title">Proyectos</h1>

        <form className="pj-form" onSubmit={handleSubmit} noValidate>
          <h2 className="pj-form-title">
            {editingId ? 'Editar proyecto' : 'Agregar proyecto'}
          </h2>

          <div className="pj-row">
            <div className="pj-field">
              <label htmlFor="pj-nombre">Nombre *</label>
              <input id="pj-nombre" name="nombre" value={values.nombre}
                onChange={handleChange} placeholder="Ej. Mi Portfolio" />
              {errors.nombre && <span className="pj-error">{errors.nombre}</span>}
            </div>
            <div className="pj-field">
              <label htmlFor="pj-tecnologias">Tecnologías *</label>
              <input id="pj-tecnologias" name="tecnologias" value={values.tecnologias}
                onChange={handleChange} placeholder="Ej. React, Node.js, MongoDB" />
              {errors.tecnologias && <span className="pj-error">{errors.tecnologias}</span>}
            </div>
          </div>

          <div className="pj-field">
            <label htmlFor="pj-descripcion">Descripción *</label>
            <textarea id="pj-descripcion" name="descripcion" value={values.descripcion}
              onChange={handleChange} placeholder="Describe brevemente el proyecto" rows={3} />
            {errors.descripcion && <span className="pj-error">{errors.descripcion}</span>}
          </div>

          <div className="pj-row">
            <div className="pj-field">
              <label htmlFor="pj-repositorio">Repositorio</label>
              <input id="pj-repositorio" name="repositorio" value={values.repositorio}
                onChange={handleChange} placeholder="https://github.com/..." />
              {errors.repositorio && <span className="pj-error">{errors.repositorio}</span>}
            </div>
            <div className="pj-field">
              <label htmlFor="pj-deploy">Deploy</label>
              <input id="pj-deploy" name="deploy" value={values.deploy}
                onChange={handleChange} placeholder="https://mi-app.vercel.app" />
              {errors.deploy && <span className="pj-error">{errors.deploy}</span>}
            </div>
          </div>

          <div className="pj-field">
            <label htmlFor="pj-imagen">Imagen (URL)</label>
            <input id="pj-imagen" name="imagen" value={values.imagen}
              onChange={handleChange} placeholder="https://ejemplo.com/imagen.png" />
            {errors.imagen && <span className="pj-error">{errors.imagen}</span>}
          </div>

          <div className="pj-btns">
            <button type="submit" className="pj-btn-primary">
              {editingId ? 'Guardar cambios' : 'Agregar'}
            </button>
            {editingId && (
              <button type="button" className="pj-btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {proyectos.length > 0 && (
          <div className="pj-list">
            <h2 className="pj-list-title">
              Proyectos agregados
              <span className="pj-count">{proyectos.length}</span>
            </h2>
            <ul className="pj-items">
              {proyectos.map(proyecto => (
                <li key={proyecto.id} className="pj-item">
                  <div className="pj-item-info">
                    <div className="pj-item-header">
                      <span className="pj-item-nombre">{proyecto.nombre}</span>
                      <span className="pj-item-tech">{proyecto.tecnologias}</span>
                    </div>
                    <p className="pj-item-desc">{proyecto.descripcion}</p>
                    <div className="pj-item-links">
                      {proyecto.repositorio && (
                        <a href={proyecto.repositorio} target="_blank" rel="noopener noreferrer"
                          className="pj-link">Repositorio</a>
                      )}
                      {proyecto.deploy && (
                        <a href={proyecto.deploy} target="_blank" rel="noopener noreferrer"
                          className="pj-link">Deploy</a>
                      )}
                      {proyecto.imagen && (
                        <a href={proyecto.imagen} target="_blank" rel="noopener noreferrer"
                          className="pj-link">Imagen</a>
                      )}
                    </div>
                  </div>
                  <div className="pj-item-actions">
                    <button className="pj-btn-edit" onClick={() => handleEdit(proyecto)}>
                      Editar
                    </button>
                    <button className="pj-btn-del" onClick={() => handleDelete(proyecto)}>
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
.pj-page { max-width: 720px; margin: 0 auto; }

.pj-title {
  font-size: 1.4rem; font-weight: 700;
  color: var(--text-h); margin: 0 0 1.75rem;
}

.pj-form {
  background: var(--form-bg);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1.1rem;
  margin-bottom: 2rem;
}
.pj-form-title { font-size: 1rem; font-weight: 700; color: var(--text-h); margin: 0 0 0.25rem; }

.pj-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 560px) { .pj-row { grid-template-columns: 1fr; } }

.pj-field { display: flex; flex-direction: column; gap: 0.3rem; }
.pj-field label { font-size: 0.8rem; font-weight: 600; color: var(--label-color); }
.pj-field input,
.pj-field textarea {
  padding: 0.55rem 0.875rem;
  border: 1px solid var(--input-border);
  border-radius: 8px; font-size: 0.9rem;
  font-family: inherit; background: var(--input-bg);
  color: var(--input-text);
  transition: border-color 0.18s, box-shadow 0.18s;
  resize: vertical;
}
.pj-field input::placeholder,
.pj-field textarea::placeholder { color: var(--muted); }
.pj-field input:focus,
.pj-field textarea:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}
.pj-error { font-size: 0.76rem; color: #dc2626; font-weight: 500; }

.pj-btns { display: flex; gap: 0.75rem; }
.pj-btn-primary {
  background: var(--btn-bg); color: var(--btn-text); border: none;
  padding: 0.6rem 1.5rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 600;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 2px 8px var(--accent-glow);
  transition: background 0.18s, transform 0.15s;
}
.pj-btn-primary:hover { background: var(--btn-hover); transform: translateY(-1px); }
.pj-btn-secondary {
  background: transparent; color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
  padding: 0.6rem 1.2rem; border-radius: 8px;
  font-size: 0.875rem; font-weight: 500;
  cursor: pointer; font-family: inherit;
  transition: border-color 0.18s;
}
.pj-btn-secondary:hover { border-color: var(--label-color); }

.pj-list-title {
  font-size: 0.95rem; font-weight: 700; color: var(--text-h);
  margin-bottom: 0.875rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.pj-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 7px;
  background: var(--accent); color: #fff;
  font-size: 0.72rem; font-weight: 700; border-radius: 999px;
}

.pj-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }

.pj-item {
  background: var(--item-bg); border: 1px solid var(--item-border);
  border-radius: 10px; padding: 1rem 1.1rem;
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
  transition: box-shadow 0.18s, border-color 0.18s;
}
.pj-item:hover { border-color: var(--accent-border); box-shadow: var(--shadow); }

.pj-item-info { flex: 1; display: flex; flex-direction: column; gap: 0.45rem; }
.pj-item-header { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.pj-item-nombre { font-weight: 700; font-size: 0.9rem; color: var(--text-h); }
.pj-item-tech {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.03em;
  background: var(--cat-bg, var(--accent-subtle)); color: var(--cat-text, var(--accent));
  padding: 2px 9px; border-radius: 999px;
}
.pj-item-desc { font-size: 0.8rem; color: var(--muted); margin: 0; line-height: 1.45; }
.pj-item-links { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.pj-link {
  font-size: 0.75rem; font-weight: 600; color: var(--accent);
  text-decoration: none; border-bottom: 1px solid transparent;
  transition: border-color 0.18s;
}
.pj-link:hover { border-bottom-color: var(--accent); }

.pj-item-actions { display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0; }
.pj-btn-edit {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid var(--accent-border); color: var(--cat-text, var(--accent));
  background: transparent; cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
}
.pj-btn-edit:hover { background: var(--cat-bg, var(--accent-subtle)); border-color: var(--accent); }
.pj-btn-del {
  font-size: 0.775rem; font-weight: 500;
  padding: 0.3rem 0.8rem; border-radius: 6px;
  border: 1px solid rgba(220,38,38,0.25); color: #dc2626;
  background: transparent; cursor: pointer;
  transition: background 0.18s;
}
.pj-btn-del:hover { background: rgba(220,38,38,0.07); }
`
