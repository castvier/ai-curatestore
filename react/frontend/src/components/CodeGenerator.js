// CodeGenerator.js
import React, { useState } from 'react';
import { generateCode } from '../api/codeApi';
import './CodeGenerator.css';


const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleCodeGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const code = await generateCode(prompt);
      setGeneratedCode(code);
    } catch (error) {
      setError('Failed to generate code. Please try again later.');
      console.error('Code generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Code Generator</h3>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt here..."
      />
      <button onClick={handleCodeGeneration} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Code'}
      </button>
      {error && <p className="error">{error}</p>}
      {generatedCode && (
        <div>
          <h4>Generated Code:</h4>
          <pre>{generatedCode}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
