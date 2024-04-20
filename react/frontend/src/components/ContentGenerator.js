import React, { useState } from 'react';
import { generateContent } from '../api/contentApi';
import '../styles/styles.css';

const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Neutral');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toneOptions = ['Neutral', 'Formal', 'Informal', 'Persuasive', 'Enthusiastic'];

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleToneChange = (e) => {
    setTone(e.target.value);
  };

  const handleContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for content generation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateContent(prompt, tone);
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
      <h2>Content Generator</h2>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt for content generation..."
        />
        <label htmlFor="tone">Tone:</label>
        <select id="tone" value={tone} onChange={handleToneChange}>
          {toneOptions.map((tone) => (
            <option key={tone} value={tone}>{tone}</option>
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