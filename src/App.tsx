import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import { useFavicon } from './hooks/useFavicon';
import { authFetch } from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load favicon from site config
  useFavicon();

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await authFetch('/admin-auth/me');

        if (!response.ok) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          if (isMounted) {
            setIsAuthenticated(false);
          }
          return;
        }

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (_) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    validateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsAuthenticated(false);
    };

    window.addEventListener('admin:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('admin:unauthorized', handleUnauthorized);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
