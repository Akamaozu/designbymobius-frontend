import { createContext, useContext, useState } from 'react'
import data from '../../../data'

const ViewContext = createContext()
const projects = data?.projects?.items ?? []
const project_tags = data?.projects?.tags ?? []

const createStore = ( state = {}, storeName, storeState ) => {
  if (state.hasOwnProperty(storeName)) throw new Error (`store "${storeName}" already exists in ViewContext`)

  const modifiedState = { ...state }
  modifiedState[ storeName ] = storeState

  return modifiedState
}

const ViewProvider = props => {
  let initialState = {}

  initialState = createStore(initialState, 'projects', { items: projects, tags: project_tags })

  initialState.projects.map = initialState.projects.items.reduce(( map, project ) => {
    map[ project.slug ] = project
    return map
  }, {})

  initialState.projects.tagMap = initialState.projects.tags.reduce(( tag_map, project_tag ) => {
    tag_map[ project_tag.slug ] = project_tag
    return tag_map
  }, {})

  initialState.projects.startYearMap = initialState.projects.items.reduce(( start_year_map, project ) => {
    if (!start_year_map[ project.start_year ]) start_year_map[ project.start_year ] = []

    start_year_map[ project.start_year ].push( project.slug )
    return start_year_map
  }, {})

  const [state, updateState] = useState(initialState)

  return <ViewContext.Provider value={[ state, updateState ]} {...props} />
}

const useView = () => {
  const context = useContext(ViewContext)
  if (!context) throw new Error ('useView must be used within a ViewProvider')

  return context
}

const api = {
  ViewProvider,
  useView,
}

export default api
