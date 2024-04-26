import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { generateContent } from './api/contentApi';
import { generateCode } from './api/codeApi';
import { generateEducationalContent } from './api/educationalContentApi';
import ContentGenerator from './components/ContentGenerator';
import CodeGenerator from './components/CodeGenerator';
import EducationalContentGenerator from './components/EducationalContentGenerator';
import './App.css';

const App = () => {
  const [activeModule, setActiveModule] = useState('content');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedEducationalContent, setGeneratedEducationalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tone, setTone] = useState('Neutral');
  const [length, setLength] = useState('Medium');
  const [audience, setAudience] = useState('General');
  const [difficulty, setDifficulty] = useState('Easy');
  const [subject, setSubject] = useState('General');
  const [format, setFormat] = useState('Article');

  const handleModuleClick = (module) => {
    setActiveModule(module);
    setGeneratedContent('');
    setGeneratedCode('');
    setGeneratedEducationalContent('');
    setError(null);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

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

  const handleCodeGeneration = async () => {
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

  const handleEducationalContentGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for educational content generation.');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const generatedContent = await generateEducationalContent(prompt, difficulty, subject, format);
      setGeneratedEducationalContent(generatedContent.generated_educational_content);
    } catch (error) {
      console.error('Error generating educational content:', error);
      setError('Failed to generate educational content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneration = () => {
    if (activeModule === 'content') {
      handleContentGeneration();
    } else if (activeModule === 'code') {
      handleCodeGeneration();
    } else if (activeModule === 'educational') {
      handleEducationalContentGeneration();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI CurateStore</h1>
      </header>
      <div className="modules-container">
        <section className={`module-compartment ${activeModule === 'content' ? 'active' : ''}`}>
          <h2 onClick={() => handleModuleClick('content')}>Content Generation</h2>
          {activeModule === 'content' && (
            <div className="customization-container">
              <ContentGenerator
                prompt={prompt}
                setPrompt={setPrompt}
                tone={tone}
                setTone={setTone}
                length={length}
                setLength={setLength}
                audience={audience}
                setAudience={setAudience}
              />
            </div>
          )}
        </section>
        <section className={`module-compartment ${activeModule === 'code' ? 'active' : ''}`}>
          <h2 onClick={() => handleModuleClick('code')}>Code Generation</h2>
          {activeModule === 'code' && (
            <div className="customization-container">
              <CodeGenerator prompt={prompt} setPrompt={setPrompt} />
            </div>
          )}
        </section>
        <section className={`module-compartment ${activeModule === 'educational' ? 'active' : ''}`}>
          <h2 onClick={() => handleModuleClick('educational')}>Educational Content Generation</h2>
          {activeModule === 'educational' && (
            <div className="customization-container">
              <EducationalContentGenerator
                prompt={prompt}
                setPrompt={setPrompt}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                subject={subject}
                setSubject={setSubject}
                format={format}
                setFormat={setFormat}
              />
            </div>
          )}
        </section>
      </div>
      <main>
        <div className="prompt-container">
          <textarea
            className="prompt-input"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt here..."
          />
          <button className="generate-button" onClick={handleGeneration} disabled={isLoading}>
            {isLoading ? 'Generating...' : <FaArrowRight />}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {generatedContent && (
          <div className="output-container">
            <h3>Generated Content:</h3>
            <p>{generatedContent}</p>
          </div>
        )}
        {generatedCode && (
          <div className="output-container code-output">
            <h3>Generated Code:</h3>
            <pre>{generatedCode}</pre>
          </div>
        )}
        {generatedEducationalContent && (
          <div className="output-container">
            <h3>Generated Educational Content:</h3>
            <p>{generatedEducationalContent}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;