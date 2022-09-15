import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import data from '../../../data'
import utils from '../../../utils'

const { getDependentTechnologies } = utils
const ViewContext = createContext()
const experiences = data?.experiences?.items ?? []
const experienceTypes = data?.experiences?.types ?? []
const technologies = data?.technologies?.items ?? []
const technologyTypes = data?.technologies?.types ?? []

const createStore = ( state = {}, storeName, storeState ) => {
  if (state.hasOwnProperty(storeName)) throw new Error (`store "${storeName}" already exists in ViewContext`)

  const modifiedState = { ...state }
  modifiedState[ storeName ] = storeState

  return modifiedState
}

const ViewProvider = props => {
  let initialState = {}
  initialState = createStore(initialState, 'experiences', { items: experiences, types: experienceTypes, filters: {} })
  initialState = createStore(initialState, 'technologies', { items: technologies, types: technologyTypes })

  initialState.technologies.map = initialState.technologies.items.reduce((technologyMap, technology) => {
    technologyMap[technology.slug] = technology
    return technologyMap
  }, {})

  const [state, updateState] = useState(initialState)
  // const memoized = useMemo(() => [state, updateState], [state])
  const technologyMap = state.technologies.map
  const experienceFilters = state.experiences.filters

  // filter experiences
  const [ isFiltered, updateIsFiltered ] = useState(false)
  const [ filteredExperiences, updateFilteredExperiences ] = useState([])
  useEffect(() => {
    let filtered = false
    const updatedFilteredExperiences = [...experiences].filter(experience => {

      if (experienceFilters.types && experienceFilters.types.length > 0) {
        filtered = true
        if (experienceFilters.types.indexOf(experience.type) == -1) return false
      }

      if (experienceFilters.technologies && experienceFilters.technologies.length > 0) {
        filtered = true

        // check expanded technologies for filtered techs
        const allExperienceTechnologies = getDependentTechnologies(experience.technologies, technologyMap)
        let match = false
        allExperienceTechnologies.forEach(technologySlug => {
          if (match) return
          if (experienceFilters.technologies.indexOf(technologySlug) > -1) match = true
        })

        return match
      }

      return true
    })

    const updatedState = { ...state }
    updatedState.experiences.isFiltered = filtered ?? false
    updatedState.experiences.filteredExperiences = updatedFilteredExperiences ?? []
    updateState(updatedState)

    updateIsFiltered(filtered)
    updateFilteredExperiences(updatedFilteredExperiences)
  }, [ state, isFiltered, filteredExperiences, experienceFilters, technologyMap ])

  return <ViewContext.Provider value={[ state, updateState ]} {...props} />
}

const useView = () => {
  const context = useContext(ViewContext)
  if (!context) throw new Error ('useView must be used within a ViewProvider')

  return context
}

const api = {
  ViewProvider,
  useView,
}

export default api
