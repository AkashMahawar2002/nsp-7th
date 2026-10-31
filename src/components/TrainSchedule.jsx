import { useState, useEffect } from 'react'
import './TrainSchedule.css'

const TRAINS = [
  { no: '12301', name: 'Howrah Rajdhani Express', from: 'New Delhi', to: 'Howrah', platform: '3', departure: '16:55', arrival: '09:45+1', status: 'On Time', type: 'Rajdhani', delay: 0, coach: 'AC 1A/2A/3A' },
  { no: '12951', name: 'Mumbai Rajdhani Express', from: 'New Delhi', to: 'Mumbai Central', platform: '1', departure: '17:00', arrival: '08:35+1', status: 'On Time', type: 'Rajdhani', delay: 0, coach: 'AC 1A/2A/3A' },
  { no: '12309', name: 'Patna Rajdhani Express', from: 'New Delhi', to: 'Patna', platform: '2', departure: '18:10', arrival: '06:30+1', status: 'Delayed', type: 'Rajdhani', delay: 25, coach: 'AC 2A/3A' },
  { no: '12259', name: 'Duronto Express', from: 'New Delhi', to: 'Sealdah', platform: '4', departure: '19:40', arrival: '13:05+1', status: 'On Time', type: 'Duronto', delay: 0, coach: 'AC 2A/3A/SL' },
  { no: '22691', name: 'Rajdhani Express', from: 'New Delhi', to: 'Bangalore', platform: '5', departure: '20:30', arrival: '07:00+2', status: 'On Time', type: 'Rajdhani', delay: 0, coach: 'AC 1A/2A/3A' },
  { no: '12004', name: 'Lucknow Shatabdi', from: 'New Delhi', to: 'Lucknow', platform: '2', departure: '06:10', arrival: '12:30', status: 'Arrived', type: 'Shatabdi', delay: 0, coach: 'AC CC/EC' },
  { no: '12016', name: 'Ajmer Shatabdi Express', from: 'New Delhi', to: 'Ajmer', platform: '6', departure: '06:05', arrival: '13:50', status: 'Departed', type: 'Shatabdi', delay: 0, coach: 'AC CC/EC' },
  { no: '12560', name: 'Shiv Ganga Express', from: 'New Delhi', to: 'Varanasi', platform: '3', departure: '21:25', arrival: '07:40+1', status: 'On Time', type: 'Express', delay: 0, coach: 'SL/3A/2A/1A' },
  { no: '14236', name: 'Berauni Express', from: 'New Delhi', to: 'Barauni', platform: '7', departure: '22:10', arrival: '17:40+1', status: 'Delayed', type: 'Express', delay: 45, coach: 'SL/3A/2A' },
  { no: '19322', name: 'Indore Express', from: 'New Delhi', to: 'Indore', platform: '8', departure: '23:15', arrival: '13:15+1', status: 'On Time', type: 'Express', delay: 0, coach: 'SL/3A/2A' },
]

const STATUS_COLORS = {
  'On Time': 'badge-green',
  'Delayed': 'badge-red',
  'Arrived': 'badge-blue',
  'Departed': 'badge-gold',
}
const TYPE_COLORS = {
  'Rajdhani': '#4f8ef7',
  'Shatabdi': '#7c3aed',
  'Duronto': '#f59e0b',
  'Express': '#10b981',
}

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="sched__clock">
      <div className="sched__clock-time">
        {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
      </div>
      <div className="sched__clock-date">
        {time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  )
}

