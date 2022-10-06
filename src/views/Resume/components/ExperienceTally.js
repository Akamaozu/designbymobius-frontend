import { useEffect, useState } from 'react'
import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperienceTally = () => {
  const [ state ] = useView()

  const [ experiences, updateExperiences ] = useState(state?.experiences?.items ?? [])
  const [ experienceFilters, updateExperienceFilters ] = useState(state?.experiences?.filters ?? {})
  const [ experienceTypesMap, updateExperienceTypesMap ] = useState(state?.experiences?.typeMap ?? {})

  const [ technologyMap, updateTechnologyMap ] = useState(state?.technologies?.map ?? {})

  const [ isFiltered, updateIsFiltered ] = useState(state?.experiences?.isFiltered ?? false)
  const [ filteredExperiences, updateFilteredExperiences ] = useState(state?.experiences?.filteredExperiences ?? [])

  useEffect(() => {
    if (!state?.experiences || !state?.technologies) return

    updateExperiences([ ...state.experiences.items ])
    updateExperienceTypesMap({ ...state.experiences.typeMap })
    updateExperienceFilters({ ...state.experiences.filters })
    updateTechnologyMap({ ...state.technologies.map })
    updateIsFiltered(state.experiences.isFiltered)
    updateFilteredExperiences(
      state.experiences.isFiltered
       ? [ ...state.experiences.filteredExperiences ]
       : [ ...state.experiences.items ]
    )
  },
  [
    state,
    state?.experiences,
    state?.experiences?.items,
    state?.experiences?.types,
    state?.experiences?.typeMap,
    state?.experiences?.isFiltered,
    state?.experiences?.filteredExperiences,
    state?.experiences?.filters,
    state?.experiences?.filters?.types,
    state?.experiences?.filters?.technologies,
    state?.technologies,
    state?.technologies?.map,
  ])

  experienceFilters?.types?.sort()

  if (!experiences) {
    return (
      <span>loading...</span>
    )
  }

  return (
    <div
      style={{
        margin: '2em',
        fontWeight: 900,
        lineHeight: '1.1em',
        letterSpacing: '-1px',
      }}
    >
      <div
        style={{
          fontSize: '125%',
        }}
      >
        { experiences.length } Experiences
      </div>
      {
        isFiltered && (
          <div
            style={{
              fontSize: '125%',
              color: 'limegreen',
            }}
          >
            { filteredExperiences.length }
            {
              experienceFilters.types?.length > 0
              ? experienceFilters.types?.length > 1
                ? (
                    ' '
                    + experienceFilters.types.slice(0, -1).map(typeSlug => experienceTypesMap[ typeSlug ]?.label).join(', ')
                    + ' or ' + experienceFilters.types.slice(-1).map(typeSlug => experienceTypesMap[ typeSlug ]?.label).join(', ')
                  )
                : ' '+ experienceFilters.types.map(typeSlug => experienceTypesMap[ typeSlug ].label)
              : ''
            }

            {` Experience${filteredExperiences.length !== 1 ? 's':'' }`}
            {
              experienceFilters.technologies?.length > 0
              ? experienceFilters.technologies?.length > 1
                ? (
                    ' using '
                    + experienceFilters.technologies.slice(0, -1).map(slug => technologyMap[ slug ]?.label).join(', ')
                    + ' or ' + experienceFilters.technologies.slice(-1).map(slug => technologyMap[ slug ]?.label).join(', ')
                  )
                : ' using '+ experienceFilters.technologies.map(slug => technologyMap[ slug ].label)
              : ''

            }
          </div>
        )
      }
    </div>
  )
}

export default ExperienceTally
