const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

function isValidUrl(url) {
  if (!url || !url.trim()) return true // empty is ok (optional)
  return URL_REGEX.test(url.trim())
}

//valida longitud mínima y máxima de un campo de texto
function validateLength(value, field, min, max) {
  const len = value?.trim().length ?? 0
  if (len < min) return `Mínimo ${min} caracteres (${len}/${min})`
  if (len > max) return `Máximo ${max} caracteres (${len}/${max})`
  return null
}

export function validatePersonalInfo(values) {
  const errors = {}

  // Nombre: obligatorio, 2–80 caracteres
  if (!values.nombre?.trim()) {
    errors.nombre = 'El nombre es requerido'
  } else {
    const e = validateLength(values.nombre, 'nombre', 2, 80)
    if (e) errors.nombre = e
  }

  // Email: obligatorio + formato
  if (!values.email?.trim()) {
    errors.email = 'El email es requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'El email no es válido'
  }

  // Teléfono: obligatorio, 6–20 caracteres
  if (!values.telefono?.trim()) {
    errors.telefono = 'El teléfono es requerido'
  } else {
    const e = validateLength(values.telefono, 'telefono', 6, 20)
    if (e) errors.telefono = e
  }

  // Profesión: obligatorio, 3–80 caracteres
  if (!values.profesion?.trim()) {
    errors.profesion = 'La profesión es requerida'
  } else {
    const e = validateLength(values.profesion, 'profesion', 3, 80)
    if (e) errors.profesion = e
  }

  // Ciudad: opcional, pero si se escribe 2–60 caracteres
  if (values.ciudad?.trim()) {
    const e = validateLength(values.ciudad, 'ciudad', 2, 60)
    if (e) errors.ciudad = e
  }

  // Descripción: opcional, pero si se escribe 20–600 caracteres
  if (values.descripcion?.trim()) {
    const e = validateLength(values.descripcion, 'descripcion', 20, 600)
    if (e) errors.descripcion = e
  }

  if (values.linkedin && !isValidUrl(values.linkedin)) {
    errors.linkedin = 'La URL de LinkedIn no es válida'
  }
  if (values.github && !isValidUrl(values.github)) {
    errors.github = 'La URL de GitHub no es válida'
  }
  if (values.portfolio && !isValidUrl(values.portfolio)) {
    errors.portfolio = 'La URL del portfolio no es válida'
  }

  return errors
}

export function validateSkill(values, existingSkills = []) {
  const errors = {}

  // Nombre: obligatorio, 2–50 caracteres, sin duplicados
  if (!values.nombre?.trim()) {
    errors.nombre = 'El nombre de la habilidad es requerido'
  } else if (existingSkills.includes(values.nombre.trim().toLowerCase())) {
    errors.nombre = 'Esta habilidad ya fue agregada'
  } else {
    const e = validateLength(values.nombre, 'nombre', 2, 50)
    if (e) errors.nombre = e
  }

  if (!values.categoria) {
    errors.categoria = 'La categoría es requerida'
  }

  if (!values.nivel) {
    errors.nivel = 'El nivel es requerido'
  } else if (values.nivel < 1 || values.nivel > 100) {
    errors.nivel = 'El nivel debe estar entre 1 y 100'
  }

  // Descripción breve: opcional, 5–120 caracteres si se escribe
  if (values.descripcion?.trim()) {
    const e = validateLength(values.descripcion, 'descripcion', 5, 120)
    if (e) errors.descripcion = e
  }

  return errors
}

export function validateProyecto(values, existingNames = []) {
  const errors = {}

  // Nombre: obligatorio, 2–80 caracteres, sin duplicados
  if (!values.nombre?.trim()) {
    errors.nombre = 'El nombre del proyecto es requerido'
  } else if (existingNames.includes(values.nombre.trim().toLowerCase())) {
    errors.nombre = 'Ya existe un proyecto con ese nombre'
  } else {
    const e = validateLength(values.nombre, 'nombre', 2, 80)
    if (e) errors.nombre = e
  }

  // Descripción: obligatoria, 20–500 caracteres
  if (!values.descripcion?.trim()) {
    errors.descripcion = 'La descripción es requerida'
  } else {
    const e = validateLength(values.descripcion, 'descripcion', 20, 500)
    if (e) errors.descripcion = e
  }

  // Tecnologías: obligatorias, 2–150 caracteres
  if (!values.tecnologias?.trim()) {
    errors.tecnologias = 'Las tecnologías son requeridas'
  } else {
    const e = validateLength(values.tecnologias, 'tecnologias', 2, 150)
    if (e) errors.tecnologias = e
  }

  if (values.repositorio && !isValidUrl(values.repositorio)) {
    errors.repositorio = 'La URL del repositorio no es válida'
  }
  if (values.deploy && !isValidUrl(values.deploy)) {
    errors.deploy = 'La URL del deploy no es válida'
  }
  if (values.imagen && !isValidUrl(values.imagen)) {
    errors.imagen = 'La URL de la imagen no es válida'
  }

  return errors
}

export function validateEducacion(values) {
  const errors = {}

  // Institución: obligatoria, 3–100 caracteres
  if (!values.institucion?.trim()) {
    errors.institucion = 'La institución es requerida'
  } else {
    const e = validateLength(values.institucion, 'institucion', 3, 100)
    if (e) errors.institucion = e
  }

  // Programa: obligatorio, 3–100 caracteres
  if (!values.programa?.trim()) {
    errors.programa = 'El programa es requerido'
  } else {
    const e = validateLength(values.programa, 'programa', 3, 100)
    if (e) errors.programa = e
  }

  // Periodo: obligatorio, 4–30 caracteres
  if (!values.periodo?.trim()) {
    errors.periodo = 'El periodo es requerido'
  } else {
    const e = validateLength(values.periodo, 'periodo', 4, 30)
    if (e) errors.periodo = e
  }

  // Descripción: opcional, 10–400 caracteres si se escribe
  if (values.descripcion?.trim()) {
    const e = validateLength(values.descripcion, 'descripcion', 10, 400)
    if (e) errors.descripcion = e
  }

  if (values.enlace && !isValidUrl(values.enlace)) {
    errors.enlace = 'La URL del enlace no es válida'
  }

  return errors
}

export function validateExperiencia(values) {
  const errors = {}

  // Puesto: obligatorio, 2–80 caracteres
  if (!values.puesto?.trim()) {
    errors.puesto = 'El puesto es requerido'
  } else {
    const e = validateLength(values.puesto, 'puesto', 2, 80)
    if (e) errors.puesto = e
  }

  // Empresa: obligatoria, 2–80 caracteres
  if (!values.empresa?.trim()) {
    errors.empresa = 'La empresa es requerida'
  } else {
    const e = validateLength(values.empresa, 'empresa', 2, 80)
    if (e) errors.empresa = e
  }

  // Periodo: obligatorio, 4–30 caracteres
  if (!values.periodo?.trim()) {
    errors.periodo = 'El periodo es requerido'
  } else {
    const e = validateLength(values.periodo, 'periodo', 4, 30)
    if (e) errors.periodo = e
  }

  // Tecnologías: opcional, 2–150 caracteres si se escribe
  if (values.tecnologias?.trim()) {
    const e = validateLength(values.tecnologias, 'tecnologias', 2, 150)
    if (e) errors.tecnologias = e
  }

  // Descripción: opcional, 10–600 caracteres si se escribe
  if (values.descripcion?.trim()) {
    const e = validateLength(values.descripcion, 'descripcion', 10, 600)
    if (e) errors.descripcion = e
  }

  return errors
}
