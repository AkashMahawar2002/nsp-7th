import { useState } from 'react'
import './FacilitiesPage.css'

const FACILITIES_DATA = [
  // Food
  { id: 1, name: 'Railway Food Court', category: 'food', icon: '🍽️', location: 'Main Hall, Ground Floor', status: 'open', rating: 4.2, timings: '06:00 – 22:00', distance: '120m', features: ['Veg & Non-Veg', 'Seating 200+', 'AC Hall'], description: 'Large multi-cuisine food court with IRCTC stalls, local eateries, and branded outlets.' },
  { id: 2, name: 'Platform Snack Stall', category: 'food', icon: '🥪', location: 'Platform 2 & 3', status: 'open', rating: 3.8, timings: '05:00 – 23:00', distance: '50m', features: ['Quick Bites', 'Tea & Coffee'], description: 'Quick snacks, chai, samosas, and packaged foods on platform.' },
  { id: 3, name: 'Dominoʼs Pizza Kiosk', category: 'food', icon: '🍕', location: 'Exit Gate A', status: 'open', rating: 4.5, timings: '08:00 – 22:00', distance: '200m', features: ['Pizza', 'Beverages', 'Quick Service'], description: 'Branded pizza kiosk near the main exit.' },
  // Restrooms
  { id: 4, name: "Men's Restroom", category: 'restroom', icon: '🚹', location: 'Near Platform 2', status: 'open', rating: 3.5, timings: '24 Hours', distance: '80m', features: ['Clean', 'Attendant', 'Paid'], description: 'Clean paid restroom with attendant, near platform 2.' },
  { id: 5, name: "Women's Restroom", category: 'restroom', icon: '🚺', location: 'Near Platform 4', status: 'open', rating: 4.0, timings: '24 Hours', distance: '160m', features: ['Clean', 'Attendant', 'Baby Change'], description: "Women's restroom with baby changing area near platform 4." },
  { id: 6, name: 'Divyangjan Restroom', category: 'restroom', icon: '♿', location: 'Main Hall', status: 'open', rating: 4.3, timings: '24 Hours', distance: '100m', features: ['Accessible', 'Free', 'Assisted'], description: 'Accessible restroom for differently-abled passengers.' },
  // Medical
  { id: 7, name: 'Railway Medical Booth', category: 'medical', icon: '🏥', location: 'Near Booking Office', status: 'open', rating: 4.5, timings: '24 Hours', distance: '90m', features: ['First Aid', 'Stretcher', 'Doctor on Call'], description: 'Emergency medical booth with first aid and doctor on call.' },
  { id: 8, name: 'Station Pharmacy', category: 'medical', icon: '💊', location: 'Exit Gate B', status: 'open', rating: 4.1, timings: '07:00 – 22:00', distance: '180m', features: ['Medicines', 'OTC Drugs', 'Supplements'], description: 'Pharmacy with common medicines and health products.' },
  // Banking
  { id: 9, name: 'SBI ATM', category: 'banking', icon: '💳', location: 'Main Entrance Hall', status: 'open', rating: 4.0, timings: '24 Hours', distance: '60m', features: ['24x7', 'Cash Deposit', 'SBI'], description: 'SBI ATM with cash withdrawal and deposit facility.' },
  { id: 10, name: 'HDFC ATM', category: 'banking', icon: '🏦', location: 'Exit Gate A', status: 'open', rating: 4.2, timings: '24 Hours', distance: '150m', features: ['24x7', 'HDFC', 'UPI QR'], description: 'HDFC ATM with QR code payment support.' },
  { id: 11, name: 'Currency Exchange', category: 'banking', icon: '💱', location: 'International Terminal', status: 'closed', rating: 3.9, timings: '09:00 – 18:00', distance: '300m', features: ['Foreign Currency', 'Forex', 'Prepaid Card'], description: 'Currency exchange for international travellers.' },
  // Transport
  { id: 12, name: 'City Bus Stand', category: 'transport', icon: '🚌', location: 'West Exit', status: 'open', rating: 3.7, timings: '05:00 – 23:00', distance: '200m', features: ['BEST Buses', 'AC Buses', 'Route Maps'], description: 'City bus stand with routes to all major areas.' },
  { id: 13, name: 'Prepaid Taxi Booth', category: 'transport', icon: '🚕', location: 'East Exit', status: 'open', rating: 4.3, timings: '24 Hours', distance: '220m', features: ['Fixed Fare', 'AC Cabs', 'OLA/Uber'], description: 'Government prepaid taxi booth with fixed fares.' },
  { id: 14, name: 'Auto Rickshaw Stand', category: 'transport', icon: '🛺', location: 'South Exit', status: 'open', rating: 3.5, timings: '05:00 – 01:00', distance: '180m', features: ['Metered', 'App Booking'], description: 'Auto rickshaw stand with metered and app-based booking.' },
  // Rest & Services
  { id: 15, name: 'AC Waiting Hall', category: 'rest', icon: '🛋️', location: 'Main Hall, Ground Floor', status: 'open', rating: 4.4, timings: '24 Hours', distance: '100m', features: ['AC', '200 Seats', 'Charging Points', 'TV'], description: 'Air-conditioned waiting hall with charging points and live TV.' },
  { id: 16, name: 'Retiring Room', category: 'rest', icon: '🛏️', location: 'Floor 1', status: 'open', rating: 4.6, timings: '24 Hours', distance: '250m', features: ['Online Booking', 'AC Rooms', '24h Max'], description: 'Book retiring rooms online. 12h and 24h packages available.' },
  { id: 17, name: 'Cloakroom / Luggage', category: 'service', icon: '🧳', location: 'Near Platform 1', status: 'open', rating: 4.0, timings: '05:00 – 23:00', distance: '70m', features: ['₹30/day', 'Locked Storage', 'Receipt'], description: 'Safe luggage storage with receipt. Pay per day.' },
  { id: 18, name: 'Ticket Booking Office', category: 'service', icon: '🎫', location: 'Main Hall', status: 'open', rating: 3.8, timings: '06:00 – 22:00', distance: '80m', features: ['IRCTC Counter', 'Tatkal', 'Cancellation'], description: 'Official ticket booking, cancellation, and modifications.' },
  { id: 19, name: 'Free Wi-Fi Zone', category: 'service', icon: '📶', location: 'Entire Station', status: 'open', rating: 3.9, timings: '24 Hours', distance: '0m', features: ['RailWire', 'Free', '30min session'], description: 'Free RailWire Wi-Fi across the entire station.' },
  { id: 20, name: 'Water Vending Kiosk', category: 'service', icon: '💧', location: 'Platform 1, 3, 5', status: 'open', rating: 4.1, timings: '05:00 – 23:00', distance: '40m', features: ['₹5/Litre', 'RO Water', 'Bottles'], description: 'Purified RO water at ₹5 per litre. Bottle refill available.' },
]

