import React, { useState } from 'react';
import { generateContent } from '../api/contentApi';
import '../styles.css'; // Import the styles

const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for content generation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateContent(prompt);
      setGeneratedContent(generatedContent);
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