import React, { useState } from 'react';

function LoginSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Example POST request to the backend
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Redirect or handle login success
        console.log('Logged in successfully');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div id="loginSignupContent">
        <h1>Welcome Back Curator</h1>
        {error && <p className="error-message">{error}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        <div
          style={{
            background: '#06066f',
            padding: '20px',
            marginTop: '20px',
            borderRadius: '8px',
            maxWidth: '400px',
            marginLeft: '20px',
          }}
        >
          <h2 style={{ color: '#999' }}>Signup (Unavailable for beta phase)</h2>
          <p style={{ color: '#999' }}>Signup functionality is currently unavailable during the beta phase.</p>
          {/* Disabled form for signup */}
        </div>
      </div>
      <div id="landingContent">
        <h2>Introducing AI CurateStore</h2>
        <p>
          A new platform that aims to transform the way AI, particularly GPT technology models, is utilized across various
          domains. The platform is designed with content creators, developers, and educators in mind, offering specialized
          modules for easier access to AI-driven solutions.
        </p>
        <p>
          AI CurateStore focuses on simplifying AI usage while prioritizing security, usability, and educational value. The
          team behind the platform has set a one-month development timeline to bring this innovative solution to market.
        </p>
        <p>
          The platform has the potential to streamline the integration of AI into various projects and workflows, making it
          an interesting development in the rapidly evolving AI landscape.
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;