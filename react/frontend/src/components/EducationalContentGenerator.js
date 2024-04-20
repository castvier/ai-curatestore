import React, { useState } from 'react';
import { generateEducationalContent } from '../api/educationalContentApi';
import '../styles/styles.css';

const difficultyLevels = ['Easy', 'Medium', 'Hard'];

const EducationalContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [difficulty, setDifficulty] = useState(difficultyLevels[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  const handleContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for educational content generation.');
      return;
    }

    // Check if the prompt is related to educational content generation
    const isRelatedToEducationalContentGeneration = !/code|program|algorithm|function|class|method/i.test(prompt);
    if (!isRelatedToEducationalContentGeneration) {
      setError('The prompt should be related to educational content generation, not code. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateEducationalContent(prompt, difficulty);
      setGeneratedContent(generatedContent.generated_educational_content);
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
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          {difficultyLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
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