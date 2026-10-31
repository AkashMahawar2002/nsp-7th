import { useState, useEffect } from 'react'
import './HeroSection.css'

const STATIONS = ['New Delhi Railway Station', 'Mumbai CST', 'Howrah Junction', 'Chennai Central', 'Bengaluru City Junction']
const SEARCH_SUGGESTIONS = [
  { icon: '🚻', label: 'Restrooms – Platform 3', type: 'Facility' },
  { icon: '🍽️', label: 'Food Court – Main Hall', type: 'Food' },
  { icon: '🛒', label: 'Pharmacy – Exit Gate B', type: 'Medical' },
  { icon: '💳', label: 'ATM – Near Waiting Hall', type: 'Banking' },
  { icon: '🛏️', label: 'Retiring Room – Level 2', type: 'Rest' },
  { icon: '🚌', label: 'Bus Stand – East Exit', type: 'Transport' },
]

const STATS = [
  { value: '24+', label: 'Platforms Covered' },
  { value: '150+', label: 'Facilities Mapped' },
  { value: '4.9★', label: 'User Rating' },
  { value: '50K+', label: 'Daily Users' },
]

export default function HeroSection({ setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentStation, setCurrentStation] = useState(0)
  const [typedStation, setTypedStation] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  // Typewriter effect
  useEffect(() => {
    const station = STATIONS[currentStation]
    let timeout
    if (!isDeleting && charIdx < station.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 60)
    } else if (!isDeleting && charIdx === station.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 35)
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false)
      setCurrentStation(c => (c + 1) % STATIONS.length)
    }
    setTypedStation(station.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, isDeleting, currentStation])

  const filtered = SEARCH_SUGGESTIONS.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    setActivePage('navigate')
  }

  return (
    <section className="hero">
      {/* Animated background particles */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      {/* Train animation strip */}
      <div className="hero__train-strip">
        <div className="hero__train">
          <span>🚆</span>
          <div className="hero__train-body">
            <div className="hero__train-window"/>
            <div className="hero__train-window"/>
            <div className="hero__train-window"/>
          </div>
        </div>
        <div className="hero__track"/>
      </div>

      <div className="container hero__content">
        {/* Station Badge */}
        <div className="hero__station-badge animate-fade-up">
          <span className="hero__station-dot"/>
          <span>Currently at: </span>
          <strong className="hero__station-name">{typedStation}<span className="hero__cursor">|</span></strong>
        </div>

        {/* Headline */}
        <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Find Your Way<br/>
          <span className="gradient-text">Inside Any</span>{' '}
          <span className="gradient-text-gold">Railway Station</span>
        </h1>

        <p className="hero__subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Real-time indoor navigation for platforms, restrooms, food, ATMs,<br/>
          medical aid, and 150+ facilities — all at your fingertips.
        </p>

        {/* Search Bar */}
        <div className="hero__search-wrap animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <form className="hero__search" onSubmit={handleSearch}>
            <div className="hero__search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <input
              type="text"
              className="hero__search-input"
              placeholder="Search facilities, platforms, exits..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button type="submit" className="hero__search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Navigate
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="hero__suggestions">
              {(searchQuery ? filtered : SEARCH_SUGGESTIONS).map((s, i) => (
                <button key={i} className="hero__suggestion-item" onClick={() => { setSearchQuery(s.label); setActivePage('navigate') }}>
                  <span className="hero__suggestion-icon">{s.icon}</span>
                  <span className="hero__suggestion-label">{s.label}</span>
                  <span className="badge badge-blue">{s.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Pills */}
        <div className="hero__pills animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: '🚻', label: 'Restrooms' },
            { icon: '🍽️', label: 'Food Court' },
            { icon: '💊', label: 'Medical Aid' },
            { icon: '💳', label: 'ATM / Bank' },
            { icon: '🛏️', label: 'Retiring Room' },
            { icon: '🚌', label: 'Bus / Auto' },
          ].map((p, i) => (
            <button key={i} className="hero__pill" onClick={() => { setSearchQuery(p.label); setActivePage('facilities') }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero__ctas animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <button className="btn-primary" onClick={() => setActivePage('map')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
            </svg>
            View Station Map
          </button>
          <button className="btn-outline" onClick={() => setActivePage('navigate')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            Get Directions
          </button>
        </div>

        {/* Stats */}
        <div className="hero__stats animate-fade-up" style={{ animationDelay: '0.6s' }}>
          {STATS.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value gradient-text">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-hint animate-bounce">
        <span>Scroll to explore</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}
