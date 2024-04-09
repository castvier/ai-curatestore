import React, { useState } from 'react';
import { generateContent } from '../api/contentApi';

const ContentGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleContentGeneration = async () => {
    const prompt = 'Write a brief article about sustainable living.';
    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateContent(prompt);
      console.log('Generated Content:', generatedContent);
      setGeneratedContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Content Generator</h2>
      <button onClick={handleContentGeneration} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
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