import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import ExperiencesList from './components/ExperiencesList'
import ExperienceFilters from './components/ExperienceFilters'
import ExperienceTally from './components/ExperienceTally'
import viewContext from './contexts/view'
import './style.css'

const { ViewProvider } = viewContext

const Resume = () => {

  return (
    <ViewProvider>
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
