import { useEffect, useState } from 'react'
import Experience from './Experience'
import viewContext from '../contexts/view'

const PROFESSIONAL_EXPERIENCE_TYPE_MAP = {
  entrepreneur: 'entrepreneur',
  employment: 'employment',
  contract: 'contract',
}

const { useView } = viewContext

const ExperiencesList = () => {
  const [ state ] = useView()
  const [ sortedExperiences, updateSortedExperiences ] = useState()
  const [ experienceTypeGroups, setExperienceTypeGroups ] = useState()

  const stringifiedExperiences = JSON.stringify(state?.experiences?.items)
  const stringifiedFilteredExperiences = JSON.stringify(state?.experiences?.filteredExperiences)

  useEffect(() => {
    if (!state?.experiences) return

    if (
      state.experiences.isFiltered
      &&  (
            !state?.experiences?.filteredExperiences
            || !state.experiences.filteredExperiences.hasOwnProperty('length')
          )
    ) {
      return
    }

    const recalculatedSortedExperiences = [
        ...(
          state.experiences.isFiltered
            ? state.experiences.filteredExperiences
            : state.experiences.items
        )
      ]
        .sort((a,b) => {
          // sort newer start date higher
          if (a.start > b.start) return -1
          if (a.start < b.start) return 1

          // sort newer end date higher
          if (a.end > b.end) return -1
          if (a.end < b.end) return 1

          return 0
        })

    const experience_type_group_map = {}

    recalculatedSortedExperiences.forEach( experience => {
      const experience_type_group = PROFESSIONAL_EXPERIENCE_TYPE_MAP.hasOwnProperty( experience.type )
        ? 'professional'
        : 'other'

      if (!experience_type_group_map[ experience_type_group ]) experience_type_group_map[ experience_type_group ] = []

      experience_type_group_map[ experience_type_group ].push( experience )
    })

    setExperienceTypeGroups( experience_type_group_map )
    updateSortedExperiences( recalculatedSortedExperiences )
  },
  [
    state?.experiences,
    state?.experiences?.isFiltered,
    stringifiedExperiences,
    stringifiedFilteredExperiences,
  ])

  return (
    <div className="Experiences">
      {
        !sortedExperiences
          ? <span>loading...</span>
          : (
              sortedExperiences.length === 0
                ? <span>No Experience Found</span>
                : <>
                    {
                      !experienceTypeGroups?.[ 'professional' ] || experienceTypeGroups[ 'professional' ].length === 0
                        ? null
                        : <>
                            <div
                              style={{
                                color: '#888',
                                fontWeight: 900,
                                paddingBottom: '1em',
                                letterSpacing: '-1px',
                              }}
                            >
                              { experienceTypeGroups[ 'professional' ].length } Work { experienceTypeGroups[ 'professional' ].length === 1 ? 'Experience' : 'Experiences' }
                            </div>
                            {
                              experienceTypeGroups[ 'professional' ].map(experience => {
                                return <Experience data={experience} key={experience.slug} showNotes={state?.experiences?.showNotes} />
                              })
                            }
                          </>
                    }
                    {
                      !experienceTypeGroups?.[ 'other' ] || experienceTypeGroups[ 'other' ].length === 0
                        ? null
                        : <>
                            <div
                              style={{
                                color: '#888',
                                fontWeight: 900,
                                paddingTop: '4em',
                                paddingBottom: '1em',
                                letterSpacing: '-1px',
                              }}
                            >
                              { experienceTypeGroups[ 'other' ].length } Related { experienceTypeGroups[ 'other' ].length === 1 ? 'Experience' : 'Experiences' }
                            </div>
                            {
                              experienceTypeGroups[ 'other' ].map(experience => {
                                return <Experience data={experience} key={experience.slug} showNotes={state?.experiences?.showNotes} />
                              })
                            }
                          </>
                    }
                  </>
            )
      }
    </div>
  )
}

export default ExperiencesList
