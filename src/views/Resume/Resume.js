import { useEffect, useState } from 'react'
import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import ExperiencesFilterOption from './components/ExperiencesFilterOption'
import ExperiencesList from './components/ExperiencesList'
import data from '../../data'
import utils from '../../utils'
import './style.css'

const { getDependentTechnologies } = utils

const Resume = () => {
  const experiences = data?.experiences?.items ?? []
  const experienceTypes = data?.experiences?.types ?? []

  const technologies = data?.technologies?.items ?? []
  const technologyMap = data?.technologies?.items.reduce((technologyMap, technology) => {
    technologyMap[technology.slug] = technology
    return technologyMap
  }, {}) ?? {}

  // create filters data-store and updates api
  const [ experienceFilters, updateExperienceFilters ] = useState({})
  const typeFilter = {
    add: type => {
      let updated = false
      let updates = { ...experienceFilters }

      if (!updates.types) updates.types = []
      if (!updates.types.includes(type)) {
        updates.types.push(type)
        updated = true
      }

      if (updated) updateExperienceFilters(updates)
    },
    del: type => {
      let updated = false
      let updates = { ...experienceFilters }

      if (!updates.types) updates.types = []
      if (updates.types.includes(type)) {
        const typeIndex = updates.types.indexOf(type)
        updates.types.splice(typeIndex, 1)
        updated = true
      }

      if (updated) updateExperienceFilters(updates)
    }
  }
  const technologyFilter = {
    add: technology => {
      let updated = false
      let updates = { ...experienceFilters }

      if (!updates.technologies) updates.technologies = []
      if (!updates.technologies.includes(technology)) {
        updates.technologies.push(technology)
        updated = true
      }

      if (updated) updateExperienceFilters(updates)
    },
    del: technology => {
      let updated = false
      let updates = { ...experienceFilters }

      if (!updates.technologies) updates.technologies = []
      if (updates.technologies.includes(technology)) {
        const technologyIndex = updates.technologies.indexOf(technology)
        updates.technologies.splice(technologyIndex, 1)
        updated = true
      }

      if (updated) updateExperienceFilters(updates)
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
        if (!experienceFilters.types.includes(experience.type)) return false
      }

      if (experienceFilters.technologies && experienceFilters.technologies.length > 0) {
        filtered = true

        // check expanded technologies for filtered techs
        const allExperienceTechnologies = getDependentTechnologies(experience.technologies, technologyMap)
        let match = false
        allExperienceTechnologies.forEach(technologySlug => {
          if (match) return
          if (experienceFilters.technologies.includes(technologySlug)) match = true
        })

        return match
      }

      return true
    })

    updateIsFiltered(filtered)
    updateFilteredExperiences(updatedFilteredExperiences)
  }, [ experiences, experienceTypes, experienceFilters ])

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
    <>
      <ViewTitle>Resume</ViewTitle>
      <ViewSubtitle>
        Curated experience from <span className="emphasis">10+ years writing code</span>
      </ViewSubtitle>
      <div className="Experiences-filters">
        <div className="Experiences-filters-title">Filter Experiences</div>
        <div className="Experiences-filter Experiences-filter-type">
          <div className="Experiences-filter-title">Type</div>
          {
            experienceTypes
              .sort((a,b) => {
                // label, alphabetically
                if (a.label > b.label) return 1
                if (a.label < b.label) return -1
                return 0
              })
              .map(experienceType => {
                return (
                  <ExperiencesFilterOption
                    active={experienceFilters.types?.includes(experienceType.slug)}
                    key={experienceType.slug}
                    slug={experienceType.slug}
                    onClick={() => {
                      if (!experienceFilters.types) return typeFilter.add(experienceType.slug)

                      if (experienceFilters.types.includes(experienceType.slug)) typeFilter.del(experienceType.slug)
                      else typeFilter.add(experienceType.slug)
                    }}
                  >
                    { experienceType.label }
                  </ExperiencesFilterOption>
                )
              })
          }
        </div>
        <div className="Experiences-filter Experiences-filter-technology">
          <div className="Experiences-filter-title">technology</div>
          {
            technologies
              .sort((a,b) => {
                // label, alphabetically
                if (a.label > b.label) return 1
                if (a.label < b.label) return -1
                return 0
              })
              .map(technology => {
                return (
                  <ExperiencesFilterOption
                    active={experienceFilters.technologies?.includes(technology.slug)}
                    slug={technology.slug}
                    onClick={() => {
                      if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                      if (experienceFilters.technologies?.includes(technology.slug)) technologyFilter.del(technology.slug)
                      else technologyFilter.add(technology.slug)
                    }}
                  >
                    { technology.label }
                  </ExperiencesFilterOption>
                )
              })
          }
        </div>
      </div>
      <div className="Experiences-filter-results">
        <span>
          {
            `${experiences.length} Items`
          }
          {
            isFiltered
              ? `, ${sortedExperiences.length} Match${sortedExperiences.length !== 1 ? 'es' : '' }`
              : null
          }
        </span>
      </div>
      <ExperiencesList experiences={sortedExperiences} />
    </>
  )
}

export default Resume
