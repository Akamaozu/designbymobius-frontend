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
        Curated experiences as a <span className="emphasis">Software Engineer</span>
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
          👶 Born in <a href="https://en.wikipedia.org/wiki/Lagos" target="_blank" rel="noreferrer">Lagos, Nigeria</a>
        </div>
        <div
          style={{

          }}
        >
          🍁 Live in <a href="https://en.wikipedia.org/wiki/Mississauga" target="_blank" rel="noreferrer">Mississauga, Canada</a>
        </div>
        <div
          style={{

          }}
        >
          👨‍💻 Software Engineer since 2010
        </div>
        <div
          style={{

          }}
        >
          📧 <a href="mailto:uzo@designbymobius.ca">uzo@designbymobius.ca</a>
        </div>
        <div
          style={{

          }}
        >
          👀 <a href="https://github.com/akamaozu" target="_blank" rel="noreferrer">github</a>, <a href="https://www.linkedin.com/in/uzo-olisemeka-a6a56519/" target="_blank" rel="noreferrer">linkedin</a>
        </div>
      </div>
      <ExperienceTally />
      <ExperienceFilters />
      <ExperiencesList />
    </ViewProvider>
  )
}

export default Resume
