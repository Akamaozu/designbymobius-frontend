import { useEffect, useState } from 'react'

import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import ExperiencesList from './components/ExperiencesList'
import ExperienceFilters from './components/ExperienceFilters'
import viewContext from './contexts/view'
import './style.css'

const { ViewProvider, useView } = viewContext

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

    updateExperiences(state.experiences.items)
    updateExperienceTypesMap(state.experiences.types.reduce(( typeMap, type ) => {
      typeMap[ type.slug ] = type
      return typeMap
    }, {}))
    updateExperienceFilters(state.experiences.filters)
    updateTechnologyMap(state.technologies.map)
    updateIsFiltered(state.experiences.isFiltered)
    updateFilteredExperiences(
      state.experiences.isFiltered
       ? state.experiences.filteredExperiences
       : state.experiences.items
    )
  },
  [
    state,
    state?.experiences,
    state?.experiences?.items,
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

const Resume = () => {
  return (
    <ViewProvider>
      {
        true && (
          <>
            <ViewTitle>Resume</ViewTitle>
            <ViewSubtitle>
              Curated experience from <span className="emphasis">10+ years writing code</span>
            </ViewSubtitle>
          </>
        )
      }
      <div
        style={{
          marginLeft: '2em',
        }}
      >
        <div
          style={{
            fontSize: '1.75em',
            fontWeight: 900,
            letterSpacing: '-1px',
          }}
        >
          Uzo Olisemeka
        </div>
        <div
          style={{

          }}
        >
          👶 Born in Nigeria
        </div>
        <div
          style={{

          }}
        >
          🍁 Live in Canada
        </div>
        <div
          style={{

          }}
        >
          👨‍💻 Software Engineer with {(new Date()).getFullYear() - 2010 }+ years experience
        </div>
      </div>
      <ExperienceTally />
      <ExperienceFilters />
      <ExperiencesList />
    </ViewProvider>
  )
}

export default Resume
