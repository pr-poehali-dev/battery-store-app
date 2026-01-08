import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const YandexAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (error) {
        toast({
          title: 'Ошибка авторизации',
          description: 'Не удалось войти через Яндекс',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      if (!code) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('https://functions.poehali.dev/d33d90f8-0536-4c38-8c90-dc549a6d657c', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          toast({
            title: data.message,
            description: `Добро пожаловать, ${data.user.name}!`,
          });
          navigate('/');
        } else {
          toast({
            title: 'Ошибка',
            description: data.error || 'Не удалось авторизоваться',
            variant: 'destructive',
          });
          navigate('/');
        }
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Проблема с подключением к серверу',
          variant: 'destructive',
        });
        navigate('/');
      }
    };

    handleCallback();
  }, [location, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Авторизация через Яндекс...</p>
      </div>
    </div>
  );
};

export default YandexAuthCallback;
