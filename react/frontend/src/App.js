import React, { useState } from 'react';
import ContentGenerator from './components/ContentGenerator';
import CodeGenerator from './components/CodeGenerator';
import EducationalContentGenerator from './components/EducationalContentGenerator';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

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

  return (
    <div>
      <h1>AI CurateStore</h1>
      <button onClick={handleLogout}>Logout</button>
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