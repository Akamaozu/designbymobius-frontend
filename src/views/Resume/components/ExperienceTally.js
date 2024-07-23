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

  const experience_year_map = {}
  experiences?.forEach( experience => {
    const {
      slug,
      start,
      end,
    } = experience ?? {}

    if (!slug || !start) return

    if (!experience_year_map[ start ]) experience_year_map[ start ] = []

    experience_year_map[ start ].push( slug )

    if (start === end) return

    const start_int = parseInt( start )
    const end_int = end
      ? parseInt( end )
      : (new Date()).getFullYear()

    if (start_int > end_int) return

    for (var i = start_int + 1; i <= end_int; i += 1) {
      if (!experience_year_map[ i ]) experience_year_map[ i ] = []

      experience_year_map[ i ].push( slug )
    }
  })

  const years_of_experience = Object
    .keys( experience_year_map )
    .length

  const technology_type_map = state?.technologies?.items?.reduce(
    ( map, technology ) => {
      const {
        slug,
        type,
      } = technology ?? {}

      if (!map[ type ]) map[ type ] = []

      map[ type ].push( slug )

      return map
    },
    {}
  )

  console.log({ state, technology_type_map })

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
      <div className='Experiences-tally-unfiltered'>
        { years_of_experience } { years_of_experience === 1 ? 'Year' : 'Years' } of Experience.
        {' '}
        { technology_type_map[ 'language' ].length } { technology_type_map[ 'language' ].length === 1 ? 'Language' : 'Languages' }.
        {' '}
        { technology_type_map[ 'database' ].length } { technology_type_map[ 'database' ].length === 1 ? 'Database' : 'Databases' }.
        {' '}
        { experiences.length } { experiences.length === 1 ? 'Experience' : 'Experiences' }.
      </div>
      {
        isFiltered && (
          <>
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
            {
              process.env.REACT_APP_PUBLIC_URL
              && <>
                <div className='Experiences-tally-filtered-caveat'>
                  <i>(view full list of experiences at: <a href={ `${ process.env.REACT_APP_PUBLIC_URL }/resume` } target="_blank" >{ process.env.REACT_APP_PUBLIC_URL }/resume</a>)</i>
                </div>
              </>
            }
          </>
        )
      }
    </div>
  )
}

export default ExperienceTally
