import './style.css'

const ListItem = ({ title, description }) => {
  return (
    <li className='ListItem'>
      {
        title
          ? <span className='Title'>{ title }</span>
          : null
      }
      {
        description
          ? <span className='Description'>{ description }</span>
          : null
      }
    </li>
  )	
}

export default ListItem
