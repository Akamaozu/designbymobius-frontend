import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import ExperiencesList from './components/ExperiencesList'
import ExperienceFilters from './components/ExperienceFilters'
import ExperienceTally from './components/ExperienceTally'
import viewContext from './contexts/view'
import './style.css'

const { ViewProvider } = viewContext

const Resume = () => {
  const location = useLocation()
  const [ initialState, setInitialState ] = useState()

  // create initial state from url querystring
  useEffect(() => {
    if (typeof (location?.search) !== 'string') return

    const queryStringIterable = new URLSearchParams(location.search)
    const queryStringArray = [ ...queryStringIterable ]
    const queryStringMap = queryStringArray.reduce((map, tuple) => {
      map[tuple[0]] = tuple[1]
      return map
    }, {})

    const queryStringState = {}

    if (queryStringMap.types) {
      const types = queryStringMap.types.split(',').map(type => type.trim())
      queryStringState.types = types
    }

    if (queryStringMap.technologies) {
      const technologies = queryStringMap.technologies.split(',').map(tech => tech.trim())
      queryStringState.technologies = technologies
    }

    if (queryStringMap.notes) {
      queryStringState.notes = queryStringMap.notes
    }

    window?.history?.replaceState?.(queryStringState, '', window.location.pathname)
    setInitialState(queryStringState)
  }, [ location?.search ])

  // IMPORTANT: updating initialState does not update ViewProvider
  //            do *NOT* load initialState before fully constructing it
  if (Object.prototype.toString.call(initialState) !== '[object Object]') return null

  return (
    <ViewProvider initialState={initialState}>
      <ViewTitle>Resume</ViewTitle>
      <ViewSubtitle>
        Curated experience from <span className="emphasis">10+ years writing code</span>
      </ViewSubtitle>
      <div
        style={{
          marginLeft: '2em',
        }}
      >
        <div
          style={{
            fontSize: '1.75em',
            fontWeight: 900,
            letterSpacing: '-1px',
          }}
        >
          Uzo Olisemeka
        </div>
        <div
          style={{

          }}
        >
          👶 Born in Nigeria
        </div>
        <div
          style={{

          }}
        >
          🍁 Live in Canada
        </div>
        <div
          style={{

          }}
        >
          👨‍💻 Software Engineer with {(new Date()).getFullYear() - 2010 }+ years experience
        </div>
      </div>
      <ExperienceTally />
      <ExperienceFilters />
      <ExperiencesList />
    </ViewProvider>
  )
}

export default Resume
