import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import FacebookChat from './components/FacebookChat'
import Home from './views/Home'
import Resume from './views/Resume'
import './App.css'

const FACEBOOK_PAGE_ID = process.env.REACT_APP_FACEBOOK_PAGE_ID

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppHeader />
        <div className="AppView">
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/resume" element={ <Resume /> } />
              <Route path="/projects" element={ <Resume /> } />
            </Routes>
        </div>
        {
          FACEBOOK_PAGE_ID
            ? <FacebookChat pageId={ FACEBOOK_PAGE_ID } language="en_US" />
            : null
        }
      </div>
    </BrowserRouter>
  );
}

export default App
