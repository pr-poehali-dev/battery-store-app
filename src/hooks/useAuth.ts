import { useState, useEffect } from 'react';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<'method' | 'phone' | 'telegram' | 'code' | 'register'>('method');
  const [authMethod, setAuthMethod] = useState<'sms' | 'telegram'>('sms');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData && (userData.phone || userData.telegram_id) && userData.firstName) {
          setUser(userData);
        } else {
          localStorage.removeItem('user');
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSendCode = async () => {
    if (authMethod === 'sms') {
      if (!phoneNumber || phoneNumber.length < 10) {
        alert('Введите корректный номер телефона');
        return;
      }
    } else {
      if (!telegramId || telegramId.length < 5) {
        alert('Введите корректный Telegram ID');
        return;
      }
    }
    
    vibrate(50);
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const userKey = authMethod === 'telegram' ? `tg_${telegramId}` : phoneNumber;
    const isExistingUser = !!savedUsers[userKey];
    
    try {
      const url = authMethod === 'telegram' 
        ? 'https://functions.poehali.dev/7b8d9285-7867-4922-a217-d3a83a2b1a6c'
        : 'https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518';
      
      const body = authMethod === 'telegram'
        ? { action: 'send', telegram_id: telegramId }
        : { action: 'send', phone: phoneNumber };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        if (data.dev_code) {
          alert(`Код для входа (режим разработки): ${data.dev_code}`);
        }
        
        if (authMethod === 'telegram') {
          alert(`Код отправлен в Telegram. Проверьте сообщения от бота.`);
        }
        
        if (isExistingUser) {
          setAuthStep('code');
        } else {
          setAuthStep('register');
        }
      } else {
        alert(data.error || `Ошибка отправки кода через ${authMethod === 'telegram' ? 'Telegram' : 'SMS'}`);
      }
    } catch (error) {
      console.error('Send code error:', error);
      alert(`Ошибка отправки кода через ${authMethod === 'telegram' ? 'Telegram' : 'SMS'}. Проверьте подключение.`);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 4) {
      alert('Введите 4-значный код');
      return;
    }
    
    vibrate(50);
    
    try {
      const url = authMethod === 'telegram'
        ? 'https://functions.poehali.dev/7b8d9285-7867-4922-a217-d3a83a2b1a6c'
        : 'https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518';
      
      const body = authMethod === 'telegram'
        ? { action: 'verify', telegram_id: telegramId, code: verificationCode }
        : { action: 'verify', phone: phoneNumber, code: verificationCode };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        const userKey = authMethod === 'telegram' ? `tg_${telegramId}` : phoneNumber;
        const userData = savedUsers[userKey];
        
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          alert('Пользователь не найден');
        }
      } else {
        alert(data.error || 'Неверный код');
      }
    } catch (error) {
      console.error('Verify error:', error);
      alert('Ошибка проверки кода');
    }
  };

  const handleRegister = () => {
    if (!firstName || !lastName) {
      alert('Заполните имя и фамилию');
      return;
    }
    vibrate(50);
    
    const newUser: User = authMethod === 'telegram'
      ? {
          telegram_id: telegramId,
          firstName,
          lastName,
          cashback: 0
        }
      : {
          phone: phoneNumber,
          firstName,
          lastName,
          cashback: 0
        };
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const userKey = authMethod === 'telegram' ? `tg_${telegramId}` : phoneNumber;
    savedUsers[userKey] = newUser;
    localStorage.setItem('users', JSON.stringify(savedUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    vibrate([30, 50]);
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    isAuthenticating,
    authStep,
    authMethod,
    phoneNumber,
    telegramId,
    verificationCode,
    firstName,
    lastName,
    setAuthMethod,
    setPhoneNumber,
    setTelegramId,
    setVerificationCode,
    setFirstName,
    setLastName,
    setAuthStep,
    handleSendCode,
    handleVerifyCode,
    handleRegister,
    handleLogout,
    vibrate
  };
};