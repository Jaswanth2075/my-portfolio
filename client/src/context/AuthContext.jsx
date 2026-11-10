import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('portfolio_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('portfolio_admin_token', token);
    } else {
      localStorage.removeItem('portfolio_admin_token');
    }
  }, [token]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('portfolio_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('portfolio_admin_user');
    }
  }, [adminUser]);

  const login = (authToken, user) => {
    setToken(authToken);
    setAdminUser(user);
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminUser,
        isAuthenticated: !!token,
        loading,
        setLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
