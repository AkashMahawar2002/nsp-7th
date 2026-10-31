import './Footer.css'

const QUICK_LINKS = [
  { label: 'Station Map', page: 'map', icon: '🗺️' },
  { label: 'Facilities', page: 'facilities', icon: '🏪' },
  { label: 'Navigate', page: 'navigate', icon: '🧭' },
  { label: 'Schedule', page: 'schedule', icon: '🚆' },
]

const FACILITY_LINKS = [
  'Food Court', 'Restrooms', 'Medical Aid', 'ATM & Bank',
  'Retiring Room', 'Cloakroom', 'Wi-Fi Zone', 'Parking',
]

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#footerLogoGrad)"/>
              <path d="M7 10h14M7 14h14M10 18h8M9 10v8M19 10v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="20" r="1.5" fill="white"/>
              <circle cx="18" cy="20" r="1.5" fill="white"/>
              <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#4f8ef7"/>
                  <stop offset="1" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
            <div>
              <div className="footer__logo-name">RailNav</div>
              <div className="footer__logo-tag">Smart Station Navigator</div>
            </div>
          </div>
          <p className="footer__brand-desc">
            Enhancing navigation for railway station facilities and locations. Built for the modern traveller.
          </p>
          <div className="footer__project-badge">
            <span>🎓</span>
            <span>College Project – Non-Syllabus Initiative</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Navigation</h4>
          <ul className="footer__links">
            {QUICK_LINKS.map(link => (
              <li key={link.page}>
                <button className="footer__link" onClick={() => setActivePage(link.page)}>
                  {link.icon} {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Facilities */}
        <div className="footer__col">
          <h4 className="footer__col-title">Facilities</h4>
          <ul className="footer__links">
            {FACILITY_LINKS.map(link => (
              <li key={link}>
                <button className="footer__link" onClick={() => setActivePage('facilities')}>
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency */}
        <div className="footer__col">
          <h4 className="footer__col-title">Emergency & Help</h4>
          <div className="footer__emergency-cards">
            {[
              { icon: '🆘', label: 'Railway Helpline', number: '139' },
              { icon: '🚔', label: 'GRP / RPF', number: '182' },
              { icon: '🔥', label: 'Fire Emergency', number: '101' },
              { icon: '🏥', label: 'Medical Emergency', number: '108' },
            ].map((e, i) => (
              <div key={i} className="footer__emergency-card">
                <span>{e.icon}</span>
                <div>
                  <div className="footer__emg-label">{e.label}</div>
                  <div className="footer__emg-number">{e.number}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2024 RailNav. Built as a college project for <em>Enhancing Navigation for Railway Station Facilities.</em></p>
          <div className="footer__bottom-links">
            <span>Made with ❤️ using React.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
