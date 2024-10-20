import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperienceTally = () => {
  const [ state ] = useView()

  const experiences = state?.experiences?.items ?? []
  const experienceFilters = state?.experiences?.filters ?? {}
  const experienceTypesMap = state?.experiences?.typeMap ?? {}
  const technologyMap = state?.technologies?.map ?? {}
  const isFiltered = state?.experiences?.isFiltered ? true : false
  const filteredExperiences = isFiltered
    ? state?.experiences?.filteredExperiences ?? []
    : state?.experiences?.items ?? []

  const experience_year_map = {}
  experiences?.forEach( experience => {
    const {
      slug,
      start,
      end,
    } = experience ?? {}

    if (!slug || !start) return

    if (!experience_year_map[ start ]) experience_year_map[ start ] = []

    experience_year_map[ start ].push( slug )

    if (start === end) return

    const start_int = parseInt( start )
    const end_int = end
      ? parseInt( end )
      : (new Date()).getFullYear()

    if (start_int > end_int) return

    for (var i = start_int + 1; i <= end_int; i += 1) {
      if (!experience_year_map[ i ]) experience_year_map[ i ] = []

      experience_year_map[ i ].push( slug )
    }
  })

  const years_of_experience = Object
    .keys( experience_year_map )
    .length
    - 1

  const technology_type_map = state?.technologies?.items?.reduce(
    ( map, technology ) => {
      const {
        slug,
        type,
      } = technology ?? {}

      if (!map[ type ]) map[ type ] = []

      map[ type ].push( slug )

      return map
    },
    {}
  )

  const technology_tags = state?.technologies?.items?.reduce(( map, technology ) => {
    if (!technology?.tags || !technology.tags?.length || technology.tags.length < 1) return map

    technology.tags.forEach( tag => {
      if (!map.hasOwnProperty( tag )) map[ tag ] = []

      map[ tag ].push( technology.slug )
    })

    return map
  }, {})

  experienceFilters?.types?.sort()

  return (
    <div className='Experiences-tally'>
      <div className='Experiences-tally-unfiltered'>
        { years_of_experience } { years_of_experience === 1 ? 'Year' : 'Years' } of Experience.
        <br />
        { technology_type_map[ 'programming-language' ].length } { technology_type_map[ 'programming-language' ].length === 1 ? 'Language' : 'Languages' }.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_type_map[ 'programming-language' ].map( id => state.technologies.map[ id ].label ).join(', ') }
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
        { technology_type_map[ 'message-queue' ].length } { technology_type_map[ 'message-queue' ].length === 1 ? 'Message Queue' : 'Message Queues' }.
        {' '}
        <span
          style={{
            color: '#888',
            fontSize: '85%',
          }}
        >
          { technology_type_map[ 'message-queue' ].map( id => state.technologies.map[ id ].label ).join(', ') }
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
        { experiences.length } { experiences.length === 1 ? 'Experience' : 'Experiences' }.
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
                  <i>(view full list of experiences at: <a href={ `${ process.env.REACT_APP_PUBLIC_URL }/resume` } target="_blank" >{ process.env.REACT_APP_PUBLIC_URL }/resume</a>)</i>
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
