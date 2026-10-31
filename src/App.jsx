import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import QuickAccess from './components/QuickAccess'
import StationMap from './components/StationMap'
import FacilitiesPage from './components/FacilitiesPage'
import NavigationGuide from './components/NavigationGuide'
import TrainSchedule from './components/TrainSchedule'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('home')

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <HeroSection setActivePage={setActivePage} />
            <QuickAccess setActivePage={setActivePage} />
          </>
        )
      case 'map':
        return <StationMap />
      case 'facilities':
        return <FacilitiesPage />
      case 'navigate':
        return <NavigationGuide />
      case 'schedule':
        return <TrainSchedule />
      default:
        return (
          <>
            <HeroSection setActivePage={setActivePage} />
            <QuickAccess setActivePage={setActivePage} />
          </>
        )
    }
  }

  return (
    <div className="app-root">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content page-enter" key={activePage}>
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  )
}

export default App
