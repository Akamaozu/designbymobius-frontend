import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import data from '../../data'
import './style.css'

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

  while (experienceTechnologies.length > 0) {
    const technologySlug = experienceTechnologies.shift()
    expandedExperienceTechnologies.push(technologySlug)

    const technology = technologies[technologySlug]
    if (technology.dependencies) technology.dependencies.forEach(dependencySlug => {
      if (!experienceTechnologies.includes(dependencySlug) && !expandedExperienceTechnologies.includes(dependencySlug)) experienceTechnologies.push(dependencySlug)
    })
  }

  return (
    <div className="Experience">
      <div className="Experience-header">
        <div className="Experience-title">{ experience.label }</div>
        <div className={ `Experience-type Experience-type-${experience.type}` }>{ experienceType.label }</div>
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
              <div className="Experience-notes">
                {
                  experience.notes.map(note => {
                    return <div className="Experience-note">{ note }</div>
                  })
                }
              </div>
            )
          : null
      }
    </div>
  )
}

const Resume = () => {
  const experiences = data?.experiences?.items ?? []
  const sortedExperiences = [...experiences].sort((a,b) => {
    // sort newer start date higher
    if (a.start > b.start) return -1
    if (a.start < b.start) return 1

    // sort newer end date higher
    if (a.end > b.end) return -1
    if (a.end < b.end) return 1

    return 0
  })

  return (
    <>
      <ViewTitle>Resume</ViewTitle>
      <ViewSubtitle>
        Curated experience from <span className="emphasis">10+ years writing code</span>
      </ViewSubtitle>
      <div className="Experiences">
        {
          experiences.length > 0
            ? sortedExperiences.map(experience => {
                const experienceType = data?.experiences?.types.find(type => type.slug === experience.type)
                return <Experience data={experience} type={ experienceType } />
              })
            : <span>No Experience Found</span>
        }
      </div>
    </>
  )
}

export default Resume
