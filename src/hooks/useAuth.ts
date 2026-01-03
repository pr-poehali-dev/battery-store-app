import { useState, useEffect } from 'react';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<'phone' | 'code' | 'register'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
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
        if (userData && userData.phone && userData.firstName) {
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
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Введите корректный номер телефона');
      return;
    }
    vibrate(50);
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const isExistingUser = !!savedUsers[phoneNumber];
    
    try {
      const response = await fetch('https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', phone: phoneNumber })
      });

      const data = await response.json();

      if (data.success) {
        if (data.dev_code) {
          alert(`Код для входа (режим разработки): ${data.dev_code}`);
        }
        
        if (isExistingUser) {
          setAuthStep('code');
        } else {
          setAuthStep('register');
        }
      } else {
        alert(data.error || 'Ошибка отправки кода');
      }
    } catch (error) {
      console.error('SMS error:', error);
      alert('Ошибка отправки SMS. Проверьте подключение.');
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 4) {
      alert('Введите 4-значный код');
      return;
    }
    
    vibrate(50);
    
    try {
      const response = await fetch('https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', phone: phoneNumber, code: verificationCode })
      });

      const data = await response.json();

      if (data.success) {
        const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        const userData = savedUsers[phoneNumber];
        
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
    const newUser: User = {
      phone: phoneNumber,
      firstName,
      lastName,
      cashback: 0
    };
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    savedUsers[phoneNumber] = newUser;
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
    phoneNumber,
    verificationCode,
    firstName,
    lastName,
    setPhoneNumber,
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
