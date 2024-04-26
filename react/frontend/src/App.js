import React, { useState }, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { generateContent } from './api/contentApi';
import { generateCode } from './api/codeApi';
import { generateEducationalContent } from './api/educationalContentApi';
import ContentGenerator from './components/ContentGenerator';
import CodeGenerator from './components/CodeGenerator';
import EducationalContentGenerator from './components/EducationalContentGenerator';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>AI CurateStore</h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <SignupForm />
      </div>
    );
  }

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
      setError('Please enter a prompt for code generation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedCode = await generateCode(prompt);
      setGeneratedCode(generatedCode.generated_code);
    } catch (error) {
      console.error('Error generating code:', error);
      setError('Failed to generate code. Please try again.');
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

  const handleCodeCopy = () => {
    const codeElement = document.querySelector('.code-box .language-python');
    const code = codeElement.innerText;
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div>
      <h1>AI CurateStore</h1>
      <section>
        <h2>Content Generation</h2>
        <ContentGenerator />
      </section>
      <section>
        <h2>Code Generation</h2>
        <CodeGenerator />
      </section>
      <section>
        <h2>Educational Content Generation</h2>
        <EducationalContentGenerator />
      </section>
    </div>
  );
};

export default App;
