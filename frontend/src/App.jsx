import { useState } from 'react';
import './App.css';

function App() {
  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [weight, setWeight] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [profession, setProfession] = useState('');
  const [intention, setIntention] = useState('');

  // UI status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, dob, birthPlace, weight, zodiac, profession, intention }),
      });

      if (!response.ok) {
        throw new Error('Could not reach backend server. Confirm port 5001 is running.');
      }

      const data = await response.json();
      setResult(data);
      setHistory(prev => [{ name, zodiac, gemstone: data.gemstone, timestamp: new Date().toLocaleTimeString() }, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="luxury-app-wrapper">
      
      {/* Premium Header with Full Animated Vector Crest Logo */}
      <header className="mystic-header">
        <div className="title-left">ASTRO-GEM</div>
        
        <div className="logo-center-emblem">
          <svg viewBox="0 0 100 100" className="crest-svg">
            {/* Background Magic Glow Ring */}
            <circle cx="50" cy="50" r="45" stroke="#c5a880" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="41" stroke="#c5a880" strokeWidth="1.5" fill="none" />
            
            {/* Twinkling Stars */}
            <path d="M50,15 L51,18 L54,19 L51,20 L50,23 L49,20 L46,19 L49,18 Z" fill="#c5a880" opacity="0.8" />
            <circle cx="28" cy="35" r="1" fill="#fff" opacity="0.5" />
            <circle cx="72" cy="35" r="1" fill="#fff" opacity="0.5" />
            
            {/* The Celestial Crescent Moon */}
            <path d="M42,30 A12,12 0 1,0 58,46 A9,9 0 1,1 42,30 Z" fill="#c5a880" transform="rotate(-15 50 40)" />
            
            {/* Center Shined Emerald & Ruby Crystal Geometries */}
            {/* Left Diamond */}
            <polygon points="32,65 42,52 45,65 38,75" fill="#10b981" opacity="0.7" stroke="#042f22" strokeWidth="0.5" />
            {/* Center Diamond */}
            <polygon points="42,52 58,52 55,68 45,68" fill="#e11d48" opacity="0.85" stroke="#3f0712" strokeWidth="0.5" />
            <polygon points="50,45 42,52 58,52" fill="#f43f5e" opacity="0.9" />
            {/* Right Diamond */}
            <polygon points="58,52 68,65 62,75 55,65" fill="#2563eb" opacity="0.7" stroke="#1e3a8a" strokeWidth="0.5" />
            
            {/* Decorative Luxury Foliage Wings */}
            <path d="M20,78 Q35,78 45,68" stroke="#c5a880" strokeWidth="1" fill="none" />
            <path d="M80,78 Q65,78 55,68" stroke="#c5a880" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="title-right">GEMSTONE GUIDE</div>
      </header>

      <main className="mystic-container">
        <div className="gold-frame-card">
          <form onSubmit={handleSubmit} className="premium-form">
            
            {/* Section I */}
            <div className="form-section">
              <h3 className="section-title">I. CLIENT INFORMATION</h3>
              <div className="input-row-three">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g., jane@email.com" required />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., +1 234 567" required />
              </div>
            </div>

            {/* Section II */}
            <div className="form-section">
              <h3 className="section-title">II. BIRTH & PHYSICAL BLUEPRINTS</h3>
              <div className="input-row-three">
                <div className="field-container">
                  <label className="field-label">DATE OF BIRTH</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </div>
                <div className="field-container">
                  <label className="field-label">PLACE OF BIRTH</label>
                  <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, Country" required />
                </div>
                <div className="field-container">
                  <label className="field-label">BODY WEIGHT (KG)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" required />
                </div>
              </div>
            </div>

            {/* Section III */}
            <div className="form-section">
              <h3 className="section-title">III. ALIGNMENT PARAMETERS</h3>
              <div className="input-row-three">
                <select value={zodiac} onChange={(e) => setZodiac(e.target.value)} required>
                  <option value="">Select Zodiac Sign</option>
                  <option value="aries">Aries (Mesh)</option>
                  <option value="taurus">Taurus (Vrishabha)</option>
                  <option value="gemini">Gemini (Mithuna)</option>
                  <option value="cancer">Cancer (Karka)</option>
                  <option value="leo">Leo (Simha)</option>
                  <option value="virgo">Virgo (Kanya)</option>
                  <option value="libra">Libra (Tula)</option>
                  <option value="scorpio">Scorpio (Vrishchika)</option>
                  <option value="sagittarius">Sagittarius (Dhanu)</option>
                  <option value="capricorn">Capricorn (Makara)</option>
                  <option value="aquarius">Aquarius (Kumbha)</option>
                  <option value="pisces">Pisces (Meena)</option>
                </select>

                <select value={profession} onChange={(e) => setProfession(e.target.value)} required>
                  <option value="">Select Profession</option>
                  <option value="Software / Tech">Software / Tech</option>
                  <option value="Business / Trade">Business / Trade</option>
                  <option value="Arts / Creative">Arts / Creative</option>
                  <option value="Medical / Science">Medical / Science</option>
                </select>

                <select value={intention} onChange={(e) => setIntention(e.target.value)} required>
                  <option value="">Primary Goal</option>
                  <option value="Career Growth">Career Growth</option>
                  <option value="Wealth & Prosperity">Wealth & Prosperity</option>
                  <option value="Health & Healing">Health & Healing</option>
                  <option value="Mental Peace">Mental Peace</option>
                </select>
              </div>
            </div>

            {/* Luxury Action Button */}
            <button type="submit" className="luxury-submit-btn" disabled={loading}>
              {loading ? 'READING PLANETARY ALIGNMENTS...' : 'GENERATE RECOMMENDATION 💎'}
            </button>
          </form>
        </div>

        {/* Dynamic Display Result Panel */}
        {result && (
          <div className="gold-frame-card result-panel animated-fade-in">
            <h2 className="result-main-title">Cosmic Assessment Matrix</h2>
            <div className="luxury-badge">
              <span>Aura Catalyst Stone: <strong>{result.gemstone}</strong></span>
            </div>
            <div className="luxury-specs">
              <div className="spec-box">
                <span className="box-label">DIAGNOSED MASS</span>
                <span className="box-value">{result.ratti}</span>
              </div>
              <div className="spec-box">
                <span className="box-label">ELEMENTAL ANCHOR METAL</span>
                <span className="box-value">{result.metal}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* History Log Section */}
      <section className="premium-history-area">
        <h2 className="history-title-heading">RECOMMENDATION HISTORY</h2>
        <div className="history-grid-container">
          {history.length === 0 ? (
            <p className="no-history-msg">No past sessions evaluated in this session runtime loop.</p>
          ) : (
            history.map((h, i) => (
              <div className="history-pill" key={i}>
                <span className="pill-gem">✨</span>
                <div className="pill-details">
                  <h4>{h.gemstone}</h4>
                  <p>{h.name} • {h.zodiac.toUpperCase()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Error Alert Box Modal */}
      {error && (
        <div className="error-popup-backdrop">
          <div className="error-popup-box">
            <p className="err-txt">⚠️ {error}</p>
            <button className="close-popup-btn" onClick={() => setError(null)}>DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;