import './style.css'

const ViewTitle = props => {
  return (
    <h3 className="ViewTitle">
      { props.children }
    </h3>
  )
}

export default ViewTitle
