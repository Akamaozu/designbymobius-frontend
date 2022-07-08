import { Link } from 'react-router-dom'
import Logo from '../Logo'
import './style.css'

const AppHeader = () => {
  return (
    <div className="AppHeader">
      <Link to="/" className="LogoLink">
        <Logo />
      </Link>
    </div>
  )
}

export default AppHeader
