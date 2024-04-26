import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginSignup from './components/LoginSignup';
import AICurateStore from './components/AICurateStore';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route path="/ai-curate-store" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const LoginRoute = () => {
  const { isLoggedIn, login } = useAuth();
  return isLoggedIn ? <Navigate to="/ai-curate-store" replace /> : <LoginSignup onLogin={login} />;
};

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AICurateStore /> : <Navigate to="/" replace />;
};

export default App;