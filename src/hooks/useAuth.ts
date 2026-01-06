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
    
    try {
      const response = await fetch('https://functions.poehali.dev/cecdecab-000b-4d65-9160-6e06bc91079f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authData.first_name || authData.name,
          phone: authData.phone_number || authData.phone
        })
      });

      const data = await response.json();

      if (data.success && data.customer) {
        const userData: User = {
          id: data.customer.id,
          firstName: data.customer.name,
          lastName: '',
          phone: data.customer.phone,
          cashback: data.customer.cashback
        };
        
        localStorage.setItem('akkum_user', JSON.stringify(userData));
        setUser(userData);
      } else {
        alert('Ошибка авторизации');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Ошибка авторизации. Попробуйте снова.');
    }
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