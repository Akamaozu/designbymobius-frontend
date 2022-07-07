import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import FacebookChat from './components/FacebookChat';
import Home from './views/Home';
import Resume from './views/Resume';
import './App.css';

const FACEBOOK_PAGE_ID = process.env.REACT_APP_FACEBOOK_PAGE_ID;

function App() {
  return (
    <div className="App">
      <div className="App-header header">
        <Logo />
      </div>
      <div className="App-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/resume" element={ <Resume /> } />
            <Route path="/projects" element={ <Resume /> } />
          </Routes>
        </BrowserRouter>
      </div>
      {
        FACEBOOK_PAGE_ID
          ? <FacebookChat pageId={ FACEBOOK_PAGE_ID } language="en_US" />
          : null
      }
    </div>
  );
}

export default App;
