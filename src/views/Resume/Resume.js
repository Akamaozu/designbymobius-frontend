import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import ExperiencesList from './components/ExperiencesList'
import ExperienceFilters from './components/ExperienceFilters'
import ExperienceTally from './components/ExperienceTally'
import viewContext from './contexts/view'

import { ReactComponent as EmailNotificationSVG } from '../../svgs/email-notification.svg'
import { ReactComponent as GithubOctocatSVG } from '../../svgs/github-octocat.svg'
import { ReactComponent as CanadaFlagSVG } from '../../svgs/canada-flag.svg'
import { ReactComponent as KeyboardSVG } from '../../svgs/keyboard.svg'

import './style.css'

const { ViewProvider } = viewContext

const Resume = () => {
  return (
    <ViewProvider>
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
          className='ProfilePic'
          style={{
            display: 'inline-block',
            backgroundImage: 'url(/profile-pic.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '12.5vw',
            width: '25vw',
            height: '25vw',
            maxWidth: '8em',
            maxHeight: '8em',
            marginRight: '2em',
            border: '6px solid #000',
          }}
        >
        </div>
        <div
          style={{
            display: 'inline-block',
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
          <div>
            <KeyboardSVG
              width='1.2em'
              style={{
                marginRight: '.33em',
                verticalAlign: '-0.22em',
                color: '#888',
              }}
            />
            Software Engineer since 2010
          </div>
          <div>
            <CanadaFlagSVG
              width='1.1em'
              style={{
                marginRight: '.33em',
                verticalAlign: '-0.22em',
              }}
            />
            Lives in <a href="https://en.wikipedia.org/wiki/Mississauga" target="_blank" rel="noreferrer">Mississauga, Canada</a>
          </div>
          <div>
            <EmailNotificationSVG
              width='1.2em'
              style={{
                marginRight: '.33em',
                verticalAlign: '-0.22em',
              }}
            />
            <a href="mailto:uzo@designbymobius.ca">uzo@designbymobius.ca</a>
          </div>
          <div>
            <GithubOctocatSVG
              width='1.2em'
              style={{
                marginRight: '.33em',
                verticalAlign: '-0.22em',
              }}
            />
            <a href="https://github.com/akamaozu" target="_blank" rel="noreferrer">github.com/akamaozu</a>
          </div>
        </div>
      </div>
      <ExperienceTally />
      <ExperienceFilters />
      <ExperiencesList />
    </ViewProvider>
  )
}

export default Resume
