import { useEffect, useState } from 'react'
import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperienceTally = () => {
  const [ state ] = useView()

  const [ experiences, updateExperiences ] = useState()
  const [ experienceFilters, updateExperienceFilters ] = useState()
  const [ experienceTypesMap, updateExperienceTypesMap ] = useState()

  const [ technologyMap, updateTechnologyMap ] = useState()

  const [ isFiltered, updateIsFiltered ] = useState()
  const [ filteredExperiences, updateFilteredExperiences ] = useState()

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
    <div className='Experiences-tally'>
      <div className='Experiences-tally-unfiltered'>{ experiences.length } Experiences</div>
      {
        isFiltered && (
          <div className='Experiences-tally-filtered'>
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
