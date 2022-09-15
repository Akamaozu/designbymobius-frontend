import { useEffect, useState } from 'react'
import Experience from './Experience'
import viewContext from '../contexts/view'
import utils from '../../../utils'

const { useView } = viewContext
const { getDependentTechnologies } = utils

const ExperiencesList = () => {
  const [ state, updateState ] = useView()
  const experiences = state?.experiences?.items ?? []
  const experienceTypes = state?.experiences?.types ?? []
  const experienceFilters = state?.experiences?.filters ?? {}

  const technologies = state?.technologies?.items ?? []
  const technologyMap = state?.technologies?.map ?? {}

  const isFiltered = state?.experiences?.isFiltered ?? false
  const filteredExperiences = state?.experiences?.filteredExperiences ?? []

  // sort filtered experiences
  const [ sortedExperiences, setSortedExperiences ] = useState([])
  useEffect(() => {
    const updatedSortedExperiences = [...filteredExperiences].sort((a,b) => {
      // sort newer start date higher
      if (a.start > b.start) return -1
      if (a.start < b.start) return 1

      // sort newer end date higher
      if (a.end > b.end) return -1
      if (a.end < b.end) return 1

      return 0
    })

    setSortedExperiences(updatedSortedExperiences)
  }, [ filteredExperiences ])

  return (
    <div className="Experiences">
      {
        sortedExperiences.length > 0
          ? sortedExperiences.map(experience => {
              return <Experience data={experience} key={experience.slug} />
            })
          : <span>No Experience Found</span>
      }
    </div>
  )
}

export default ExperiencesList
