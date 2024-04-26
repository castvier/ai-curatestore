import React, { useState } from 'react';
import { generateEducationalContent } from '../api/educationalContentApi';
import '../styles/styles.css';

const EducationalContentGenerator = ({ prompt }) => {
  const [difficulty, setDifficulty] = useState('Easy');
  const [subject, setSubject] = useState('General');
  const [format, setFormat] = useState('Article');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const difficultyOptions = ['Easy', 'Intermediate', 'Advanced'];
  const subjectOptions = ['General', 'Mathematics', 'Science', 'History', 'Literature'];
  const formatOptions = ['Article', 'Lesson Plan', 'Quiz', 'Infographic'];

  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleFormatChange = (e) => setFormat(e.target.value);

  const handleContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for educational content generation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedContent = await generateEducationalContent(prompt, difficulty, subject, format);
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
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          {difficultyOptions.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <label htmlFor="subject">Subject:</label>
        <select id="subject" value={subject} onChange={handleSubjectChange}>
          {subjectOptions.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <label htmlFor="format">Format:</label>
        <select id="format" value={format} onChange={handleFormatChange}>
          {formatOptions.map(format => (
            <option key={format} value={format}>{format}</option>
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