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

const Experience = props => {
  const experience = props.data ?? {}
  const experienceType = data?.experiences?.types?.find(type => type.slug === experience.type) ?? {}
  const duration = experience.start === experience.end
                    ? experience.start
                    : `${experience.start} - ${experience.end}`
  const technologies = data.technologies.items.reduce((technologies, technology) => {
    technologies[technology.slug] = technology
    return technologies
  }, {})
  const experienceTechnologies = [...experience.technologies]
  const expandedExperienceTechnologies = []
  const initialShowNotes = props.showNotes
  const [ showNotes, setShowNotes ] = useState(initialShowNotes ?? false)
  const [ experienceFilters, setExperienceFilters ] = useState({})


  while (experienceTechnologies.length > 0) {
    const technologySlug = experienceTechnologies.shift()
    expandedExperienceTechnologies.push(technologySlug)

    const technology = technologies[technologySlug]
    if (technology.dependencies) technology.dependencies.forEach(dependencySlug => {
      if (!experienceTechnologies.includes(dependencySlug) && !expandedExperienceTechnologies.includes(dependencySlug)) experienceTechnologies.push(dependencySlug)
    })
  }

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
                      const aTech = technologies[a].label
                      const bTech = technologies[b].label

                      if (aTech > bTech) return 1
                      if (aTech < bTech) return -1

                      return 0
                    })
                    .map(technologySlug => {
                      const technologyDisplayName = technologies[technologySlug].label
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

const Resume = () => {
  const experiences = data?.experiences?.items ?? []
  const experienceTypes = data?.experiences?.types ?? []

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

  // filter experiences
  const [ filteredExperiences, updateFilteredExperiences ] = useState([])
  useEffect(() => {
    if (!experienceFilters.types || experienceFilters.types.length === 0) {
      updateFilteredExperiences(experiences)
      return
    }

    const updatedFilteredExperiences = [...experiences].filter(experience => {
      if (experienceFilters.types) {
        if (!experienceFilters.types.includes(experience.type)) return false
      }

      return true
    })

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
        <div>Filter Experiences</div>
        <div className="Experiences-filter Experiences-filter-type">
          <div className="Experiences-filter-title">by type</div>
          {
            experienceTypes
              .sort((a,b) => {
                if (a.label > b.label) return 1
                if (a.label < b.label) return -1
                return 0
              })
              .map(experienceType => {
                return (
                  <div
                    key={experienceType.slug}
                    className={`Experiences-filter-type-option Experiences-filter-type-option-${experienceType.slug}${experienceFilters.types.includes(experienceType.slug) ? ' Experiences-filter-type-option-active' : ''}`}
                    onClick={() => {
                      if (!experienceFilters.types) return typeFilter.add(experienceType.slug)

                      if (experienceFilters.types.includes(experienceType.slug)) typeFilter.del(experienceType.slug)
                      else typeFilter.add(experienceType.slug)
                    }}
                  >
                    { experienceType.label }
                  </div>
                )
              })
          }
        </div>
      </div>
      <div className="Experiences">
        {
          sortedExperiences.length > 0
            ? sortedExperiences.map(experience => {
                const experienceType = data?.experiences?.types.find(type => type.slug === experience.type)
                return <Experience data={experience} key={experience.slug} />
              })
            : <span>No Experience Found</span>
        }
      </div>
    </>
  )
}

export default Resume
