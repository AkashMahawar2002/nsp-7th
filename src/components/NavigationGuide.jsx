import { useState } from 'react'
import './NavigationGuide.css'

const LOCATIONS = [
  { id: 'main-entrance', label: 'Main Entrance', icon: '🚪' },
  { id: 'platform-1', label: 'Platform 1', icon: '🚉' },
  { id: 'platform-2', label: 'Platform 2', icon: '🚉' },
  { id: 'platform-3', label: 'Platform 3', icon: '🚉' },
  { id: 'platform-4', label: 'Platform 4', icon: '🚉' },
  { id: 'platform-5', label: 'Platform 5', icon: '🚉' },
  { id: 'food-court', label: 'Food Court', icon: '🍽️' },
  { id: 'waiting-hall', label: 'Waiting Hall', icon: '🛋️' },
  { id: 'booking-office', label: 'Booking Office', icon: '🎫' },
  { id: 'restroom-m', label: "Men's Restroom", icon: '🚹' },
  { id: 'restroom-f', label: "Women's Restroom", icon: '🚺' },
  { id: 'atm', label: 'ATM (SBI)', icon: '💳' },
  { id: 'medical', label: 'Medical Booth', icon: '💊' },
  { id: 'bus-stand', label: 'Bus Stand', icon: '🚌' },
  { id: 'parking', label: 'Parking Area', icon: '🅿️' },
  { id: 'cloakroom', label: 'Cloakroom', icon: '🧳' },
  { id: 'retiring-room', label: 'Retiring Room', icon: '🛏️' },
]

// Mock directions generator
function generateDirections(from, to) {
  const templates = [
    `Head ${['straight', 'left', 'right'][Math.floor(Math.random()*3)]} from ${from.label}`,
    `Walk ${Math.floor(Math.random() * 60 + 20)}m along the main corridor`,
    `Pass the ${['waiting hall', 'ticket counter', 'platform gates'][Math.floor(Math.random()*3)]}`,
    `Turn ${['left', 'right'][Math.floor(Math.random()*2)]} at the signboard`,
    `Continue for ${Math.floor(Math.random() * 40 + 10)}m`,
    `${to.label} will be on your ${['left', 'right'][Math.floor(Math.random()*2)]}`,
  ]
  return templates.map((text, i) => ({
    step: i + 1,
    text,
    icon: ['📍', '🚶', '👀', '↩️', '🚶', '✅'][i],
    dist: i < 5 ? `${Math.floor(Math.random() * 60 + 10)}m` : null,
  }))
}

const ACCESSIBILITY_OPTIONS = [
  { id: 'wheelchair', label: 'Wheelchair Accessible', icon: '♿' },
  { id: 'elevator', label: 'Use Elevators Only', icon: '🛗' },
  { id: 'shortest', label: 'Shortest Path', icon: '⚡' },
  { id: 'avoid-crowd', label: 'Avoid Crowded Areas', icon: '👥' },
]

const NEARBY_ALERTS = [
  { icon: '🔔', text: 'Rajdhani Express arrives at Platform 3 in 8 minutes', type: 'warning' },
  { icon: '⚠️', text: 'Platform 2 is crowded due to delayed 12305 Express', type: 'caution' },
  { icon: '✅', text: 'Food Court is currently open and less crowded', type: 'success' },
]

