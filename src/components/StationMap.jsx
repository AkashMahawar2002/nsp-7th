import { useState } from 'react'
import './StationMap.css'

// Station facilities data with positions (%)
const FACILITIES = [
  { id: 1, name: 'Main Entrance', icon: '🚪', x: 50, y: 92, type: 'entrance', floor: 'Ground', description: 'Main entrance/exit gate with security check' },
  { id: 2, name: 'Platform 1', icon: '🚉', x: 20, y: 30, type: 'platform', floor: 'Ground', description: 'Local trains – Mumbai Suburban' },
  { id: 3, name: 'Platform 2', icon: '🚉', x: 35, y: 30, type: 'platform', floor: 'Ground', description: 'Express trains – North bound' },
  { id: 4, name: 'Platform 3', icon: '🚉', x: 50, y: 30, type: 'platform', floor: 'Ground', description: 'Rajdhani & Shatabdi Express' },
  { id: 5, name: 'Platform 4', icon: '🚉', x: 65, y: 30, type: 'platform', floor: 'Ground', description: 'Express trains – South bound' },
  { id: 6, name: 'Platform 5', icon: '🚉', x: 80, y: 30, type: 'platform', floor: 'Ground', description: 'Goods & Special trains' },
  { id: 7, name: 'Food Court', icon: '🍽️', x: 50, y: 55, type: 'food', floor: 'Ground', description: 'Multi-cuisine food court with 15+ outlets' },
  { id: 8, name: 'Restroom (M)', icon: '🚹', x: 25, y: 60, type: 'restroom', floor: 'Ground', description: 'Men\'s restroom – near platform 2' },
  { id: 9, name: 'Restroom (F)', icon: '🚺', x: 75, y: 60, type: 'restroom', floor: 'Ground', description: 'Women\'s restroom – near platform 4' },
  { id: 10, name: 'ATM', icon: '💳', x: 30, y: 75, type: 'banking', floor: 'Ground', description: 'SBI ATM – 24x7 service' },
  { id: 11, name: 'Medical Aid', icon: '💊', x: 70, y: 75, type: 'medical', floor: 'Ground', description: 'First aid station & pharmacy' },
  { id: 12, name: 'Booking Office', icon: '🎫', x: 50, y: 80, type: 'service', floor: 'Ground', description: 'Ticket booking & cancellation counter' },
  { id: 13, name: 'Waiting Hall', icon: '🛋️', x: 50, y: 45, type: 'rest', floor: 'Ground', description: 'Air-conditioned waiting area – 200 seats' },
  { id: 14, name: 'Cloakroom', icon: '🧳', x: 18, y: 50, type: 'service', floor: 'Ground', description: 'Luggage storage facility' },
  { id: 15, name: 'Bus Stand', icon: '🚌', x: 20, y: 92, type: 'transport', floor: 'Ground', description: 'City buses & MSRTC buses' },
  { id: 16, name: 'Auto Stand', icon: '🛺', x: 80, y: 92, type: 'transport', floor: 'Ground', description: 'Autos & prepaid taxis' },
  { id: 17, name: 'Parking', icon: '🅿️', x: 50, y: 12, type: 'parking', floor: 'Ground', description: 'Car & two-wheeler parking – 500 vehicles' },
  { id: 18, name: 'Retiring Room', icon: '🛏️', x: 82, y: 50, type: 'rest', floor: 'Floor 1', description: 'Book retiring rooms online or at counter' },
  { id: 19, name: 'Wi-Fi Zone', icon: '📶', x: 50, y: 68, type: 'service', floor: 'Ground', description: 'Free RailWire Wi-Fi zone' },
  { id: 20, name: 'Water Kiosk', icon: '💧', x: 40, y: 48, type: 'service', floor: 'Ground', description: 'Purified water – ₹5 per litre' },
]

const FACILITY_TYPES = [
  { key: 'all', label: 'All', icon: '🗺️' },
  { key: 'platform', label: 'Platforms', icon: '🚉' },
  { key: 'food', label: 'Food', icon: '🍽️' },
  { key: 'restroom', label: 'Restrooms', icon: '🚻' },
  { key: 'banking', label: 'ATM', icon: '💳' },
  { key: 'medical', label: 'Medical', icon: '💊' },
  { key: 'transport', label: 'Transport', icon: '🚌' },
  { key: 'rest', label: 'Rest', icon: '🛋️' },
  { key: 'service', label: 'Services', icon: '🎫' },
]

const TYPE_COLORS = {
  platform: '#4f8ef7',
  food: '#f59e0b',
  restroom: '#10b981',
  banking: '#a78bfa',
  medical: '#ef4444',
  transport: '#f97316',
  rest: '#06b6d4',
  service: '#84cc16',
  entrance: '#ffffff',
  parking: '#94a3b8',
}

