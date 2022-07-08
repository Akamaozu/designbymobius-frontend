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
      <ViewTitle>Software Engineer</ViewTitle>
      <ViewSubtitle>
        <span className="emphasis">JavaScript</span>
        {" "} + <span className="emphasis">Node.js</span>
        {" "} + <span className="emphasis">React</span>
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
