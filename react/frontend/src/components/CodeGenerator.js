import React, { useState } from 'react';
import { generateCode } from '../api/codeApi';
import './CodeGenerator.css';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState(''); // State to hold the user input
  const [generatedCode, setGeneratedCode] = useState(''); // State to hold the generated code
  const [isLoading, setIsLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(''); // State to handle any errors

  // Function to update state with user input
  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  // Function to handle the code generation process
  const handleCodeGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt.'); // Validate input
      return;
    }
    setIsLoading(true); // Set loading state
    setError(''); // Clear any previous errors
    try {
      const code = await generateCode(prompt);
      setGeneratedCode(code); // Set the generated code
    } catch (error) {
      setError('Failed to generate code. Please try again later.'); // Handle errors
      console.error('Code generation error:', error);
    } finally {
      setIsLoading(false); // Reset loading state
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
