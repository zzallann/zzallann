import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logo from './components/Logo';
import ForgotPassword from './components/ForgotPassword';
import FeedbackPage from './components/FeedbackPage'; // Import the new component
import { authService } from './services/authService';
import type { User } from './types';
import { NotificationProvider } from './contexts/NotificationContext';


type AuthView = 'login' | 'register' | 'forgotPassword' | 'feedback'; // Add 'feedback' view

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authView, setAuthView] = useState<AuthView>('login');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleRegisterSuccess = (registeredUser: User) => {
    setUser(registeredUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setAuthView('login'); // Go back to login screen on logout
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-slate-900">
        <p className="text-[var(--text-primary)] text-xl">Betöltés...</p>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <main className="w-screen min-h-screen font-sans">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />
        ) : (
          <div className="min-h-screen flex flex-col justify-center items-center p-4 relative">
            <div className="mb-8">
              <Logo />
            </div>
            {authView === 'login' && (
              <Login
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={() => setAuthView('register')}
                onForgotPassword={() => setAuthView('forgotPassword')}
              />
            )}
            {authView === 'register' && (
              <Register
                onRegisterSuccess={handleRegisterSuccess}
                onSwitchToLogin={() => setAuthView('login')}
              />
            )}
            {authView === 'forgotPassword' && (
                <ForgotPassword onBackToLogin={() => setAuthView('login')} />
            )}
            {authView === 'feedback' && (
              <FeedbackPage onBackToLogin={() => setAuthView('login')} />
            )}
            <button onClick={() => setAuthView('feedback')} className="absolute bottom-4 text-xs text-white/30 hover:underline transition-colors">
                Béta verzió - visszajelzés
            </button>
          </div>
        )}
      </main>
    </NotificationProvider>
  );
};

export default App;