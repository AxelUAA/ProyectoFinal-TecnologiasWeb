import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PersonalInfoPage from './pages/PersonalInfoPage'
import SkillsPage from './pages/SkillsPage'
import DashboardPage from './pages/DashboardPage'
import PreviewPage from './pages/PreviewPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PersonalInfoPage />} />
          <Route path="/habilidades" element={<SkillsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
