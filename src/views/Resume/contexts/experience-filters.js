import { createContext, useContext, useMemo, useState } from 'react'

const ExperienceFiltersContext = createContext()

const ExperienceFiltersProvider = props => {
  const [experienceFilters, updateExperienceFilters] = useState({})
  const memoizedFilters = useMemo(() => [experienceFilters, updateExperienceFilters], [experienceFilters])
  return <ExperienceFiltersContext.Provider value={memoizedFilters} {...props} />
}

const useExperienceFilters = () => {
  const context = useContext(ExperienceFiltersContext)
  if (!context) throw new Error ('useExperienceFilters must be used within an ExperienceFiltersProvider')

  return context
}

const api = {
  ExperienceFiltersProvider,
  useExperienceFilters,
}

export default api
