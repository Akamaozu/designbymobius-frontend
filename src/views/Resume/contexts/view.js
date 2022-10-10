import { createContext, useContext, useEffect, useState } from 'react'
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

  initialState.experiences.typeMap = initialState.experiences.types.reduce((experienceTypeMap, experienceType) => {
    experienceTypeMap[experienceType.slug] = experienceType
    return experienceTypeMap
  }, {})

  initialState.technologies.map = initialState.technologies.items.reduce((technologyMap, technology) => {
    technologyMap[technology.slug] = technology
    return technologyMap
  }, {})

  initialState.technologies.typeMap = initialState.technologies.types.reduce((technologyTypeMap, technologyType) => {
    technologyTypeMap[technologyType.slug] = technologyType
    return technologyTypeMap
  }, {})

  if (props?.initialState?.types) initialState.experiences.filters.types = props.initialState.types.filter(type => initialState.experiences.typeMap.hasOwnProperty(type))
  if (props?.initialState?.technologies) initialState.experiences.filters.technologies = props.initialState.technologies.filter(tech => initialState.technologies.map.hasOwnProperty(tech))

  const [state, updateState] = useState(initialState)
  const technologyMap = state.technologies.map
  const experienceFilters = state.experiences.filters

  useEffect(() => {
    let filtered = false
    const updatedFilteredExperiences = experiences.filter(experience => {

      if (state?.experiences?.filters?.types && state?.experiences?.filters?.types.length > 0) {
        filtered = true
        if (state?.experiences?.filters?.types.indexOf(experience.type) === -1) return false
      }

      if (state?.experiences?.filters?.technologies && state?.experiences?.filters?.technologies.length > 0) {
        filtered = true

        // check expanded technologies for filtered techs
        const allExperienceTechnologies = getDependentTechnologies(experience.technologies, technologyMap)
        let match = false
        allExperienceTechnologies.forEach(technologySlug => {
          if (match) return
          if (state?.experiences?.filters?.technologies.indexOf(technologySlug) > -1) match = true
        })

        return match
      }

      return true
    })

    const updatedState = { ...state }
    updatedState.experiences.isFiltered = filtered ?? false
    updatedState.experiences.filteredExperiences = updatedFilteredExperiences ?? []

    updateState(updatedState)
  }, [
    state?.experiences?.items,
    state?.experiences?.types,
    state?.experiences?.isFiltered,
    JSON.stringify(state?.experiences?.filters?.types),
    JSON.stringify(state?.experiences?.filters?.technologies),
    state?.technologies?.map,
  ])

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
