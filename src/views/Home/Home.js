import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h3>Software Engineer</h3>
      <h5>
        <span className="emphasis">JavaScript</span>
        {" "} + <span className="emphasis">Node.js</span>
        {" "} + <span className="emphasis">React</span>
      </h5>
      <div className="categories">
        <Link className="category" to="/resume">
          <div className="category-title">Resume</div>
          <div className="category-subtitle">Curated experience from 10+ years writing code</div>
        </Link>
        <Link className="category" to="/projects">
          <div className="category-title">Projects</div>
          <div className="category-subtitle">Things I've built, from open-source libraries to businesses</div>
        </Link>
      </div>
    </>
  )
}

export default Home
