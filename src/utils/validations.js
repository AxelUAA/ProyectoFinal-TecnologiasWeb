const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

function isValidUrl(url) {
  if (!url || !url.trim()) return true // empty is ok (optional)
  return URL_REGEX.test(url.trim())
}

export function validatePersonalInfo(values) {
  const errors = {}

  if (!values.nombre?.trim()) errors.nombre = 'El nombre es requerido'
  if (!values.email?.trim()) {
    errors.email = 'El email es requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'El email no es válido'
  }
  if (!values.telefono?.trim()) errors.telefono = 'El teléfono es requerido'
  if (!values.profesion?.trim()) errors.profesion = 'La profesión es requerida'

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

  if (!values.nombre?.trim()) {
    errors.nombre = 'El nombre de la habilidad es requerido'
  } else if (existingSkills.includes(values.nombre.trim().toLowerCase())) {
    errors.nombre = 'Esta habilidad ya fue agregada'
  }

  if (!values.nivel) {
    errors.nivel = 'El nivel es requerido'
  } else if (values.nivel < 1 || values.nivel > 100) {
    errors.nivel = 'El nivel debe estar entre 1 y 100'
  }

  return errors
}

export function validateProyecto(values, existingNames = []) {
  const errors = {}

  if (!values.nombre?.trim()) {
    errors.nombre = 'El nombre del proyecto es requerido'
  } else if (existingNames.includes(values.nombre.trim().toLowerCase())) {
    errors.nombre = 'Ya existe un proyecto con ese nombre'
  }

  if (!values.descripcion?.trim()) errors.descripcion = 'La descripción es requerida'
  if (!values.tecnologias?.trim()) errors.tecnologias = 'Las tecnologías son requeridas'

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

  if (!values.institucion?.trim()) errors.institucion = 'La institución es requerida'
  if (!values.programa?.trim()) errors.programa = 'El programa es requerido'
  if (!values.periodo?.trim()) errors.periodo = 'El periodo es requerido'

  if (values.enlace && !isValidUrl(values.enlace)) {
    errors.enlace = 'La URL del enlace no es válida'
  }

  return errors
}

export function validateExperiencia(values) {
  const errors = {}

  if (!values.puesto?.trim()) errors.puesto = 'El puesto es requerido'
  if (!values.empresa?.trim()) errors.empresa = 'La empresa es requerida'
  if (!values.periodo?.trim()) errors.periodo = 'El periodo es requerido'

  return errors
}
