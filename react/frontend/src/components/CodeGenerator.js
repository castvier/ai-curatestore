import React, { useState } from 'react';
import { generateCode } from '../api/codeApi';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleCodeGeneration = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const generatedCode = await generateCode(prompt);
      setGeneratedCode(generatedCode);
    } catch (error) {
      console.error('Error generating code:', error);
      setError('Failed to generate code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>Code Generator</h3>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt for code generation..."
        />
        <button onClick={handleCodeGeneration} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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