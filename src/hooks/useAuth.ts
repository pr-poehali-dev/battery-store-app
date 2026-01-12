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
    const checkSession = async () => {
      // Проверяем Telegram-авторизацию из URL
      const urlParams = new URLSearchParams(window.location.search);
      const tgAuth = urlParams.get('tg_auth');
      
      if (tgAuth) {
        try {
          const response = await fetch('https://functions.poehali.dev/535b5887-9e3d-4a2f-ae82-4857f8223d49', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: tgAuth,
              first_name: 'Пользователь',
              auth_date: Math.floor(Date.now() / 1000),
              hash: 'auto_login'
            })
          });

          const data = await response.json();
          
          if (data.success && data.user) {
            const userData: User = {
              id: data.user.id,
              firstName: data.user.name,
              lastName: '',
              phone: data.user.phone || '',
              cashback: data.user.cashback || 0,
              role: data.user.role || 'client',
              totalSpent: 0,
              purchaseCount: 0
            };
            localStorage.setItem('akkum_user', JSON.stringify(userData));
            setUser(userData);
            setIsLoading(false);
            
            // Удаляем параметр из URL
            window.history.replaceState({}, '', window.location.pathname);
            return;
          }
        } catch (e) {
          console.error('Telegram auth error:', e);
        }
      }
      
      const sessionToken = localStorage.getItem('session_token');
      
      if (sessionToken) {
        try {
          const response = await fetch('https://functions.poehali.dev/cecdecab-000b-4d65-9160-6e06bc91079f', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'check_session',
              session_token: sessionToken
            })
          });

          const data = await response.json();

          if (data.success && data.user) {
            const userData: User = {
              id: data.user.id,
              firstName: data.user.name,
              lastName: '',
              phone: data.user.phone,
              cashback: data.user.cashback,
              role: data.user.role,
              totalSpent: data.user.totalSpent || 0,
              purchaseCount: data.user.purchaseCount || 0
            };
            setUser(userData);
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem('session_token');
          }
        } catch (e) {
          localStorage.removeItem('session_token');
        }
      }

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
    };

    checkSession();
  }, []);



  const handlePhoneAuth = async (authData: any) => {
    vibrate(50);
    
    const userData: User = {
      id: authData.id,
      firstName: authData.name,
      lastName: '',
      phone: authData.phone,
      cashback: authData.cashback || 0,
      role: authData.role || 'client',
      totalSpent: 0,
      purchaseCount: 0
    };
    
    localStorage.setItem('akkum_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    vibrate([30, 50]);
    localStorage.removeItem('akkum_user');
    localStorage.removeItem('session_token');
    setUser(null);
  };

  return {
    user,
    isLoading,
    handlePhoneAuth,
    handleLogout,
    vibrate
  };
};