import { useState } from 'react'
import ExperienceNotesViewToggler from './ExperienceNotesViewToggler'
import data from '../../../data'
import utils from '../../../utils'

const { getDependentTechnologies } = utils

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
                        <div className={ `Experience-technology Experience-technology-${technologySlug}` } key={technologySlug}>{ technologyDisplayName }</div>
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

export default Experience
