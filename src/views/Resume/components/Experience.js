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
                    : `${experience.start} - ${experience.end ?? 'Now'}`
  const technologyMap = state?.technologies?.map ?? {}
  const technologyTypeMap = state?.technologies?.typeMap ?? {}
  const expandedExperienceTechnologies = getDependentTechnologies(experience.technologies, technologyMap)
  const [ showNotes, setShowNotes ] = useState(props?.showNotes ?? false)

  const expanded_experience_technology_groupings = expandedExperienceTechnologies
    .reduce(( map, technology_slug ) => {
      const technology = technologyMap[ technology_slug ]

      if (technology.type) {
        if (!map.hasOwnProperty( technology.type )) map[ technology.type ] = []
        map[ technology.type ].push( technology_slug )
      }

      if (technology.tags) {
        technology.tags.forEach( technology_tag => {
          if (!map.hasOwnProperty( technology_tag )) map[ technology_tag ] = []
          map[ technology_tag ].push( technology_slug )
        })
      }

      return map
    }, {})

  // sort group members alphabetically
  Object
    .keys( expanded_experience_technology_groupings )
    .forEach( group_slug => {
      expanded_experience_technology_groupings[ group_slug ].sort(( tech_a_slug, tech_b_slug ) => {
        const tech_a = technologyMap[ tech_a_slug ]
        const tech_b = technologyMap[ tech_b_slug ]

        if (tech_a.label > tech_b.label) return 1
        if (tech_a.label < tech_b.label) return -1
        return 0
      })
    })

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
        experience.nutshell
          ? <div className="Experience-nutshell">{ experience.nutshell }</div>
          : null
      }
      {
        experience.technologies
          ? (
              <div key={ experience.slug } className={experienceTechnologiesClassName}>
                {
                  expanded_experience_technology_groupings[ 'programming-language' ]
                  && (
                    <div key='programming-language' style={{ display: 'inline-block', marginRight: '1em' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '.64em', color: '#888', fontWeight: 900 }}>Language:</span>
                      {' '}
                      { expanded_experience_technology_groupings[ 'programming-language' ].map( slug => <ExperienceTechnology key={ slug } slug={ slug } /> ) }
                    </div>
                  )
                }
                {
                  expanded_experience_technology_groupings.backend
                  && (
                    <div key='backend' style={{ display: 'inline-block', marginRight: '1em' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '.64em', color: '#888', fontWeight: 900 }}>Backend:</span>
                      {' '}
                      { expanded_experience_technology_groupings.backend.map( slug => <ExperienceTechnology key={ slug } slug={ slug } /> ) }
                    </div>
                  )
                }
                {
                  expanded_experience_technology_groupings.frontend
                  && (
                    <div key='frontend' style={{ display: 'inline-block', marginRight: '1em' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '.64em', color: '#888', fontWeight: 900 }}>Frontend:</span>
                      {' '}
                      { expanded_experience_technology_groupings.frontend.map( slug => <ExperienceTechnology key={ slug } slug={ slug } /> ) }
                    </div>
                  )
                }
                {
                  expanded_experience_technology_groupings.database
                  && (
                    <div key='database' style={{ display: 'inline-block', marginRight: '1em' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '.64em', color: '#888', fontWeight: 900 }}>Database:</span>
                      {' '}
                      { expanded_experience_technology_groupings.database.map( slug => <ExperienceTechnology key={ slug } slug={ slug } /> ) }
                    </div>
                  )
                }
                {
                  expanded_experience_technology_groupings[ 'message-queue' ]
                  && (
                    <div key='message-queue' style={{ display: 'inline-block', marginRight: '1em' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '.64em', color: '#888', fontWeight: 900 }}>Message Queue:</span>
                      {' '}
                      { expanded_experience_technology_groupings[ 'message-queue' ].map( slug => <ExperienceTechnology key={ slug } slug={ slug } /> ) }
                    </div>
                  )
                }
                {
                  expanded_experience_technology_groupings[ 'cloud-infrastructure' ]
                  && (
                    <div key='cloud-infrastructure' style={{ display: 'inline-block', marginRight: '1em' }}>
                      <span style={{ textTransform: 'uppercase', fontSize: '.64em', color: '#888', fontWeight: 900 }}>Cloud:</span>
                      {' '}
                      { expanded_experience_technology_groupings[ 'cloud-infrastructure' ].map( slug => <ExperienceTechnology key={ slug } slug={ slug } /> ) }
                    </div>
                  )
                }
              </div>
            )
          : null
      }
      {
        experience.notes
          ? (
              <>
                <div className={ `Experience-notes Experience-notes-${showNotes ? 'shown' : 'hidden' }` }>
                  {
                    experience.notes.map((note, index) => {
                      return <div className="Experience-note" key={index + 1}>{ note }</div>
                    })
                  }
                </div>
                <div className="Experience-notes-view-toggle">
                  <ExperienceNotesViewToggler
                    showNotes={ showNotes }
                    toggleViewState={ () => setShowNotes(!showNotes) }
                  />
                </div>
              </>
            )
          : null
      }
    </div>
  )

  function ExperienceTechnology({ slug }) {
    const technology = technologyMap[ slug ]
    if (!technology) return null

    const is_filter_match = experienceFilters?.technologies?.indexOf?.(technology.slug) > -1

    return (
      <span className={ `Experience-technology ${ is_filter_match ? 'Experience-technologies-filter-match' : '' }` }>
        { technology.label }
        <div className='Experience-technology-type'>
          { technologyTypeMap[ technology.type ].label }
        </div>
      </span>
    )
  }
}

export default Experience
