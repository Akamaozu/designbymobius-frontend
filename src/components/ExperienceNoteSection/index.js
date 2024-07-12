import './style.css'

const ExperienceNoteSection = ({ title, children }) => {
	return (
    <div className='ExperienceNoteSection'>
      {
        title
          ? <div className='Title'>{ title }</div>
          : null
      }
      { children }
    </div>
  )
}

export default ExperienceNoteSection
