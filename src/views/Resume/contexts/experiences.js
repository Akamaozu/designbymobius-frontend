import { createContext, useContext, useMemo, useState } from 'react'
import data from '../../../data'

const experiences = data?.experiences?.items ?? []
const experienceTypes = data?.experiences?.types ?? []
const ExperiencesContext = createContext()

const ExperiencesProvider = props => {
  const [experiences, updateExperiences] = useState({ items: experiences, types: experienceTypes })
  const memoized = useMemo(() => [experiences, updateExperiences], [experiences])
  return <ExperiencesContext.Provider value={memoized} {...props} />
}

const useExperiences = () => {
  const context = useContext(ExperiencesContext)
  if (!context) throw new Error ('useExperiences must be used within an ExperiencesProvider')

  return context
}

const api = {
  ExperiencesProvider,
  useExperiences,
}

export default api
