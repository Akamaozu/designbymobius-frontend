import { useEffect, useState } from 'react'
import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import data from '../../data'
import './style.css'

const ExperienceNotesViewToggler = props => {
  const { showNotes, toggleViewState } = props
  return (
    <span onClick={ toggleViewState }>
      {
        showNotes
          ? 'Hide Notes'
          : 'Show Notes'
      }
    </span>
  )
}

const getDependentTechnologies = (technologies, technologyMap) => {
  const dependentTechnologies = []
  const queue = [...technologies]

  while (queue.length > 0) {
    const technologySlug = queue.shift()
    dependentTechnologies.push(technologySlug)

    const technology = technologyMap[technologySlug]
    if (technology.dependencies) technology.dependencies.forEach(dependencySlug => {
      if (!queue.includes(dependencySlug) && !dependentTechnologies.includes(dependencySlug)) queue.push(dependencySlug)
    })
  }

  return dependentTechnologies
}

const Experience = props => {
  const experience = props.data ?? {}
  const experienceType = data?.experiences?.types?.find(type => type.slug === experience.type) ?? {}
  const duration = experience.start === experience.end
                    ? experience.start
                    : `${experience.start} - ${experience.end}`
  const technologyMap = data.technologies.items.reduce((technologyMap, technology) => {
    technologyMap[technology.slug] = technology
    return technologyMap
  }, {})
  const expandedExperienceTechnologies = getDependentTechnologies(experience.technologies, technologyMap)
  const initialShowNotes = props.showNotes
  const [ showNotes, setShowNotes ] = useState(initialShowNotes ?? false)
  const [ experienceFilters, setExperienceFilters ] = useState({})

  return (
    <div className={ `Experience Experience-type-${experience.type}` }>
      <div className="Experience-header">
        <div className="Experience-title">{ experience.label }</div>
        <div className="Experience-type">{ experienceType.label }</div>
      </div>
      <div className="Experience-when">{ duration }</div>
      {
        experience.technologies
          ? (
              <div className="Experience-technologies">
                {
                  expandedExperienceTechnologies
                    .sort((a,b) => {
                      const aTech = technologyMap[a].label
                      const bTech = technologyMap[b].label

                      if (aTech > bTech) return 1
                      if (aTech < bTech) return -1

                      return 0
                    })
                    .map(technologySlug => {
                      const technologyDisplayName = technologyMap[technologySlug].label
                      return (
                        <div className={ `Experience-technology Experience-technology-${technologySlug}` }>{ technologyDisplayName }</div>
                      )
                    })
                }
              </div>
            )
          : null
      }
      {
        experience.nutshell
          ? <div className="Experience-nutshell">{ experience.nutshell }</div>
          : null
      }
      {
        experience.notes
          ? (
              <div className={ `Experience-notes Experience-notes-${showNotes ? 'shown' : 'hidden' }` }>
                {
                  experience.notes.map(note => {
                    return <div className="Experience-note">{ note }</div>
                  })
                }
              </div>
            )
          : null
      }
      {
        experience.notes
          ? (
              <div className="Experience-notes-view-toggle">
                <ExperienceNotesViewToggler
                  showNotes={ showNotes }
                  toggleViewState={ () => setShowNotes(!showNotes) }
                />
              </div>
            )
          : null
      }
    </div>
  )
}

const ExperiencesList = props => {
  const experiences = props?.experiences ?? []

  return (
    <div className="Experiences">
      {
        experiences.length > 0
          ? experiences.map(experience => {
              return <Experience data={experience} key={experience.slug} />
            })
          : <span>No Experience Found</span>
      }
    </div>
  )
}

const ExperiencesFilterOption = props => {
  const { active, children, onClick, slug } = props
  const baseClass = 'Experiences-filter-option'
  const classes = [
    baseClass,
    `${baseClass}-${slug}`,
  ]

  if (active) classes.push(`${baseClass}-active`)

  return (
    <div
      key={slug}
      className={classes.join(' ')}
      onClick={onClick}
    >
      { children }
    </div>
  )
}

const Resume = () => {
  const experiences = data?.experiences?.items ?? []
  const experienceTypes = data?.experiences?.types ?? []

  const technologies = data?.technologies?.items ?? []
  const technologyTypes = data?.technologies?.types
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
        {
          `${experiences.length} Items`
        }
        {
          isFiltered
            ? `, ${sortedExperiences.length} Match${sortedExperiences.length !== 1 ? 'es' : '' }`
            : null
        }
      </div>
      <ExperiencesList experiences={sortedExperiences} />
    </>
  )
}

export default Resume
