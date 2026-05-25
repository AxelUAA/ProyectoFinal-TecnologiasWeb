import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CVContext = createContext(null)

const initialPersonalInfo = {
  nombre: '',
  email: '',
  telefono: '',
  profesion: '',
  ciudad: '',
  descripcion: '',
  foto: null,
  linkedin: '',
  github: '',
  portfolio: '',
}

export function CVProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useLocalStorage('cv-personal', initialPersonalInfo)
  const [skills, setSkills] = useLocalStorage('cv-skills', [])
  const [educacion, setEducacion] = useLocalStorage('cv-educacion', [])
  const [experiencia, setExperiencia] = useLocalStorage('cv-experiencia', [])
  const [proyectos, setProyectos] = useLocalStorage('cv-proyectos', [])

  // Personal info
  const updatePersonalInfo = (data) => {
    setPersonalInfo(prev => ({ ...prev, ...data }))
  }

  // Skills
  const addSkill = (skill) => {
    setSkills(prev => [...prev, { ...skill, id: Date.now() }])
  }
  const editSkill = (id, data) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }
  const deleteSkill = (id) => {
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  // Educación
  const addEducacion = (item) => {
    setEducacion(prev => [...prev, { ...item, id: Date.now() }])
  }
  const editEducacion = (id, data) => {
    setEducacion(prev => prev.map(e => e.id === id ? { ...e, ...data } : e))
  }
  const deleteEducacion = (id) => {
    setEducacion(prev => prev.filter(e => e.id !== id))
  }

  // Experiencia
  const addExperiencia = (item) => {
    setExperiencia(prev => [...prev, { ...item, id: Date.now() }])
  }
  const editExperiencia = (id, data) => {
    setExperiencia(prev => prev.map(e => e.id === id ? { ...e, ...data } : e))
  }
  const deleteExperiencia = (id) => {
    setExperiencia(prev => prev.filter(e => e.id !== id))
  }

  // Proyectos
  const addProyecto = (item) => {
    setProyectos(prev => [...prev, { ...item, id: Date.now() }])
  }
  const editProyecto = (id, data) => {
    setProyectos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }
  const deleteProyecto = (id) => {
    setProyectos(prev => prev.filter(p => p.id !== id))
  }

  // Reset global
  const resetCV = () => {
    setPersonalInfo(initialPersonalInfo)
    setSkills([])
    setEducacion([])
    setExperiencia([])
    setProyectos([])
  }

  return (
    <CVContext.Provider value={{
      personalInfo, updatePersonalInfo,
      skills, addSkill, editSkill, deleteSkill,
      educacion, addEducacion, editEducacion, deleteEducacion,
      experiencia, addExperiencia, editExperiencia, deleteExperiencia,
      proyectos, addProyecto, editProyecto, deleteProyecto,
      resetCV,
    }}>
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)
  if (!context) throw new Error('useCV debe usarse dentro de CVProvider')
  return context
}
