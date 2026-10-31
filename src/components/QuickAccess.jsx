import './QuickAccess.css'

const CATEGORIES = [
  {
    icon: '🚉',
    title: 'Platforms',
    description: 'Find your platform, track live train arrivals and departures.',
    color: '#4f8ef7',
    count: '24 Platforms',
    page: 'map',
  },
  {
    icon: '🍽️',
    title: 'Food & Drink',
    description: 'Restaurants, cafes, snack stalls, and vending machines.',
    color: '#f59e0b',
    count: '32 Outlets',
    page: 'facilities',
  },
  {
    icon: '🚻',
    title: 'Restrooms',
    description: 'Clean restrooms and hygiene facilities across all floors.',
    color: '#10b981',
    count: '18 Locations',
    page: 'navigate',
  },
  {
    icon: '💊',
    title: 'Medical Aid',
    description: 'First aid booths, pharmacies, and emergency medical help.',
    color: '#ef4444',
    count: '6 Centres',
    page: 'facilities',
  },
  {
    icon: '💳',
    title: 'ATM & Banking',
    description: 'ATMs, currency exchange, and banking kiosks.',
    color: '#a78bfa',
    count: '12 ATMs',
    page: 'facilities',
  },
  {
    icon: '🛏️',
    title: 'Retiring Rooms',
    description: 'Book waiting rooms and retiring rooms for short rests.',
    color: '#06b6d4',
    count: '40 Rooms',
    page: 'facilities',
  },
  {
    icon: '🚌',
    title: 'Transport Links',
    description: 'Buses, autos, taxis, and metro connections.',
    color: '#f97316',
    count: '5 Exits',
    page: 'map',
  },
  {
    icon: '🅿️',
    title: 'Parking',
    description: 'Car, bike, and two-wheeler parking zones.',
    color: '#84cc16',
    count: '3 Zones',
    page: 'map',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📍',
    title: 'Enter Your Location',
    description: 'Tell us where you are inside the station — platform, entrance, or any landmark.',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Search Destination',
    description: 'Search for any facility — food court, restroom, medical, ATM, or specific platform.',
  },
  {
    step: '03',
    icon: '🗺️',
    title: 'Get Directions',
    description: 'Follow step-by-step visual directions with distance and estimated walk time.',
  },
  {
    step: '04',
    icon: '✅',
    title: 'Arrive with Ease',
    description: 'Reach your destination confidently even in the busiest stations.',
  },
]

export default function QuickAccess({ setActivePage }) {
  return (
    <>
      {/* Quick Access Section */}
      <section className="quick-access">
        <div className="container">
          <div className="section-header">
            <div className="section-label">⚡ Quick Access</div>
            <h2 className="section-title">
              Everything You Need,<br/>
              <span className="gradient-text">Instantly Found</span>
            </h2>
            <p className="section-subtitle">
              Browse all station facilities categorized for quick access. Tap any category to find the nearest location.
            </p>
          </div>

          <div className="qa__grid">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                className="qa__card"
                style={{ '--cat-color': cat.color, animationDelay: `${i * 0.07}s` }}
                onClick={() => setActivePage(cat.page)}
              >
                <div className="qa__card-glow" />
                <div className="qa__card-top">
                  <div className="qa__icon" style={{ background: `${cat.color}22`, border: `1.5px solid ${cat.color}44` }}>
                    <span>{cat.icon}</span>
                  </div>
                  <span className="qa__count" style={{ color: cat.color }}>{cat.count}</span>
                </div>
                <h3 className="qa__title">{cat.title}</h3>
                <p className="qa__desc">{cat.description}</p>
                <div className="qa__arrow" style={{ color: cat.color }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Explore
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-label">🧭 How It Works</div>
            <h2 className="section-title">
              Navigate in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="section-subtitle">
              Our intuitive navigation system makes it effortless to find any facility inside the station.
            </p>
          </div>

          <div className="hiw__steps">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="hiw__step" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="hiw__step-number gradient-text">{step.step}</div>
                <div className="hiw__icon">{step.icon}</div>
                <h3 className="hiw__title">{step.title}</h3>
                <p className="hiw__desc">{step.description}</p>
                {i < HOW_IT_WORKS.length - 1 && <div className="hiw__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner glass-card">
            <div className="cta-banner__glow" />
            <div className="cta-banner__content">
              <div className="cta-banner__icon animate-float">🚆</div>
              <div>
                <h2 className="cta-banner__title">
                  Ready to Navigate <span className="gradient-text">Smarter?</span>
                </h2>
                <p className="cta-banner__subtitle">
                  Explore the interactive station map and never get lost again.
                </p>
              </div>
            </div>
            <div className="cta-banner__actions">
              <button className="btn-primary" onClick={() => setActivePage('map')}>
                🗺️ Open Station Map
              </button>
              <button className="btn-outline" onClick={() => setActivePage('schedule')}>
                🚆 Train Schedule
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
