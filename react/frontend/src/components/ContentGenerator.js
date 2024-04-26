import React, { useState } from 'react';
import { generateContent } from '../api/contentApi';
import '../styles/styles.css';

const ContentGenerator = ({ prompt }) => {
  const [tone, setTone] = useState('Neutral');
  const [length, setLength] = useState('Medium');
  const [audience, setAudience] = useState('General');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toneOptions = ['Neutral', 'Formal', 'Informal', 'Persuasive', 'Enthusiastic'];
  const lengthOptions = ['Short', 'Medium', 'Long'];
  const audienceOptions = ['General', 'Technical', 'Business', 'Creative'];

  const handleToneChange = (e) => setTone(e.target.value);
  const handleLengthChange = (e) => setLength(e.target.value);
  const handleAudienceChange = (e) => setAudience(e.target.value);

  const handleContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for content generation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateContent(prompt, tone, length, audience);
      setGeneratedContent(generatedContent.generated_content);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="component">
      <div>
        <label htmlFor="tone">Tone:</label>
        <select id="tone" value={tone} onChange={handleToneChange}>
          {toneOptions.map((tone) => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>

        <label htmlFor="length">Length:</label>
        <select id="length" value={length} onChange={handleLengthChange}>
          {lengthOptions.map((length) => (
            <option key={length} value={length}>{length}</option>
          ))}
        </select>

        <label htmlFor="audience">Audience:</label>
        <select id="audience" value={audience} onChange={handleAudienceChange}>
          {audienceOptions.map((audience) => (
            <option key={audience} value={audience}>{audience}</option>
          ))}
        </select>

        <button onClick={handleContentGeneration} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {generatedContent && (
        <div>
          <h3>Generated Content:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;