import { useState, useEffect } from 'react';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('akkum_user');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData && userData.firstName) {
          setUser(userData);
        } else {
          localStorage.removeItem('akkum_user');
        }
      } catch (e) {
        localStorage.removeItem('akkum_user');
      }
    }
    
    setTimeout(() => setIsLoading(false), 1000);
  }, []);



  const handleTelegramAuth = async (authData: any) => {
    vibrate(50);
    
    const userData: User = {
      id: authData.id,
      firstName: authData.first_name,
      lastName: '',
      phone: authData.phone_number,
      cashback: authData.cashback || 0,
      role: authData.role || 'user'
    };
    
    localStorage.setItem('akkum_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    vibrate([30, 50]);
    localStorage.removeItem('akkum_user');
    setUser(null);
  };

  return {
    user,
    isLoading,
    handleTelegramAuth,
    handleLogout,
    vibrate
  };
};