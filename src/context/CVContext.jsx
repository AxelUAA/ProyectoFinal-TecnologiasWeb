import { createContext, useContext } from 'react'

const CVContext = createContext(null)

export function CVProvider({ children }) {
  return (
    <CVContext.Provider value={{}}>
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  return useContext(CVContext)
}