export default function NavigationGuide() {
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [accessibility, setAccessibility] = useState([])
  const [directions, setDirections] = useState(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleGetDirections = () => {
    if (!fromLocation || !toLocation) return
    const from = LOCATIONS.find(l => l.id === fromLocation)
    const to = LOCATIONS.find(l => l.id === toLocation)
    if (!from || !to) return
    setDirections({ from, to, steps: generateDirections(from, to) })
    setCurrentStep(0)
    setIsNavigating(false)
  }

  const toggleAccessibility = (id) => {
    setAccessibility(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const swapLocations = () => {
    setFromLocation(toLocation)
    setToLocation(fromLocation)
    setDirections(null)
  }

  const totalDist = directions
    ? directions.steps.filter(s => s.dist).reduce((acc, s) => acc + parseInt(s.dist), 0)
    : 0

  return (
    <section className="nav-guide-page">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">🧭 Navigation Guide</div>
          <h1 className="section-title">
            Step-by-Step <span className="gradient-text">Directions</span>
          </h1>
          <p className="section-subtitle">
            Get precise indoor navigation with accessibility options and real-time alerts.
          </p>
        </div>

        {/* Alerts */}
        <div className="nav__alerts">
          {NEARBY_ALERTS.map((alert, i) => (
            <div key={i} className={`nav__alert nav__alert--${alert.type}`}>
              <span>{alert.icon}</span>
              <span>{alert.text}</span>
            </div>
          ))}
        </div>

        <div className="nav__layout">
          {/* Form Panel */}
          <div className="nav__form-panel glass-card">
            <h2 className="nav__form-title">Plan Your Route</h2>

            {/* From/To Inputs */}
            <div className="nav__route-inputs">
              <div className="nav__input-group">
                <label className="nav__label">
                  <span className="nav__label-dot nav__label-dot--green"/>
                  From (Your Location)
                </label>
                <select
                  className="nav__select"
                  value={fromLocation}
                  onChange={e => setFromLocation(e.target.value)}
                >
                  <option value="">Select starting point…</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.icon} {loc.label}</option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <button className="nav__swap" onClick={swapLocations} title="Swap locations">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </button>

              <div className="nav__input-group">
                <label className="nav__label">
                  <span className="nav__label-dot nav__label-dot--blue"/>
                  To (Destination)
                </label>
                <select
                  className="nav__select"
                  value={toLocation}
                  onChange={e => setToLocation(e.target.value)}
                >
                  <option value="">Select destination…</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.icon} {loc.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Accessibility */}
            <div className="nav__accessibility">
              <h4 className="nav__accessibility-title">⚙️ Preferences</h4>
              <div className="nav__accessibility-options">
                {ACCESSIBILITY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`nav__acc-btn ${accessibility.includes(opt.id) ? 'nav__acc-btn--active' : ''}`}
                    onClick={() => toggleAccessibility(opt.id)}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Get Directions Button */}
            <button
              className={`nav__go-btn ${(!fromLocation || !toLocation) ? 'nav__go-btn--disabled' : ''}`}
              onClick={handleGetDirections}
              disabled={!fromLocation || !toLocation}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Get Directions
            </button>

            {directions && (
              <div className="nav__route-summary">
                <div className="nav__summary-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/>
                  </svg>
                  <span>~{totalDist}m total</span>
                </div>
                <div className="nav__summary-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>~{Math.ceil(totalDist / 80)} min walk</span>
                </div>
                <div className="nav__summary-item">
                  <span>🚶</span>
                  <span>{directions.steps.length} steps</span>
                </div>
              </div>
            )}
          </div>

          {/* Directions Panel */}
          <div className="nav__directions-panel">
            {directions ? (
              <div className="nav__directions glass-card animate-fade-in">
                <div className="nav__directions-header">
                  <div className="nav__directions-route">
                    <span className="nav__from-badge">{directions.from.icon} {directions.from.label}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <span className="nav__to-badge">{directions.to.icon} {directions.to.label}</span>
                  </div>
                  <button
                    className={`nav__start-btn ${isNavigating ? 'nav__start-btn--active' : ''}`}
                    onClick={() => { setIsNavigating(!isNavigating); setCurrentStep(0) }}
                  >
                    {isNavigating ? '⏹ Stop' : '▶ Start Navigation'}
                  </button>
                </div>

                <div className="nav__steps">
                  {directions.steps.map((step, i) => (
                    <div
                      key={i}
                      className={`nav__step ${isNavigating && currentStep === i ? 'nav__step--active' : ''} ${isNavigating && currentStep > i ? 'nav__step--done' : ''}`}
                      onClick={() => isNavigating && setCurrentStep(i)}
                    >
                      <div className="nav__step-indicator">
                        <div className="nav__step-num">
                          {isNavigating && currentStep > i
                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                            : step.step
                          }
                        </div>
                        {i < directions.steps.length - 1 && <div className="nav__step-line" />}
                      </div>
                      <div className="nav__step-content">
                        <div className="nav__step-icon">{step.icon}</div>
                        <div className="nav__step-text">{step.text}</div>
                        {step.dist && <span className="nav__step-dist">{step.dist}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {isNavigating && (
                  <div className="nav__nav-controls">
                    <button
                      className="btn-outline"
                      disabled={currentStep === 0}
                      onClick={() => setCurrentStep(s => s - 1)}
                    >
                      ← Previous
                    </button>
                    <span className="nav__step-progress">
                      Step {currentStep + 1} / {directions.steps.length}
                    </span>
                    <button
                      className="btn-primary"
                      disabled={currentStep === directions.steps.length - 1}
                      onClick={() => setCurrentStep(s => s + 1)}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav__placeholder glass-card">
                <div className="nav__placeholder-icon animate-float">🧭</div>
                <h3>Your Directions Will Appear Here</h3>
                <p>Select your starting point and destination, then tap "Get Directions".</p>
                <div className="nav__quick-routes">
                  <h4>Popular Routes</h4>
                  {[
                    { from: 'main-entrance', to: 'platform-3', label: 'Entrance → Platform 3' },
                    { from: 'platform-1', to: 'food-court', label: 'Platform 1 → Food Court' },
                    { from: 'main-entrance', to: 'restroom-m', label: 'Entrance → Restroom' },
                    { from: 'booking-office', to: 'platform-2', label: 'Booking → Platform 2' },
                  ].map((route, i) => (
                    <button key={i} className="nav__quick-route"
                      onClick={() => { setFromLocation(route.from); setToLocation(route.to) }}>
                      {route.label} →
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
