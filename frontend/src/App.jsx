import { useEffect, useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    zodiacSign: '', profession: '', goal: '',
    dob: '', weight: '', placeOfBirth: ''
  });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/recommendations');
      if (response.ok) {
        const data = await response.json();
        setHistory(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Server status: ${response.status}`);

      const data = await response.json();
      setResult(data);
      setHistory((prevHistory) => [data, ...prevHistory]);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Could not reach backend server. Please confirm it is running on port 5001.");
    }
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>GEMSTONE RECOMMENDATION</h1>
        <div style={goldDivider}></div>
        <p style={subtitleStyle}>Astrological Charting & Custom Ring Calculations</p>
      </header>

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} style={formCardStyle}>
        
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>I. Client Information</h3>
        </div>
        <div style={gridThreeStyle}>
          <input type="text" name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} required style={inputStyle} />
          <input type="tel" name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} required style={inputStyle} />
        </div>

        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>II. Birth & Physical Blueprints</h3>
        </div>
        <div style={gridThreeStyle}>
          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Place of Birth</label>
            <input type="text" name="placeOfBirth" value={formData.placeOfBirth} placeholder="City, Country" onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Body Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} placeholder="e.g. 70" onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>III. Alignment Parameters</h3>
        </div>
        <div style={gridThreeStyle}>
          <select name="zodiacSign" value={formData.zodiacSign} onChange={handleChange} required style={selectStyle}>
            <option value="">Select Zodiac Sign</option>
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
          </select>
          <select name="profession" value={formData.profession} onChange={handleChange} style={selectStyle}>
            <option value="">Select Profession</option>
            <option value="Business">Business / Entrepreneur</option>
            <option value="Software / Tech">Software / Tech</option>
            <option value="Arts / Creative">Arts / Creative</option>
            <option value="Medical">Medical / Healthcare</option>
          </select>
          <select name="goal" value={formData.goal} onChange={handleChange} style={selectStyle}>
            <option value="">Primary Goal</option>
            <option value="Wealth & Prosperity">Wealth & Prosperity</option>
            <option value="Health & Peace">Health & Peace</option>
            <option value="Career Growth">Career Growth</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Generate Recommendation
        </button>
      </form>

      {/* --- RUBY & GOLD PRESCRIPTION CARD --- */}
      {result && (
        <div style={certificateCardStyle}>
          <div style={certHeader}>
            <span style={certSeal}>✦ ✦ ✦</span>
            <h2 style={certTitle}>RECOMMENDED GEMSTONE</h2>
            <p style={certMeta}>Astrological Analysis For {result.name} — {result.zodiacSign} Sign</p>
          </div>
          
          <div style={certBody}>
            {result.recommendations && Array.isArray(result.recommendations) && result.recommendations.map((rec, i) => (
              <div key={i} style={gemRowBlockStyle}>
                <div style={gemTitleLine}>
                  <span style={gemNameText}>💎 {rec.gemstone}</span>
                  <span style={rubyBadge}>{rec.suggestedCarat || 'Calculated Carat'}</span>
                </div>
                <div style={gridTwoStyle}>
                  <p style={detailTextStyle}><strong>Finger to Wear:</strong> {rec.finger}</p>
                  <p style={detailTextStyle}><strong>Ideal Mounting Metal:</strong> {rec.metal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- HISTORICAL LOG --- */}
      <div style={archiveSectionStyle}>
        <h2 style={archiveTitleStyle}>Recommendation History</h2>
        <div style={archiveContainerStyle}>
          {Array.isArray(history) && history.map((item, index) => (
            <div key={item?._id || index} style={archiveCardStyle}>
              <div style={archiveHeaderStyle}>
                <span style={archiveUserText}>{item?.name || 'User Query'} ({item?.zodiacSign || 'N/A'})</span>
                <span style={archiveDateText}>{item?.date ? new Date(item.date).toLocaleDateString() : ''}</span>
              </div>
              <div style={archiveBodyText}>
                {Array.isArray(item?.recommendations) ? item.recommendations.map(r => r.gemstone).join(' • ') : 'Record Saved'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- CRAFTED LUXURY GEMOLOGY STYLES --- */
const containerStyle = {
  maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', color: '#f4f4f0', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh'
};
const headerStyle = {
  textAlign: 'center', marginBottom: '4.5rem'
};
const titleStyle = {
  fontSize: '2.2rem', letterSpacing: '0.15em', fontWeight: '400', color: '#dfcca5', margin: '0 0 1rem 0'
};
const goldDivider = {
  width: '60px', height: '1px', background: '#dfcca5', margin: '0 auto 1.25rem auto'
};
const subtitleStyle = {
  fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', color: '#a3b899', letterSpacing: '0.08em', textTransform: 'uppercase'
};
const formCardStyle = {
  background: '#0a1d17', padding: '3.5rem', borderRadius: '8px', border: '1px solid #1c3d32', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
};
const sectionHeaderStyle = {
  marginBottom: '1.5rem', borderBottom: '1px solid #19382e', paddingBottom: '0.4rem'
};
const sectionTitleStyle = {
  fontSize: '0.95rem', letterSpacing: '0.12em', fontWeight: '400', color: '#dfcca5', textTransform: 'uppercase', margin: 0
};
const gridThreeStyle = {
  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem'
};
const gridTwoStyle = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1fr'
};
const labelStyle = {
  display: 'block', color: '#7ba08d', fontSize: '0.75rem', fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem'
};
const inputStyle = {
  width: '100%', padding: '0.85rem 1rem', background: '#05110e', border: '1px solid #1c3d32', borderRadius: '4px', color: '#f4f4f0', fontSize: '0.9rem', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box', outline: 'none'
};
const selectStyle = {
  ...inputStyle, cursor: 'pointer'
};
const buttonStyle = {
  width: '100%', padding: '1.1rem', background: '#dfcca5', color: '#0a1d17', border: 'none', borderRadius: '4px', fontFamily: 'system-ui, sans-serif', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.9rem', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(223,204,165,0.15)'
};
const certificateCardStyle = {
  marginTop: '4rem', background: '#05110e', borderRadius: '6px', border: '2px solid #dfcca5', padding: '3rem', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
};
const certHeader = {
  textAlign: 'center', borderBottom: '1px solid #22372f', paddingBottom: '1.75rem', marginBottom: '2rem'
};
const certSeal = {
  color: '#dfcca5', display: 'block', letterSpacing: '0.4em', fontSize: '0.8rem', marginBottom: '0.5rem'
};
const certTitle = {
  fontSize: '1.75rem', fontWeight: '300', letterSpacing: '0.15em', color: '#dfcca5', margin: '0 0 0.5rem 0'
};
const certMeta = {
  fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', color: '#97b3a4', margin: 0, letterSpacing: '0.02em'
};
const certBody = {
  display: 'flex', flexDirection: 'column', gap: '1.5rem'
};
const gemRowBlockStyle = {
  background: '#091c16', padding: '1.5rem 2rem', border: '1px solid #163128', borderRadius: '4px'
};
const gemTitleLine = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #163128', paddingBottom: '0.6rem'
};
const gemNameText = {
  fontSize: '1.3rem', color: '#fff', letterSpacing: '0.04em', fontWeight: '500'
};
const rubyBadge = {
  fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 'bold', background: '#7a1c27', color: '#fdd', border: '1px solid #aa3341', padding: '0.35rem 0.75rem', borderRadius: '3px', letterSpacing: '0.05em'
};
const detailTextStyle = {
  margin: 0, fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', color: '#d2e3d8', letterSpacing: '0.02em'
};
const archiveSectionStyle = {
  marginTop: '6rem'
};
const archiveTitleStyle = {
  fontSize: '1.05rem', letterSpacing: '0.2em', fontWeight: '400', color: '#a3b899', textTransform: 'uppercase', marginBottom: '1.75rem', borderBottom: '1px solid #19382e', paddingBottom: '0.5rem'
};
const archiveContainerStyle = {
  display: 'flex', flexDirection: 'column', gap: '1.25rem'
};
const archiveCardStyle = {
  background: '#0a1d17', padding: '1.5rem 1.75rem', borderRadius: '4px', border: '1px solid #173329'
};
const archiveHeaderStyle = {
  display: 'flex', justifyContent: 'space-between', color: '#7ba08d', fontSize: '0.8rem', fontFamily: 'system-ui, sans-serif', marginBottom: '0.6rem', letterSpacing: '0.02em'
};
const archiveUserText = {
  fontWeight: '500', color: '#dfcca5'
};
const archiveDateText = {
  color: '#557564'
};
const archiveBodyText = {
  fontSize: '0.95rem', color: '#d2e3d8', fontStyle: 'italic'
};