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
  const technologyMap = technologies.reduce((technologyMap, technology) => {
    technologyMap[technology.slug] = technology
    return technologyMap
  }, {}) ?? {}

  // create filter update apis
  const typeFilter = {
    add: type => {
      if (!state?.experiences || Object.prototype.toString.call(state.experiences.filters) !== '[object Array]') throw new Error('experience store or filters not found')

      let updated = false
      let updates = { ...state }
      let updateFilters = state.experiences.filters

      if (!updateFilters.types) updates.types = []
      if (!updateFilters.types.includes(type)) {
        updateFilters.types.push(type)
        updated = true
      }

      if (updated) updateState(updates)
    },
    del: type => {
      if (!state?.experiences || Object.prototype.toString.call(state.experiences.filters) !== '[object Array]') throw new Error('experience store or filters not found')

      let updated = false
      let updates = { ...state }
      let updateFilters = state.experiences.filters

      if (!updateFilters.types) updateFilters.types = []
      if (updateFilters.types.includes(type)) {
        const typeIndex = updateFilters.types.indexOf(type)
        updateFilters.types.splice(typeIndex, 1)
        updated = true
      }

      if (updated) updateState(updates)
    }
  }
  const technologyFilter = {
    add: technology => {
      if (!state?.experiences || Object.prototype.toString.call(state.experiences.filters) !== '[object Array]') throw new Error('experiences store or filters not found')

      let updated = false
      let updates = { ...state }
      let updateFilters = updates.experiences.filters

      if (!updateFilters.technologies) updateFilters.technologies = []
      if (updateFilters.technologies.indexOf(technology) === -1) {
        updateFilters.technologies.push(technology)
        updated = true
      }

      if (updated) updateState(updates)
    },
    del: technology => {
      if (!state?.experiences || Object.prototype.toString.call(state.experiences.filters) !== '[object Array]') throw new Error('experiences store or filters not found')

      let updated = false
      let updates = { ...state }
      let updateFilters = updates.experiences.filters

      if (!updateFilters.technologies) updateFilters.technologies = []
      if (updateFilters.technologies.indexOf(technology) > -1) {
        const technologyIndex = updateFilters.technologies.indexOf(technology)
        updateFilters.technologies.splice(technologyIndex, 1)
        updated = true
      }

      if (updated) updateState(updates)
    }
  }

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

    updateIsFiltered(filtered)
    updateFilteredExperiences(updatedFilteredExperiences)
  }, [ state ])

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
