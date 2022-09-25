import { useState } from 'react'
import ExperienceNotesViewToggler from './ExperienceNotesViewToggler'
import viewContext from '../contexts/view'
import utils from '../../../utils'

const { useView } = viewContext
const { getDependentTechnologies } = utils

const Experience = props => {
  const [ state ] = useView()
  const experience = props.data ?? {}
  const experienceType = state?.experiences?.types?.find(type => type.slug === experience.type) ?? {}
  const experienceFilters = state?.experiences?.filters
  const experienceFilteredByTechnologies = experienceFilters?.technologies?.length > 0
  const duration = experience.start === experience.end
                    ? experience.start
                    : `${experience.start} - ${experience.end}`
  const technologyMap = state?.technologies?.map ?? {}
  const expandedExperienceTechnologies = getDependentTechnologies(experience.technologies, technologyMap)
  const initialShowNotes = props.showNotes
  const [ showNotes, setShowNotes ] = useState(initialShowNotes ?? false)

  let experienceTechnologiesClassName = 'Experience-technologies'
  if (experienceFilteredByTechnologies) experienceTechnologiesClassName += ' Experience-technologies-filtered'

  return (
    <div className={ `Experience Experience-type-${experience.type}` } key={experience.slug}>
      <div className="Experience-header">
        <div className="Experience-title">{ experience.label }</div>
        <div className="Experience-type">{ experienceType.label }</div>
      </div>
      <div className="Experience-when">{ duration }</div>
      {
        experience.technologies
          ? (
              <div className={experienceTechnologiesClassName}>
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
                      const experienceTechnologiesFilterMatch = experienceFilters?.technologies?.indexOf?.(technologySlug) > -1

                      let className = 'Experience-technology Experience-technology-'+ technologySlug
                      if (experienceTechnologiesFilterMatch) className += ' Experience-technologies-filter-match'

                      return (
                        <div
                          className={className}
                          key={technologySlug}
                        >
                          { technologyDisplayName }
                        </div>
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
                  experience.notes.map((note, index) => {
                    return <div className="Experience-note" key={index + 1}>{ note }</div>
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
