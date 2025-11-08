import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import Home from './views/Home'
import Resume from './views/Resume'
import Projects from './views/Projects'
import './App.css'

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
      </div>
    </BrowserRouter>
  )
}

export default App
