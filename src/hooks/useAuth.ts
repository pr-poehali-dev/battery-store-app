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
        if (userData && userData.telegram_id && userData.firstName) {
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



  const handleTelegramAuth = async (telegramUser: any) => {
    vibrate(50);
    
    try {
      const response = await fetch('https://functions.poehali.dev/6f7f04e5-3e3c-4d6c-a7cf-4fcc1a7da0e8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramUser)
      });

      const data = await response.json();

      if (data.success && data.user) {
        const userData: User = {
          telegram_id: data.user.id.toString(),
          firstName: data.user.first_name,
          lastName: data.user.last_name || '',
          username: data.user.username || '',
          photo_url: data.user.photo_url || '',
          cashback: 0
        };
        
        localStorage.setItem('akkum_user', JSON.stringify(userData));
        setUser(userData);
      } else {
        alert('Ошибка авторизации через Telegram');
      }
    } catch (error) {
      console.error('Telegram auth error:', error);
      alert('Ошибка авторизации через Telegram. Проверьте настройки бота.');
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