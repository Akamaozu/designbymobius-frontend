const ExperienceNotesViewToggler = props => {
  const { showNotes, toggleViewState } = props
  return (
    <span onClick={ toggleViewState }>
      {
        showNotes
          ? 'Hide Notes'
          : 'Show Notes'
      }
    </span>
  )
}

export default ExperienceNotesViewToggler
