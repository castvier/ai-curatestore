import React, { useState } from 'react';
import { generateCode } from '../api/codeApi';
import './CodeGenerator.css';

const CodeGenerator = ({ prompt }) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCodeGeneration = async () => {
    if (!prompt) {
      setError('Please enter a prompt for code generation.');
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