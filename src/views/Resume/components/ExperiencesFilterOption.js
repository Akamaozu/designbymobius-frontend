const ExperiencesFilterOption = props => {
  const { active, children, onClick, slug } = props
  const baseClass = 'Experiences-filter-option'
  const classes = [
    baseClass,
    `${baseClass}-${slug}`,
  ]

  if (active) classes.push(`${baseClass}-active`)

  return (
    <div
      key={slug}
      className={classes.join(' ')}
      onClick={onClick}
    >
      { children }
    </div>
  )
}

export default ExperiencesFilterOption
