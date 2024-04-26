import React, { useState } from 'react';
import ContentGenerator from './components/ContentGenerator';
import CodeGenerator from './components/CodeGenerator';
import EducationalContentGenerator from './components/EducationalContentGenerator';
import './App.css';

const App = () => {
  const [activeModule, setActiveModule] = useState('content');
  const [prompt, setPrompt] = useState('');

  const handleModuleClick = (module) => {
    setActiveModule(module);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI CurateStore</h1>
      </header>
      <main>
        <div className="modules-container">
          <section
            className={`module-compartment ${activeModule === 'content' ? 'active' : ''}`}
            onClick={() => handleModuleClick('content')}
          >
            <h2>Content Generation</h2>
          </section>
          <section
            className={`module-compartment ${activeModule === 'code' ? 'active' : ''}`}
            onClick={() => handleModuleClick('code')}
          >
            <h2>Code Generation</h2>
          </section>
          <section
            className={`module-compartment ${activeModule === 'educational' ? 'active' : ''}`}
            onClick={() => handleModuleClick('educational')}
          >
            <h2>Educational Content Generation</h2>
          </section>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-input"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt here..."
          />
          {activeModule === 'content' && <ContentGenerator prompt={prompt} />}
          {activeModule === 'code' && <CodeGenerator prompt={prompt} />}
          {activeModule === 'educational' && <EducationalContentGenerator prompt={prompt} />}
        </div>
      </main>
    </div>
  );
};

export default App;