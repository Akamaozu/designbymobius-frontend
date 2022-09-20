import { useEffect, useState } from 'react'
import Experience from './Experience'
import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperiencesList = () => {
  const [ state ] = useView()
  const [ sortedExperiences, updateSortedExperiences ] = useState()

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

    updateSortedExperiences(
      [...(state.experiences.isFiltered ? state.experiences.filteredExperiences : state.experiences.items)]
        .sort((a,b) => {
          // sort newer start date higher
          if (a.start > b.start) return -1
          if (a.start < b.start) return 1

          // sort newer end date higher
          if (a.end > b.end) return -1
          if (a.end < b.end) return 1

          return 0
        })
    )
  },
  [
    state,
    state?.experiences,
    state?.experiences?.items,
    state?.experiences?.isFiltered,
    state?.experiences?.filteredExperiences,
  ])

  return (
    <div className="Experiences">
      {
        !sortedExperiences
          ? <span>loading...</span>
          : (
              sortedExperiences.length > 0
                ? sortedExperiences.map(experience => {
                    return <Experience data={experience} key={experience.slug} />
                  })
                : <span>No Experience Found</span>
            )
      }
    </div>
  )
}

export default ExperiencesList
