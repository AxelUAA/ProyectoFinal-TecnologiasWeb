import { useEffect, useRef } from 'react'
import { useCV } from '../context/CVContext'
import { useFormValidation } from '../hooks/useFormValidation'
import { validatePersonalInfo } from '../utils/validations'
import { toastSuccess } from '../utils/toast'
import './PersonalInfoPage.css'

const INITIAL = {
  nombre: '', profesion: '', ciudad: '', email: '',
  telefono: '', descripcion: '', linkedin: '', github: '', portfolio: '',
}

export default function PersonalInfoPage({ embedded = false }) {
  const { personalInfo, updatePersonalInfo } = useCV()
  const { values, errors, handleChange, handleSubmit, setValues } =
    useFormValidation(INITIAL, validatePersonalInfo)
  const fotoRef = useRef(null)

  useEffect(() => {
    // foto se maneja por separado (no vive en values), se excluye del form
    const { foto: _foto, ...rest } = personalInfo
    setValues({ ...INITIAL, ...rest })
  }, [])

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => updatePersonalInfo({ foto: reader.result })
    reader.readAsDataURL(file)
  }

  const onSubmit = (vals) => {
    // Preserva la foto que ya está en contexto — no vive en vals del formulario
    updatePersonalInfo({ ...vals, foto: personalInfo.foto })
    toastSuccess('Datos guardados correctamente.')
  }

  return (
    <div className="pi-page">
      {!embedded && <h1 className="pi-title">Datos Personales</h1>}

      <form className="pi-form" onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className="pi-foto-section">
          <div
            className="pi-foto-preview"
            onClick={() => fotoRef.current.click()}
            role="button"
            tabIndex={0}
            aria-label="Subir foto de perfil"
            onKeyDown={e => e.key === 'Enter' && fotoRef.current.click()}
          >
            {personalInfo.foto
              ? <img src={personalInfo.foto} alt="Foto de perfil" />
              : <span>+ Foto</span>
            }
          </div>
          <input ref={fotoRef} type="file" accept="image/*" onChange={handleFoto} hidden />
          <div className="pi-foto-meta">
            <strong>Foto de perfil</strong>
            <p className="pi-foto-hint">JPG, PNG o GIF — clic para subir</p>
          </div>
        </div>

        <div className="pi-row">
          <div className="pi-field">
            <label htmlFor="nombre">Nombre completo *</label>
            <input id="nombre" name="nombre" type="text"
              value={values.nombre} onChange={handleChange}
              placeholder="Ej. Juan Perez" />
            {errors.nombre && <span className="pi-error">{errors.nombre}</span>}
          </div>
          <div className="pi-field">
            <label htmlFor="profesion">Carrera / Profesion *</label>
            <input id="profesion" name="profesion" type="text"
              value={values.profesion} onChange={handleChange}
              placeholder="Ej. Ingenieria en Sistemas" />
            {errors.profesion && <span className="pi-error">{errors.profesion}</span>}
          </div>
        </div>

        <div className="pi-row">
          <div className="pi-field">
            <label htmlFor="ciudad">Ciudad</label>
            <input id="ciudad" name="ciudad" type="text"
              value={values.ciudad} onChange={handleChange}
              placeholder="Ej. Guadalajara, Mexico" />
            {errors.ciudad && <span className="pi-error">{errors.ciudad}</span>}
          </div>
          <div className="pi-field">
            <label htmlFor="telefono">Telefono *</label>
            <input id="telefono" name="telefono" type="tel"
              value={values.telefono} onChange={handleChange}
              placeholder="Ej. +52 33 1234 5678" />
            {errors.telefono && <span className="pi-error">{errors.telefono}</span>}
          </div>
        </div>

        <div className="pi-field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email"
            value={values.email} onChange={handleChange}
            placeholder="Ej. juan@correo.com" />
          {errors.email && <span className="pi-error">{errors.email}</span>}
        </div>

        <div className="pi-field">
          <label htmlFor="descripcion">Descripcion / Perfil profesional</label>
          <textarea id="descripcion" name="descripcion"
            value={values.descripcion} onChange={handleChange}
            placeholder="Breve resumen sobre ti y tus objetivos profesionales..."
            rows={4} />
          {errors.descripcion && <span className="pi-error">{errors.descripcion}</span>}
        </div>

        <fieldset className="pi-links">
          <legend>Links</legend>
          <div className="pi-field">
            <label htmlFor="linkedin">LinkedIn</label>
            <input id="linkedin" name="linkedin" type="url"
              value={values.linkedin} onChange={handleChange}
              placeholder="https://linkedin.com/in/tu-perfil" />
          </div>
          <div className="pi-field">
            <label htmlFor="github">GitHub</label>
            <input id="github" name="github" type="url"
              value={values.github} onChange={handleChange}
              placeholder="https://github.com/tu-usuario" />
          </div>
          <div className="pi-field">
            <label htmlFor="portfolio">Portfolio</label>
            <input id="portfolio" name="portfolio" type="url"
              value={values.portfolio} onChange={handleChange}
              placeholder="https://tu-portfolio.com" />
          </div>
        </fieldset>

        <button type="submit" className="pi-btn">Guardar datos</button>
      </form>
    </div>
  )
}
