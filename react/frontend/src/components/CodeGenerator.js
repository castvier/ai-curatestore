import React, { useState } from 'react';
import { generateCode } from '../api/codeApi';
import './CodeGenerator.css';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleCodeGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const response = await generateCode(prompt);
      setGeneratedCode(response.generated_code);
    } catch (error) {
      console.error('Code generation error:', error);
      setError('Failed to generate code. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <h3 className="generator-title">Code Generator</h3>
      <textarea
        className="generator-input"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt here..."
      />
      <button
        className="generator-button"
        onClick={handleCodeGeneration}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Code'}
      </button>
      {error && <p className="error">{error}</p>}
      {generatedCode && (
        <pre className="generator-output">{generatedCode}</pre>
      )}
    </div>
  );
};

export default CodeGenerator;