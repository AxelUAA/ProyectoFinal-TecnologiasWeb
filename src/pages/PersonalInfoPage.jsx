import { useEffect, useRef } from 'react'
import { useCV } from '../context/CVContext'
import { useFormValidation } from '../hooks/useFormValidation'
import { validatePersonalInfo } from '../utils/validations'
import './PersonalInfoPage.css'

const INITIAL = {
  nombre: '',
  profesion: '',
  ciudad: '',
  email: '',
  telefono: '',
  descripcion: '',
  linkedin: '',
  github: '',
  portfolio: '',
}

export default function PersonalInfoPage({ embedded = false }) {
  const { personalInfo, updatePersonalInfo } = useCV()
  const { values, errors, handleChange, handleSubmit, setValues } = useFormValidation(
    INITIAL,
    validatePersonalInfo
  )
  const fotoRef = useRef(null)

  useEffect(() => {
    setValues({ ...INITIAL, ...personalInfo, foto: undefined })
  }, [])

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => updatePersonalInfo({ foto: reader.result })
    reader.readAsDataURL(file)
  }

  const onSubmit = (vals) => {
    updatePersonalInfo(vals)
    alert('Datos guardados correctamente.')
  }

  return (
    <div className="pi-page">
      {!embedded && <h1 className="pi-title">Datos Personales</h1>}

      <form className="pi-form" onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Foto de perfil */}
        <div className="pi-foto-section">
          <div className="pi-foto-preview" onClick={() => fotoRef.current.click()}>
            {personalInfo.foto
              ? <img src={personalInfo.foto} alt="Foto de perfil" />
              : <span>+ Foto</span>
            }
          </div>
          <input
            ref={fotoRef}
            type="file"
            accept="image/*"
            onChange={handleFoto}
            hidden
          />
          <p className="pi-foto-hint">Haz clic para subir una imagen</p>
        </div>

        {/* Fila: Nombre + Profesión */}
        <div className="pi-row">
          <div className="pi-field">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={values.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
            />
            {errors.nombre && <span className="pi-error">{errors.nombre}</span>}
          </div>

          <div className="pi-field">
            <label htmlFor="profesion">Carrera / Profesión *</label>
            <input
              id="profesion"
              name="profesion"
              type="text"
              value={values.profesion}
              onChange={handleChange}
              placeholder="Ej. Ingeniería en Sistemas"
            />
            {errors.profesion && <span className="pi-error">{errors.profesion}</span>}
          </div>
        </div>

        {/* Fila: Ciudad + Teléfono */}
        <div className="pi-row">
          <div className="pi-field">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              id="ciudad"
              name="ciudad"
              type="text"
              value={values.ciudad}
              onChange={handleChange}
              placeholder="Ej. Guadalajara, México"
            />
          </div>

          <div className="pi-field">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={values.telefono}
              onChange={handleChange}
              placeholder="Ej. +52 33 1234 5678"
            />
            {errors.telefono && <span className="pi-error">{errors.telefono}</span>}
          </div>
        </div>

        {/* Email */}
        <div className="pi-field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Ej. juan@correo.com"
          />
          {errors.email && <span className="pi-error">{errors.email}</span>}
        </div>

        {/* Descripción */}
        <div className="pi-field">
          <label htmlFor="descripcion">Descripción / Perfil profesional</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={values.descripcion}
            onChange={handleChange}
            placeholder="Breve resumen sobre ti y tus objetivos profesionales..."
            rows={4}
          />
        </div>

        {/* Links */}
        <fieldset className="pi-links">
          <legend>Links</legend>
          <div className="pi-field">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={values.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/tu-perfil"
            />
          </div>
          <div className="pi-field">
            <label htmlFor="github">GitHub</label>
            <input
              id="github"
              name="github"
              type="url"
              value={values.github}
              onChange={handleChange}
              placeholder="https://github.com/tu-usuario"
            />
          </div>
          <div className="pi-field">
            <label htmlFor="portfolio">Portfolio</label>
            <input
              id="portfolio"
              name="portfolio"
              type="url"
              value={values.portfolio}
              onChange={handleChange}
              placeholder="https://tu-portfolio.com"
            />
          </div>
        </fieldset>

        <button type="submit" className="pi-btn">Guardar datos</button>
      </form>
    </div>
  )
}
