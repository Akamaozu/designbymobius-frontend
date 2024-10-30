import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperienceTally = () => {
  const [ state ] = useView()

  const experienceFilters = state?.experiences?.filters ?? {}
  const experienceTypesMap = state?.experiences?.typeMap ?? {}
  const technologyMap = state?.technologies?.map ?? {}
  const isFiltered = state?.experiences?.isFiltered ? true : false
  const filteredExperiences = isFiltered
    ? state?.experiences?.filteredExperiences ?? []
    : state?.experiences?.items ?? []

  const years_of_experience = Object
    .keys( state?.experiences?.yearMap ?? {} )
    .length
    - 1

  const technology_type_members_map = state?.technologies?.typeMembersMap
  const technology_tags = state?.technologies?.tagMap

  return (
    <div className='Experiences-tally'>
      <div className='Experiences-tally-unfiltered'>
        { years_of_experience } { years_of_experience === 1 ? 'Year' : 'Years' } of Experience.
        <br />
        { technology_type_members_map[ 'programming-language' ].length } { technology_type_members_map[ 'programming-language' ].length === 1 ? 'Language' : 'Languages' }.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_type_members_map[ 'programming-language' ].map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
        <br />
        { technology_tags[ 'backend' ].length } Backend.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_tags[ 'backend' ].map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
        <br />
        { technology_tags[ 'frontend' ].length } Frontend.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_tags[ 'frontend' ].map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
        <br />
        { technology_type_members_map[ 'message-queue' ].length } { technology_type_members_map[ 'message-queue' ].length === 1 ? 'Message Queue' : 'Message Queues' }.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_type_members_map[ 'message-queue' ].map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
        <br />
        { technology_tags[ 'relational-db' ].length } { technology_tags[ 'relational-db' ].length === 1 ? 'Relational Database' : 'Relational Databases' }.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_tags[ 'relational-db' ].map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
        <br />
        { technology_tags[ 'non-relational-db' ].length } { technology_tags[ 'non-relational-db' ].length === 1 ? 'Non-Relational Database' : 'Non-Relational Databases' }.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_tags[ 'non-relational-db' ].map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
        <br />
        { technology_tags.hosting.length } Cloud Hosting.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_tags.hosting.map( id => state.technologies.map[ id ].label ).join(', ') }
        </span>
      </div>
      {
        isFiltered && (
          <>
            <div className='Experiences-tally-filtered'>
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
                      + experienceFilters.technologies.slice(0, -1).map(slug => technologyMap[ slug ]?.label).join(', ')
                      + ' or ' + experienceFilters.technologies.slice(-1).map(slug => technologyMap[ slug ]?.label).join(', ')
                    )
                  : ' using '+ experienceFilters.technologies.map(slug => technologyMap[ slug ].label)
                : ''

              }
            </div>
            {
              process.env.REACT_APP_PUBLIC_URL
              && <>
                <div className='Experiences-tally-filtered-caveat'>
                  <i>(view full list of experiences at: <a href={ `${ process.env.PUBLIC_URL_PROTOCOL ?? 'https://' }${ process.env.REACT_APP_PUBLIC_URL }/resume` } target="_blank" rel="noreferrer" >{ process.env.REACT_APP_PUBLIC_URL }/resume</a>)</i>
                </div>
              </>
            }
          </>
        )
      }
    </div>
  )
}

export default ExperienceTally
