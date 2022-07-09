import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import data from '../../data'
import './style.css'

const Experience = props => {
  const experience = props.data ?? {}
  const duration = experience.start === experience.end
                    ? experience.start
                    : `${experience.start} - ${experience.end}`

  return (
    <div className="Experience">
      <div className="Experience-title">{ experience.title }</div>
      <div className="Experience-when">{ duration }</div>
    </div>
  )
}

const Resume = () => {
  const experiences = data?.experiences?.items ?? []
  const sortedExperiences = [...experiences].sort((a,b) => {
    // sort newer start date higher
    if (a.start > b.start) return -1
    if (a.start < b.start) return 1

    // sort newer end date higher
    if (a.end > b.end) return -1
    if (a.end < b.end) return 1

    return 0
  })

  return (
    <>
      <ViewTitle>Resume</ViewTitle>
      <ViewSubtitle>
        Curated experience from <span className="emphasis">10+ years writing code</span>
      </ViewSubtitle>
      <div className="Experiences">
        {
          experiences.length > 0
            ? sortedExperiences.map(experience => {
                return <Experience data={experience} />
              })
            : <span>No Experience Found</span>
        }
      </div>
    </>
  )
}

export default Resume
