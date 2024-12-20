import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import FacebookChat from './components/FacebookChat'
import Home from './views/Home'
import Resume from './views/Resume'
import Projects from './views/Projects'
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
            <Route path="/projects" element={ <Projects /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
          </Routes>
        </div>
        {
          FACEBOOK_PAGE_ID
            ? <FacebookChat pageId={ FACEBOOK_PAGE_ID } language="en_US" />
            : null
        }
      </div>
    </BrowserRouter>
  )
}

export default App
