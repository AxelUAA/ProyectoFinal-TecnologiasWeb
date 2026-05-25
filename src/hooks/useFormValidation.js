import { useState } from 'react'

export function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (onSuccess) => (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSuccess(values)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, handleSubmit, reset, setValues }
}
