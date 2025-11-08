import { Link } from 'react-router-dom'
import ViewTitle from '../../components/ViewTitle'
import ViewSubtitle from '../../components/ViewSubtitle'
import './style.css'

const HomeCategory = props => {
  return (
    <Link className="HomeCategory" to={ props.to }>
      <div className="HomeCategory-title">{ props.title }</div>
      <div className="HomeCategory-subtitle">{ props.subtitle }</div>
    </Link>
  )
}

const Home = () => {
  return (
    <>
      <ViewTitle>Uzo Olisemeka</ViewTitle>
      <ViewSubtitle>
        <span className="emphasis">Software Engineer</span>
        {" "} + <span className="emphasis">Reader</span>
        {" "} + <span className="emphasis">Gamer</span>
        {" "} + <span className="emphasis">Optimist</span>
      </ViewSubtitle>
      <div className="HomeCategories">
        <HomeCategory
          to="/resume"
          title="Resume"
          subtitle="Curated experience from 10+ years writing code"
        />
        <HomeCategory
          to="/projects"
          title="Projects"
          subtitle="Things I've built, from open-source libraries to businesses"
        />
      </div>
    </>
  )
}

export default Home
