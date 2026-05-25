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
