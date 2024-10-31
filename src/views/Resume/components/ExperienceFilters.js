import { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import ExperiencesFilterOption from './ExperiencesFilterOption'
import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperienceFilters = props => {
  const location = useLocation()

  const [ state, updateState ] = useView()
  const [ showFilters, setShowFilters ] = useState(false)
  const [ downloadingPdf, setDownloadingPdf ] = useState(false)

  const experienceTypes = state?.experiences?.types ?? []
  const experienceFilters = state?.experiences?.filters ?? {}
  const technology_map = state?.technologies?.map ?? {}
  const technology_tags = state?.technologies?.tagMap ?? {}
  const technology_type_members_map = state?.technologies?.typeMembersMap ?? {}

  const stringified_experience_type_filters = JSON.stringify( experienceFilters?.types )
  const stringified_experience_technology_filters = JSON.stringify( experienceFilters?.technologies )

  const { typeFilter, technologyFilter } = useMemo(() => {
    const typeFilter = {
      add: type => {
        if (!state?.experiences?.filters) throw new Error('experience filters data-struct not found')

        let updated = false
        let updates = { ...state }

        if (!updates.experiences.filters.types) updates.experiences.filters.types = []
        if (updates.experiences.filters.types.indexOf(type) === -1) {
          updates.experiences.filters.types.push(type)
          updated = true
        }

        if (updated) {
          updateState(updates)
          console.log({ action: 'add-type-filter', type, filters: updates.experiences.filters })
        }
      },
      del: type => {
        if (!state?.experiences?.filters) throw new Error('experience filters data-struct not found')

        let updated = false
        let updates = { ...state }

        if (!updates.experiences.filters.types) updates.experiences.filters.types = []
        if (updates.experiences.filters.types.indexOf(type) > -1) {
          const typeIndex = updates.experiences.filters.types.indexOf(type)
          updates.experiences.filters.types.splice(typeIndex, 1)
          updated = true
        }

        if (updated) {
          updateState(updates)
          console.log({ action: 'remove-type-filter', type, filters: updates.experiences.filters })
        }
      }
    }
    const technologyFilter = {
      add: technology => {
        if (!state?.experiences?.filters) throw new Error('experience filters data-struct not found')

        let updated = false
        let updates = { ...state }
        let experienceFilters = state.experiences.filters

        if (!experienceFilters.technologies) updates.experiences.filters.technologies = []
        if (updates.experiences.filters.technologies.indexOf(technology) === -1) {
          updates.experiences.filters.technologies.push(technology)
          updated = true
        }

        if (updated) {
          updateState(updates)
          console.log({ action: 'add-technology-filter', technology, filters: updates.experiences.filters })
        }
      },
      del: technology => {
        let updated = false
        let updates = { ...state }
        let experienceFilters = state.experiences.filters

        if (!experienceFilters.technologies) updates.experiences.filters.technologies = []
        if (experienceFilters.technologies.indexOf(technology) > -1) {
          const technologyIndex = updates.experiences.filters.technologies.indexOf(technology)
          updates.experiences.filters.technologies.splice(technologyIndex, 1)
          updated = true
        }

        if (updated) {
          updateState(updates)
          console.log({ action: 'remove-technology-filter', technology, filters: updates.experiences.filters })
        }
      }
    }

    return {
      typeFilter,
      technologyFilter
    }
  }, [
    state,
    updateState,
  ])

  const clearFilters = () => {
    const updates = { ...state }
    updates.experiences.filters = {}

    updateState(updates)
    console.log({ action: 'clear-all-experience-filters' })
  }

  // create initial state from url querystring
  const { url_parsed } = state
  useEffect(() => {
    if (url_parsed) return
    if (typeof (location?.search) !== 'string') return

    const queryStringIterable = new URLSearchParams(location.search)
    const queryStringArray = [ ...queryStringIterable ]
    const queryStringMap = queryStringArray.reduce((map, tuple) => {
      map[tuple[0]] = tuple[1]
      return map
    }, {})

    if (queryStringMap.types) {
      const types = queryStringMap.types.split(',').map(type => type.trim())
      types.forEach( type_slug => typeFilter.add(type_slug) )
    }

    if (queryStringMap.technologies) {
      const technologies = queryStringMap.technologies.split(',').map(tech => tech.trim())
      technologies.forEach( tech_slug => technologyFilter.add(tech_slug) )
    }

    if (queryStringMap.notes === 'open') {
      updateState( latest_state => {
        const {
          experiences,
          ...rest_of_latest_state
        } = latest_state ?? {}

        const state_to_use = {
          ...rest_of_latest_state,
          experiences: {
            ...experiences,
            showNotes: true,
          }
        }

        return state_to_use
      })
    }

    updateState( latest_state => {
      return {
        ...latest_state,
        url_parsed: true,
      }
    })
  }, [
    url_parsed,
    location.search,
    typeFilter,
    technologyFilter,
    updateState,
  ])

  // sync querystring with filter state
  useEffect(() => {
    const next_querystring_builder = new URLSearchParams()

    const experience_type_filters = stringified_experience_type_filters && JSON.parse( stringified_experience_type_filters )
    if (experience_type_filters?.length > 0) next_querystring_builder.set( 'types', 'FILTERED_EXPERIENCE_TYPES' )

    const experience_technology_filters = stringified_experience_technology_filters && JSON.parse( stringified_experience_technology_filters )
    if (experience_technology_filters?.length > 0) {
      next_querystring_builder.set( 'technologies', 'FILTERED_TECHNOLOGY_TYPES' )
    }

    const next_querystring_template = next_querystring_builder
      .toString()
      .replace( 'FILTERED_EXPERIENCE_TYPES', experience_type_filters?.join(',') )
      .replace( 'FILTERED_TECHNOLOGY_TYPES', experience_technology_filters?.join(',') )

    const next_querystring = next_querystring_template.length > 0
        ? `?${ next_querystring_template }`
        : ''

    window?.history?.replaceState( null, null, `${ window?.location?.pathname }${ next_querystring }` )
  }, [
    stringified_experience_type_filters,
    stringified_experience_technology_filters,
  ])

  return (
    <>
      <div className="Experiences-filters-controls">
        <div
          className="toggle-filters-view"
          onClick={ () => setShowFilters(!showFilters) }
        >
          {
            showFilters
              ? 'Hide Filters'
              : 'Show Filters'
          }
        </div>
        {
          state?.experiences?.isFiltered && (
            <div
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </div>
          )
        }
        <div
          className={`download-pdf ${downloadingPdf ? 'is-downloading' : ''}`}
          onClick={() => {
            if (downloadingPdf) return

            setDownloadingPdf(true)

            const download_querystring_struct = { ...(state?.experiences?.filters ?? {}) }
            download_querystring_struct.download = 'true'

            const download_querystring = Object
              .keys(download_querystring_struct)
              .map(key => {
                return (
                  Object.prototype.toString.call(download_querystring_struct[key]) === '[object Array]'
                    ? encodeURIComponent(key) +'='+ encodeURIComponent(download_querystring_struct[key].join(','))
                    : encodeURIComponent(key) +'='+ encodeURIComponent(download_querystring_struct[key])
                )
              })
              .join('&')

            fetch('?'+ download_querystring)
              .then(res => res.blob())
              .then(pdf => {
                let tempUrl = URL.createObjectURL(pdf);
                const aTag = document.createElement("a");
                aTag.href = tempUrl;
                aTag.download = 'uzo-olisemeka-software-engineer-resume.pdf';

                document.body.appendChild(aTag);
                aTag.click();

                URL.revokeObjectURL(tempUrl);
                aTag.remove();

                console.log({ action: 'download-resume-pdf' })
                setDownloadingPdf(false)
              })
              .catch(error => {
                console.log({ action: 'download-resume-pdf', success: false, error })
                alert('Downloading resume PDF failed. Please try again later.')
                setDownloadingPdf(false)
              })
          }}
        >
          Download{downloadingPdf ? 'ing' : ''} {state?.experiences?.isFiltered ? 'Filtered' : ''} PDF
        </div>
      </div>
      {
        showFilters && (
          <div className="Experiences-filters">
            Filter by:
            <div className="Experiences-filter Experiences-filter-type">
              <div className="Experiences-filter-title">Experience Type</div>
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
                        active={experienceFilters.types?.indexOf(experienceType.slug) > -1}
                        key={experienceType.slug}
                        slug={experienceType.slug}
                        onClick={() => {
                          if (!experienceFilters.types) return typeFilter.add(experienceType.slug)

                          if (experienceFilters.types.indexOf(experienceType.slug) > -1) typeFilter.del(experienceType.slug)
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
              {
                technology_type_members_map.hasOwnProperty( 'programming-language' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Programming Language</div>
                    {
                      technology_type_members_map[ 'programming-language' ].map( technology_slug => {
                        const technology = technology_map[ technology_slug ]

                        return (
                          <ExperiencesFilterOption
                            active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                            key={technology.slug}
                            slug={technology.slug}
                            onClick={() => {
                              if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                              if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                              else technologyFilter.add(technology.slug)
                            }}
                          >
                            { technology.label }
                          </ExperiencesFilterOption>
                        )
                      })
                    }
                  </>
                )
              }
              {
                technology_tags.hasOwnProperty( 'backend' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Backend</div>
                    {
                      technology_tags[ 'backend' ].map( technology_slug => {
                        const technology = technology_map[ technology_slug ]

                        return (
                          <ExperiencesFilterOption
                            active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                            key={technology.slug}
                            slug={technology.slug}
                            onClick={() => {
                              if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                              if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                              else technologyFilter.add(technology.slug)
                            }}
                          >
                            { technology.label }
                          </ExperiencesFilterOption>
                        )
                      })
                    }
                  </>
                )
              }
              {
                technology_tags.hasOwnProperty( 'frontend' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Frontend</div>
                    {
                      technology_tags[ 'frontend' ].map( technology_slug => {
                        const technology = technology_map[ technology_slug ]

                        return (
                          <ExperiencesFilterOption
                            active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                            key={technology.slug}
                            slug={technology.slug}
                            onClick={() => {
                              if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                              if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                              else technologyFilter.add(technology.slug)
                            }}
                          >
                            { technology.label }
                          </ExperiencesFilterOption>
                        )
                      })
                    }
                  </>
                )
              }
              {
                technology_tags.hasOwnProperty( 'relational-db' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Relational Database</div>
                    {
                      technology_tags[ 'relational-db' ].map( technology_slug => {
                        const technology = technology_map[ technology_slug ]

                        return (
                          <ExperiencesFilterOption
                            active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                            key={technology.slug}
                            slug={technology.slug}
                            onClick={() => {
                              if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                              if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                              else technologyFilter.add(technology.slug)
                            }}
                          >
                            { technology.label }
                          </ExperiencesFilterOption>
                        )
                      })
                    }
                  </>
                )
              }
              {
                technology_tags.hasOwnProperty( 'non-relational-db' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Non-Relational Database</div>
                    {
                      technology_tags[ 'non-relational-db' ].map( technology_slug => {
                        const technology = technology_map[ technology_slug ]

                        return (
                          <ExperiencesFilterOption
                            active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                            key={technology.slug}
                            slug={technology.slug}
                            onClick={() => {
                              if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                              if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                              else technologyFilter.add(technology.slug)
                            }}
                          >
                            { technology.label }
                          </ExperiencesFilterOption>
                        )
                      })
                    }
                  </>
                )
              }
              {
                technology_type_members_map.hasOwnProperty( 'message-queue' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Message Queue</div>
                    {
                      technology_type_members_map[ 'message-queue' ].map( technology_slug => {
                        const technology = technology_map[ technology_slug ]

                        return (
                          <ExperiencesFilterOption
                            active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                            key={technology.slug}
                            slug={technology.slug}
                            onClick={() => {
                              if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                              if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                              else technologyFilter.add(technology.slug)
                            }}
                          >
                            { technology.label }
                          </ExperiencesFilterOption>
                        )
                      })
                    }
                  </>
                )
              }
              {
                technology_tags.hasOwnProperty( 'deploy' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Deployment</div>
                    {
                      technology_tags[ 'deploy' ]
                        .sort(( slug_a, slug_b ) => {
                          const tech_a = technology_map[ slug_a ]
                          const tech_b = technology_map[ slug_b ]

                          if (tech_a.label > tech_b.label) return 1
                          if (tech_a.label < tech_b.label) return -1
                          return 0
                        })
                        .map( technology_slug => {
                          const technology = technology_map[ technology_slug ]

                          return (
                            <ExperiencesFilterOption
                              active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                              key={technology.slug}
                              slug={technology.slug}
                              onClick={() => {
                                if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                                if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                                else technologyFilter.add(technology.slug)
                              }}
                            >
                              { technology.label }
                            </ExperiencesFilterOption>
                          )
                        })
                      }
                  </>
                )
              }
              {
                technology_tags.hasOwnProperty( 'hosting' )
                && (
                  <>
                    <div style={{ fontSize: '.85em', marginTop: '1.25em' }}>Cloud Hosting</div>
                    {
                      technology_tags[ 'hosting' ]
                        .sort(( slug_a, slug_b ) => {
                          const tech_a = technology_map[ slug_a ]
                          const tech_b = technology_map[ slug_b ]

                          if (tech_a.label > tech_b.label) return 1
                          if (tech_a.label < tech_b.label) return -1
                          return 0
                        })
                        .map( technology_slug => {
                          const technology = technology_map[ technology_slug ]

                          return (
                            <ExperiencesFilterOption
                              active={experienceFilters.technologies?.indexOf(technology.slug) > -1}
                              key={technology.slug}
                              slug={technology.slug}
                              onClick={() => {
                                if (!experienceFilters.technologies) return technologyFilter.add(technology.slug)

                                if (experienceFilters.technologies.indexOf(technology.slug) > -1) technologyFilter.del(technology.slug)
                                else technologyFilter.add(technology.slug)
                              }}
                            >
                              { technology.label }
                            </ExperiencesFilterOption>
                          )
                        })
                      }
                  </>
                )
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default ExperienceFilters
