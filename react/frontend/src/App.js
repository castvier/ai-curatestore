import React from 'react';
import ContentGenerator from './components/ContentGenerator';
import CodeGenerator from './components/CodeGenerator';
import EducationalContentGenerator from './components/EducationalContentGenerator';

const App = () => {
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