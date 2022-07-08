import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import data from '../../data'
import './style.css'

const WorkExperience = props => {
  const experience = props.experience ?? {}
  const duration = experience.start === experience.end ? experience.start : `${experience.start} - ${experience.end}`

  return (
    <div className="workExperience">
      <div className="workExperience-title">{ experience.title }</div>
      <div className="workExperience-when">{ duration }</div>
    </div>
  )
}

const Resume = () => {
  const workExperiences = data?.workExperiences ?? []
  const sortedWorkExperiences = [...workExperiences].sort((a,b) => {
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
      <div className="workExperiences">
        {
          sortedWorkExperiences.map(experience => {
            return <WorkExperience experience={experience} />
          })
        }
      </div>
    </>
  )
}

export default Resume
