import { useState } from 'react'
import './App.css'
import Game from './pages/game/game'
import Header from './common/components/Header'
import HeroSection from './common/components/HeroSection'
import GameCategories from './common/components/GameCategories'
import Sidebar from './common/components/Sidebar'
import Footer from './common/components/Footer'


function App() {
  const [currentPage, setCurrentPage] = useState<'pages/home' | 'pages/game/game'>('pages/home')

  const handleStartPlaying = () => {
    setCurrentPage('pages/game/game')
  }

  const handleBackToHome = () => {
    setCurrentPage('pages/home')
  }

  if (currentPage === 'pages/game/game') {
    return <Game onBack={handleBackToHome} />
  }

  return (
    <div className="app">
      <Header isHomePage={true}/>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Left Content Area */}
          <div className="left-content">
            <HeroSection onStartPlaying={handleStartPlaying} />
            <GameCategories />
            {/* <StatsSection /> */}
          </div>

          {/* Right Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
