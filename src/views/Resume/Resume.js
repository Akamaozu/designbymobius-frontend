import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import ExperiencesList from './components/ExperiencesList'
import ExperienceFilters from './components/ExperienceFilters'
import viewContext from './contexts/view'
import './style.css'

const { ViewProvider, useView } = viewContext

const ExperienceTally = () => {
  const [ state ] = useView()
  const experiences = state?.experiences?.items ?? []
  const experienceTypes = state?.experiences?.types ?? []
  const isFiltered = state?.experiences?.isFiltered ?? false
  const experienceFilters = state?.experiences?.filters ?? {}
  const filteredExperiences = state?.experiences?.filteredExperiences
  const technologiesMap = state?.technologies?.map ?? {}

  const experienceTypesMap = experienceTypes.reduce(( typeMap, type ) => {
    typeMap[ type.slug ] = type
    return typeMap
  }, {})

  experienceFilters?.types?.sort()

  return (
    <div
      style={{
        margin: '2em',
        fontWeight: 900,
        lineHeight: '1.1em',
        letterSpacing: '-1px',
      }}
    >
      <div
        style={{
          fontSize: '125%',
        }}
      >
        { experiences.length } Experiences
      </div>
      {
        isFiltered && (
          <div
            style={{
              fontSize: '125%',
              color: 'limegreen',
            }}
          >
            { filteredExperiences.length }
            {
              experienceFilters.types?.length > 0
              ? experienceFilters.types?.length > 1
                ? (
                    ' '
                    + experienceFilters.types.slice(0, -1).map(typeSlug => experienceTypesMap[ typeSlug ]?.label).join(', ')
                    + ' or ' + experienceFilters.types.slice(-1).map(typeSlug => experienceTypesMap[ typeSlug ]?.label).join(', ')
                  )
                : ' '+ experienceFilters.types.map(typeSlug => experienceTypesMap[ typeSlug ].label)
              : ''
            }

            {` Experience${filteredExperiences.length !== 1 ? 's':'' }`}
            {
              experienceFilters.technologies?.length > 0
              ? experienceFilters.technologies?.length > 1
                ? (
                    ' using '
                    + experienceFilters.technologies.slice(0, -1).map(slug => technologiesMap[ slug ]?.label).join(', ')
                    + ' or ' + experienceFilters.technologies.slice(-1).map(slug => technologiesMap[ slug ]?.label).join(', ')
                  )
                : ' using '+ experienceFilters.technologies.map(slug => technologiesMap[ slug ].label)
              : ''

            }
          </div>
        )
      }
    </div>
  )
}

const Resume = () => {
  return (
    <ViewProvider>
      {
        true && (
          <>
            <ViewTitle>Resume</ViewTitle>
            <ViewSubtitle>
              Curated experience from <span className="emphasis">10+ years writing code</span>
            </ViewSubtitle>
          </>
        )
      }
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