export default function StationMap() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [zoom, setZoom] = useState(1)

  const filtered = FACILITIES.filter(f => activeFilter === 'all' || f.type === activeFilter)

  const handleMarkerClick = (facility) => {
    setSelectedFacility(facility)
  }

  const handleSetStart = (facility) => {
    setUserLocation(facility)
    setSelectedFacility(null)
  }

  const distanceTo = (facility) => {
    if (!userLocation) return null
    const dx = Math.abs(facility.x - userLocation.x)
    const dy = Math.abs(facility.y - userLocation.y)
    const raw = Math.sqrt(dx * dx + dy * dy)
    return Math.round(raw * 4) // ~meters estimate
  }

  return (
    <section className="station-map-page">
      <div className="container">
        {/* Header */}
        <div className="smap__header">
          <div>
            <div className="section-label">🗺️ Interactive Map</div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>
              Station Floor Plan
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Click any marker to see details. Set your location to get distances.
            </p>
          </div>
          <div className="smap__controls">
            <button className="smap__zoom-btn" onClick={() => setZoom(z => Math.min(z + 0.2, 2))}>＋</button>
            <button className="smap__zoom-btn" onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}>－</button>
            <button className="smap__zoom-btn" onClick={() => setZoom(1)} title="Reset zoom">⟳</button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="smap__filters">
          {FACILITY_TYPES.map(ft => (
            <button
              key={ft.key}
              className={`smap__filter-btn ${activeFilter === ft.key ? 'smap__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(ft.key)}
            >
              {ft.icon} {ft.label}
            </button>
          ))}
        </div>

        <div className="smap__layout">
          {/* Map Canvas */}
          <div className="smap__canvas-wrap">
            <div className="smap__canvas" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
              {/* Station Structure Drawing */}
              <svg className="smap__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Ground border */}
                <rect x="5" y="5" width="90" height="90" rx="3" fill="rgba(79,142,247,0.03)" stroke="rgba(79,142,247,0.15)" strokeWidth="0.3"/>
                {/* Platform tracks */}
                {[20, 35, 50, 65, 80].map((x, i) => (
                  <g key={i}>
                    <rect x={x - 4} y="20" width="8" height="18" rx="1" fill="rgba(79,142,247,0.08)" stroke="rgba(79,142,247,0.2)" strokeWidth="0.3"/>
                    <line x1={x} y1="20" x2={x} y2="38" stroke="rgba(79,142,247,0.4)" strokeWidth="0.15" strokeDasharray="1,1"/>
                  </g>
                ))}
                {/* Main hall */}
                <rect x="30" y="40" width="40" height="22" rx="2" fill="rgba(124,58,237,0.05)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3"/>
                {/* Entrance path */}
                <rect x="45" y="85" width="10" height="8" rx="1" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>
                <line x1="50" y1="62" x2="50" y2="85" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="2,2"/>
                {/* User Location */}
                {userLocation && (
                  <g>
                    <circle cx={userLocation.x} cy={userLocation.y} r="2.5" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="0.4"/>
                    <circle cx={userLocation.x} cy={userLocation.y} r="1" fill="#10b981"/>
                    <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="2s" repeatCount="indefinite"/>
                  </g>
                )}
              </svg>

              {/* Facility Markers */}
              {filtered.map(facility => {
                const color = TYPE_COLORS[facility.type] || '#94a3b8'
                const dist = distanceTo(facility)
                const isSelected = selectedFacility?.id === facility.id
                const isUserLoc = userLocation?.id === facility.id
                return (
                  <button
                    key={facility.id}
                    className={`smap__marker ${isSelected ? 'smap__marker--selected' : ''} ${isUserLoc ? 'smap__marker--user' : ''}`}
                    style={{ left: `${facility.x}%`, top: `${facility.y}%`, '--marker-color': color }}
                    onClick={() => handleMarkerClick(facility)}
                    title={facility.name}
                  >
                    <span className="smap__marker-icon">{facility.icon}</span>
                    <span className="smap__marker-label">{facility.name}</span>
                    {dist !== null && (
                      <span className="smap__marker-dist">{dist}m</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Map Legend */}
            <div className="smap__legend">
              {Object.entries(TYPE_COLORS).slice(0, 6).map(([type, color]) => (
                <div key={type} className="smap__legend-item">
                  <span className="smap__legend-dot" style={{ background: color }} />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="smap__sidebar">
            {selectedFacility ? (
              <div className="smap__detail glass-card animate-fade-in">
                <div className="smap__detail-icon">{selectedFacility.icon}</div>
                <h3 className="smap__detail-name">{selectedFacility.name}</h3>
                <p className="smap__detail-desc">{selectedFacility.description}</p>
                <div className="smap__detail-meta">
                  <span className="badge badge-blue">📍 {selectedFacility.floor}</span>
                  <span className="badge badge-green">✅ Open Now</span>
                </div>
                {distanceTo(selectedFacility) !== null && (
                  <div className="smap__detail-dist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/>
                    </svg>
                    ~{distanceTo(selectedFacility)}m from your location
                  </div>
                )}
                <div className="smap__detail-actions">
                  <button className="btn-primary" style={{ fontSize: 13, padding: '10px 16px' }}
                    onClick={() => handleSetStart(selectedFacility)}>
                    📍 Set as My Location
                  </button>
                  <button className="btn-outline" style={{ fontSize: 13, padding: '10px 16px' }}>
                    🧭 Get Directions
                  </button>
                </div>
              </div>
            ) : (
              <div className="smap__sidebar-empty glass-card">
                <div className="smap__empty-icon">🗺️</div>
                <h3>Select a Facility</h3>
                <p>Click any marker on the map to see facility details and get directions.</p>
                {userLocation && (
                  <div className="smap__user-loc">
                    <span>📍 Your Location:</span>
                    <strong>{userLocation.icon} {userLocation.name}</strong>
                  </div>
                )}
              </div>
            )}

            {/* Nearby List */}
            <div className="smap__nearby glass-card">
              <h4 className="smap__nearby-title">📋 All Facilities ({filtered.length})</h4>
              <div className="smap__nearby-list">
                {filtered.map(f => {
                  const dist = distanceTo(f)
                  return (
                    <button
                      key={f.id}
                      className={`smap__nearby-item ${selectedFacility?.id === f.id ? 'smap__nearby-item--active' : ''}`}
                      onClick={() => handleMarkerClick(f)}
                    >
                      <span className="smap__nearby-icon">{f.icon}</span>
                      <div className="smap__nearby-info">
                        <span className="smap__nearby-name">{f.name}</span>
                        <span className="smap__nearby-floor">{f.floor}</span>
                      </div>
                      {dist !== null && <span className="smap__nearby-dist">{dist}m</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
