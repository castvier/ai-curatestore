import React from 'react';
import '../styles/styles.css';

const ContentGenerator = ({ prompt, setPrompt, tone, setTone, length, setLength, audience, setAudience }) => {
  const toneOptions = ['Neutral', 'Formal', 'Informal', 'Persuasive', 'Enthusiastic'];
  const lengthOptions = ['Short', 'Medium', 'Long'];
  const audienceOptions = ['General', 'Technical', 'Business', 'Creative'];

  const handleToneChange = (e) => setTone(e.target.value);
  const handleLengthChange = (e) => setLength(e.target.value);
  const handleAudienceChange = (e) => setAudience(e.target.value);

  return (
    <div className="component">
      <div className="customization-options">
        <div className="customization-feature">
          <label htmlFor="tone">Tone:</label>
          <select id="tone" value={tone} onChange={handleToneChange} className="customization-select">
            {toneOptions.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>
        <div className="customization-feature">
          <label htmlFor="length">Length:</label>
          <select id="length" value={length} onChange={handleLengthChange} className="customization-select">
            {lengthOptions.map((length) => (
              <option key={length} value={length}>
                {length}
              </option>
            ))}
          </select>
        </div>
        <div className="customization-feature">
          <label htmlFor="audience">Audience:</label>
          <select id="audience" value={audience} onChange={handleAudienceChange} className="customization-select">
            {audienceOptions.map((audience) => (
              <option key={audience} value={audience}>
                {audience}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;