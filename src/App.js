import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header header">
        <div className="logo">designbymobius</div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
