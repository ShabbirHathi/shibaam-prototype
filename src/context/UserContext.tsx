import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getUserById } from '@/data/users';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  userId: number | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUserId = localStorage.getItem('userId');
    const storedIsLoggedIn = localStorage.getItem('isUserLoggedIn');
    
    if (storedIsLoggedIn === 'true' && storedUserId) {
      const foundUser = getUserById(parseInt(storedUserId));
      if (foundUser) {
        setUser(foundUser);
        setIsLoggedIn(true);
        setUserId(foundUser.id);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setUserId(userData.id);
    localStorage.setItem('isUserLoggedIn', 'true');
    localStorage.setItem('userId', userData.id.toString());
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
