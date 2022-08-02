import Experience from './Experience'

const ExperiencesList = props => {
  const experiences = props?.experiences ?? []

  return (
    <div className="Experiences">
      {
        experiences.length > 0
          ? experiences.map(experience => {
              return <Experience data={experience} key={experience.slug} />
            })
          : <span>No Experience Found</span>
      }
    </div>
  )
}

export default ExperiencesList
