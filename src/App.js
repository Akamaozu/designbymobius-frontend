import Logo from './components/Logo';
import FacebookChat from './components/FacebookChat';
import './App.css';

const FACEBOOK_PAGE_ID = process.env.REACT_APP_FACEBOOK_PAGE_ID;

function App() {
  return (
    <div className="App">
      <div className="App-header header">
        <Logo />
      </div>
      <div className="App-content">
        <h3>Software Engineer</h3>
        <h5>
          <span className="emphasis">JavaScript</span>
          {" "} + <span className="emphasis">Node.js</span>
          {" "} + <span className="emphasis">React</span>
         </h5>
        <div className="categories">
          <div className="category">
            <div className="category-title">Resume</div>
          </div>
          <div className="category">
            <div className="category-title">Projects</div>
          </div>
          <div className="category">
            <div className="category-title">Blog</div>
          </div>
        </div>
      </div>
      {
        FACEBOOK_PAGE_ID
          ? <FacebookChat pageId={ FACEBOOK_PAGE_ID } />
          : null
      }
    </div>
  );
}

export default App;
