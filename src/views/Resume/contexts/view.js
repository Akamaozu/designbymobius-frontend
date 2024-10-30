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
  initialState = createStore(initialState, 'experiences', { items: experiences, types: experienceTypes, filters: {}, showNotes: props?.initialState?.notes?.trim() === 'open' })
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
    technologyTypeMap[ technologyType.slug ] = technologyType
    return technologyTypeMap
  }, {})

  initialState.technologies.typeMembersMap = initialState.technologies.items.reduce((technologyTypeMap, technology) => {
    const technologyType = technology.type
    if (!technologyType) return technologyTypeMap

    if (!technologyTypeMap.hasOwnProperty( technologyType )) technologyTypeMap[ technologyType ] = []
    technologyTypeMap[ technologyType ].push( technology.slug )

    return technologyTypeMap
  }, {})

  // sort technology type group members alphabetically
  Object
    .keys( initialState.technologies.typeMembersMap )
    .forEach( type_slug => {

      initialState.technologies.typeMembersMap[ type_slug ]
        .sort(( tech_a_slug, tech_b_slug ) => {
          const tech_a = initialState.technologies.map[ tech_a_slug ]
          const tech_b = initialState.technologies.map[ tech_b_slug ]

          if (tech_a.label > tech_b.label) return 1
          if (tech_a.label < tech_b.label) return -1
          return 0
      })
    })

  initialState.experiences.yearMap = initialState.experiences.items.reduce(( map, experience ) => {
    const {
      slug: experience_slug,
      start: start_year,
      end: end_year,
    } = experience ?? {}

    if (!experience_slug || !start_year) return map

    if (!map.hasOwnProperty( start_year )) map[ start_year ] = []

    map[ start_year ].push( experience_slug )
    if (start_year === end_year) return map

    const start_year_int = parseInt( start_year )
    const end_year_int = end_year
      ? parseInt( end_year )
      : ( new Date() ).getFullYear()

    if (start_year_int > end_year_int) return map

    for( let experience_year = start_year_int + 1; experience_year <= end_year_int; experience_year += 1 ) {
      if (!map.hasOwnProperty( experience_year )) map[ experience_year ] = []
      map[ experience_year ].push( experience_slug )
    }

    return map
  }, {})

  initialState.technologies.tagMap = initialState.technologies.items.reduce(( map, technology ) => {
    if (!technology?.tags || !technology.tags?.length || technology.tags.length < 1) return map

    technology.tags.forEach( tag => {
      if (!map.hasOwnProperty( tag )) map[ tag ] = []

      map[ tag ].push( technology.slug )
    })

    return map
  }, {})

  Object
    .keys( initialState.technologies.tagMap )
    .forEach( type_slug => {

      initialState.technologies.tagMap[ type_slug ]
        .sort(( tech_a_slug, tech_b_slug ) => {
          const tech_a = initialState.technologies.map[ tech_a_slug ]
          const tech_b = initialState.technologies.map[ tech_b_slug ]

          if (tech_a.label > tech_b.label) return 1
          if (tech_a.label < tech_b.label) return -1
          return 0
      })
    })

  if (props?.initialState?.types) initialState.experiences.filters.types = props.initialState.types.filter(type => initialState.experiences.typeMap.hasOwnProperty(type))
  if (props?.initialState?.technologies) initialState.experiences.filters.technologies = props.initialState.technologies.filter(tech => initialState.technologies.map.hasOwnProperty(tech))

  const [state, updateState] = useState(initialState)
  const stringifiedExperiences = JSON.stringify(state?.experiences?.items)
  const stringifiedExperienceTypes = JSON.stringify(state?.experiences?.types)
  const stringifiedTypeFilters = JSON.stringify(state?.experiences?.filters?.types)
  const stringifiedTechnologyFilters = JSON.stringify(state?.experiences?.filters?.technologies)

  const is_filtering_experiences = state?.experiences?.isFiltered ?? false

  useEffect(() => {
    const experiences = JSON.parse( stringifiedExperiences )
    const experience_type_filters = JSON.parse( stringifiedTypeFilters )
    const experience_technology_filters = JSON.parse( stringifiedTechnologyFilters )

    let filtered = false
    const updatedFilteredExperiences = experiences?.filter(experience => {

      if (experience_type_filters && experience_type_filters.length > 0) {
        filtered = true
        if (experience_type_filters.indexOf(experience.type) === -1) return false
      }

      if (experience_technology_filters && experience_technology_filters.length > 0) {
        filtered = true

        // check expanded technologies for filtered techs
        const allExperienceTechnologies = getDependentTechnologies(experience.technologies, state?.technologies?.map)
        let match = false
        allExperienceTechnologies.forEach(technologySlug => {
          if (match) return
          if (experience_technology_filters.indexOf(technologySlug) > -1) match = true
        })

        return match
      }

      return true
    })

    updateState( latest_state => {
      const {
        experiences: latest_state_experiences,
      } = latest_state

      const state_to_use = {
        ...latest_state,
        experiences: {
          ...latest_state_experiences,
          isFiltered: filtered ?? false,
          filteredExperiences: updatedFilteredExperiences ?? []
        }
      }

      return state_to_use
    })
  }, [
    stringifiedExperiences,
    stringifiedExperienceTypes,
    is_filtering_experiences,
    state?.technologies?.map,
    stringifiedTypeFilters,
    stringifiedTechnologyFilters,
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
