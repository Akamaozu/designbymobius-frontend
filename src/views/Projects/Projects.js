import viewContext from './contexts/view'
import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'

import './style.css'

const { ViewProvider, useView } = viewContext

const Projects = () => {
  return (
    <ViewProvider>
      <ViewTitle>Projects</ViewTitle>
      <ViewSubtitle>
        <ViewSubtitleHighlight>Things I've worked on</ViewSubtitleHighlight>
        { ', for fun and for profit' }
      </ViewSubtitle>
      <ProjectsList />
    </ViewProvider>
  )
}

const ViewSubtitleHighlight = ({ children }) => {
  return (
    <span className='emphasis'>{ children }</span>
  )
}

const ProjectsList = () => {
  const [ state ] = useView()
  const project_start_years = Object
    .keys( state?.projects?.startYearMap )
    .sort(( a_start_year, b_start_year ) => {
      if (a_start_year > b_start_year) return -1
      if (a_start_year < b_start_year) return 1

      return 0
    })

  console.log({ state })

  return (
    <div className='ProjectsList'>
      {
        project_start_years
          .map( start_year => {
            return (
              <div className='ProjectGroup' key={ start_year }>
                <div className='ProjectGroupTitle'>{ start_year }</div>
                <div className='ProjectGroupList'>
                  {
                    state.projects.startYearMap[ start_year ]
                      .sort(( project_a_slug, project_b_slug ) => {
                        const project_a = state.projects.map[ project_a_slug ].label.toLowerCase()
                        const project_b = state.projects.map[ project_b_slug ].label.toLowerCase()
                        
                        if (project_a > project_b) return 1                        
                        if (project_a < project_b) return -1

                        return 0                        
                      })
                      .map( project_slug => {
                        const project = state.projects.map[ project_slug ]
                        return (
                          <div className='Project' key={ project.slug }>
                            <div className='ProjectName'>{ project.label }</div>
                            {
                              (project?.tags?.length > 0)
                                ? <div className='ProjectTags'>
                                    {
                                      project.tags
                                        .sort(( a, b ) => {
                                          const a_tag = state.projects.tagMap[ a ].label.toString()
                                          const b_tag = state.projects.tagMap[ b ].label.toString()

                                          if (a_tag > b_tag) return 1
                                          if (a_tag < b_tag) return -1

                                          return 0
                                        })
                                        .map( tag => {
                                          return (
                                            <div className={ `ProjectTag ProjectTag-${ tag }` } key={ tag }>
                                              { state.projects.tagMap[ tag ].label }
                                            </div>
                                          )
                                        })
                                    }
                                  </div>
                                : null
                            }
                            {
                              project.nutshell
                                ? <div className='ProjectNutshell'>
                                    { project.nutshell }
                                  </div>
                                : null
                            }
                          </div>
                        )
                      })
                  }
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

export default Projects
