import React, { useState } from 'react';
import { generateEducationalContent } from '../api/educationalContentApi';
import '../styles/styles.css'; // Updated path to match your directory structure

const EducationalContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for educational content generation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateEducationalContent(prompt);
      setGeneratedContent(generatedContent);
    } catch (error) {
      console.error('Error generating educational content:', error);
      setError('Failed to generate educational content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="component">
      <h3>Educational Content Generator</h3>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt for educational content..."
        />
        <button onClick={handleContentGeneration} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Educational Content'}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {generatedContent && (
        <div>
          <h4>Generated Educational Content:</h4>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
};

export default EducationalContentGenerator;