export default function TrainSchedule() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('departure')
  const [selectedTrain, setSelectedTrain] = useState(null)

  const filtered = TRAINS
    .filter(t =>
      (filterStatus === 'all' || t.status.toLowerCase() === filterStatus) &&
      (filterType === 'all' || t.type.toLowerCase() === filterType) &&
      (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.no.includes(searchQuery) ||
        t.to.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'departure') return a.departure.localeCompare(b.departure)
      if (sortBy === 'platform') return parseInt(a.platform) - parseInt(b.platform)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <section className="schedule-page">
      <div className="container">
        {/* Header */}
        <div className="sched__header">
          <div>
            <div className="section-label">🚆 Live Schedule</div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>
              Train Schedule
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Live departure & arrival information for all platforms.
            </p>
          </div>
          <Clock />
        </div>

        {/* Info Banner */}
        <div className="sched__live-banner">
          <span className="sched__live-dot"/>
          <span>Live data updates every 60 seconds — </span>
          <strong>New Delhi Railway Station (NDLS)</strong>
        </div>

        {/* Platform Status */}
        <div className="sched__platforms">
          {[1,2,3,4,5,6,7,8].map(p => {
            const train = TRAINS.find(t => parseInt(t.platform) === p)
            return (
              <div key={p} className={`sched__platform ${train?.delay > 0 ? 'sched__platform--delayed' : 'sched__platform--ok'}`}>
                <div className="sched__platform-num">Pf {p}</div>
                <div className="sched__platform-train">{train ? train.name.split(' ')[0] : '—'}</div>
                <div className="sched__platform-status">
                  {train?.delay > 0 ? `+${train.delay}m` : '✓'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="sched__toolbar">
          <div className="sched__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search train name, number, or destination..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sched__filters-right">
            <select className="sched__select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="on time">On Time</option>
              <option value="delayed">Delayed</option>
              <option value="arrived">Arrived</option>
              <option value="departed">Departed</option>
            </select>
            <select className="sched__select" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="rajdhani">Rajdhani</option>
              <option value="shatabdi">Shatabdi</option>
              <option value="duronto">Duronto</option>
              <option value="express">Express</option>
            </select>
            <select className="sched__select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="departure">Sort: Departure</option>
              <option value="platform">Sort: Platform</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="sched__table-wrap glass-card">
          <div className="sched__table-header">
            <span>Train</span>
            <span>From → To</span>
            <span>Platform</span>
            <span>Departure</span>
            <span>Arrival</span>
            <span>Status</span>
          </div>
          <div className="sched__table-body">
            {filtered.map((train, i) => (
              <div
                key={i}
                className={`sched__row ${selectedTrain?.no === train.no ? 'sched__row--selected' : ''}`}
                onClick={() => setSelectedTrain(selectedTrain?.no === train.no ? null : train)}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="sched__train-info">
                  <span
                    className="sched__train-type-dot"
                    style={{ background: TYPE_COLORS[train.type] || '#64748b' }}
                    title={train.type}
                  />
                  <div>
                    <div className="sched__train-name">{train.name}</div>
                    <div className="sched__train-no">#{train.no} · {train.coach}</div>
                  </div>
                </div>
                <div className="sched__route">
                  <span>{train.from}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <span>{train.to}</span>
                </div>
                <div className="sched__platform-badge">
                  <span className="sched__pf-num">Platform {train.platform}</span>
                </div>
                <div className="sched__time">{train.departure}</div>
                <div className="sched__time sched__time--arr">{train.arrival}</div>
                <div>
                  <span className={`badge ${STATUS_COLORS[train.status] || 'badge-blue'}`}>
                    {train.status}
                    {train.delay > 0 && ` (+${train.delay}m)`}
                  </span>
                </div>

                {/* Expanded Row */}
                {selectedTrain?.no === train.no && (
                  <div className="sched__expanded animate-fade-in">
                    <div className="sched__expanded-actions">
                      <button className="btn-primary" style={{ fontSize: 13, padding: '9px 18px' }}>
                        🧭 Navigate to Platform {train.platform}
                      </button>
                      <button className="btn-outline" style={{ fontSize: 13, padding: '9px 18px' }}>
                        📋 Check PNR Status
                      </button>
                      <button className="btn-outline" style={{ fontSize: 13, padding: '9px 18px' }}>
                        🔔 Set Alert
                      </button>
                    </div>
                    <div className="sched__train-tags">
                      <span className="badge badge-blue">{train.type}</span>
                      <span className="badge badge-blue">{train.coach}</span>
                      {train.delay > 0 && <span className="badge badge-red">Delayed by {train.delay} min</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="sched__empty">
              <span style={{ fontSize: 36 }}>🔍</span>
              <p>No trains found matching your search.</p>
            </div>
          )}
        </div>

        <p className="sched__disclaimer">
          * Schedule information is indicative. Please check official IRCTC / NTES for latest updates.
        </p>
      </div>
    </section>
  )
}
