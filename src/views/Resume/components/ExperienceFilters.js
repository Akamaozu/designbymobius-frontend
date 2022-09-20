import ExperiencesFilterOption from './ExperiencesFilterOption'
import viewContext from '../contexts/view'

const { useView } = viewContext

const ExperienceFilters = props => {
  const [ state, updateState ] = useView()

  const experienceTypes = state?.experiences?.types ?? []
  const experienceFilters = state?.experiences?.filters ?? {}
  const technologies = state?.technologies?.items ?? []

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

  return (
    <>
      <div className="Experiences-filters">
        <div className="Experiences-filters-title">Filter Experiences</div>
        <div className="Experiences-filter Experiences-filter-type">
          <div className="Experiences-filter-title">Type</div>
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
          <div className="Experiences-filter-title">technology</div>
          {
            technologies
              .sort((a,b) => {
                // label, alphabetically
                if (a.label > b.label) return 1
                if (a.label < b.label) return -1
                return 0
              })
              .map(technology => {
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
        </div>
      </div>
    </>
  )
}

export default ExperienceFilters