const CATEGORIES = [
  { key: 'all', label: 'All Facilities', icon: '🏪' },
  { key: 'food', label: 'Food & Drink', icon: '🍽️' },
  { key: 'restroom', label: 'Restrooms', icon: '🚻' },
  { key: 'medical', label: 'Medical', icon: '💊' },
  { key: 'banking', label: 'ATM & Banking', icon: '💳' },
  { key: 'transport', label: 'Transport', icon: '🚌' },
  { key: 'rest', label: 'Rest Areas', icon: '🛋️' },
  { key: 'service', label: 'Services', icon: '🎫' },
]

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke={s <= Math.round(rating) ? '#f59e0b' : '#64748b'}
          strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="star-value">{rating}</span>
    </div>
  )
}

export default function FacilitiesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [selectedFacility, setSelectedFacility] = useState(null)

  const filtered = FACILITIES_DATA
    .filter(f => (activeCategory === 'all' || f.category === activeCategory) &&
      (f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.location.toLowerCase().includes(searchQuery.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'distance') return parseInt(a.distance) - parseInt(b.distance)
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <section className="facilities-page">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">🏪 Facilities Directory</div>
          <h1 className="section-title">
            All Station <span className="gradient-text">Facilities</span>
          </h1>
          <p className="section-subtitle">
            Find every facility inside the station with real-time status, ratings, and directions.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="fac__toolbar">
          <div className="fac__search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search facilities, locations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <div className="fac__sort">
            <label>Sort by:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="fac__categories">
          {CATEGORIES.map(cat => {
            const count = cat.key === 'all' ? FACILITIES_DATA.length
              : FACILITIES_DATA.filter(f => f.category === cat.key).length
            return (
              <button
                key={cat.key}
                className={`fac__cat-btn ${activeCategory === cat.key ? 'fac__cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.icon} {cat.label}
                <span className="fac__cat-count">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Results Count */}
        <div className="fac__results-meta">
          <span>Showing <strong>{filtered.length}</strong> facilities</span>
          {activeCategory !== 'all' && (
            <button className="fac__clear" onClick={() => setActiveCategory('all')}>Clear filter</button>
          )}
        </div>

        {/* Grid */}
        <div className="fac__grid">
          {filtered.map((fac, i) => (
            <div
              key={fac.id}
              className={`fac__card glass-card ${fac.status === 'closed' ? 'fac__card--closed' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setSelectedFacility(selectedFacility?.id === fac.id ? null : fac)}
            >
              <div className="fac__card-top">
                <div className="fac__icon">{fac.icon}</div>
                <span className={`badge ${fac.status === 'open' ? 'badge-green' : 'badge-red'}`}>
                  {fac.status === 'open' ? '● Open' : '● Closed'}
                </span>
              </div>
              <h3 className="fac__name">{fac.name}</h3>
              <p className="fac__location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {fac.location}
              </p>
              <p className="fac__desc">{fac.description}</p>

              <div className="fac__meta">
                <StarRating rating={fac.rating} />
                <span className="fac__distance">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/>
                  </svg>
                  {fac.distance}
                </span>
              </div>

              <div className="fac__timing">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {fac.timings}
              </div>

              <div className="fac__features">
                {fac.features.map((feat, fi) => (
                  <span key={fi} className="badge badge-blue">{feat}</span>
                ))}
              </div>

              {selectedFacility?.id === fac.id && (
                <div className="fac__expanded animate-fade-in">
                  <div className="fac__actions">
                    <button className="btn-primary" style={{ fontSize: 13, padding: '10px 18px' }}>
                      🧭 Get Directions
                    </button>
                    <button className="btn-outline" style={{ fontSize: 13, padding: '10px 18px' }}>
                      📍 Show on Map
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="fac__empty">
            <span style={{ fontSize: 48 }}>🔍</span>
            <h3>No facilities found</h3>
            <p>Try a different search term or category.</p>
            <button className="btn-outline" onClick={() => { setSearchQuery(''); setActiveCategory('all') }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
