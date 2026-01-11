import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  handleTelegramAuth: (user: any) => void;
}

const AuthScreen = ({ handleTelegramAuth }: AuthScreenProps) => {
  const [mode, setMode] = useState<'choice' | 'login' | 'register' | 'code'>('choice');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [devCode, setDevCode] = useState('');
  const { toast } = useToast();

  const handleYandexLogin = () => {
    const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID || '';
    if (!clientId) {
      toast({
        title: 'Ошибка',
        description: 'Яндекс OAuth не настроен',
        variant: 'destructive',
      });
      return;
    }
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/yandex');
    const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = yandexAuthUrl;
  };

  const API_URL = 'https://functions.poehali.dev/cecdecab-000b-4d65-9160-6e06bc91079f';

  const normalizePhone = (phoneStr: string): string => {
    const digits = phoneStr.replace(/\D/g, '');
    if (digits.startsWith('8') && digits.length === 11) {
      return '7' + digits.slice(1);
    }
    if (!digits.startsWith('7') && digits.length === 10) {
      return '7' + digits;
    }
    return digits;
  };

  const sendSMSCode = async () => {
    setIsLoading(true);
    const normalizedPhone = normalizePhone(phone);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_code',
          phone: normalizedPhone
        })
      });

      const data = await response.json();

      if (data.success) {
        setDevCode(data.dev_code || '');
        setMode('code');
        toast({
          title: 'Код отправлен',
          description: data.dev_code ? `Тестовый код: ${data.dev_code}` : 'Проверьте SMS',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить код',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);
    const normalizedPhone = normalizePhone(phone);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_code',
          phone: normalizedPhone,
          code: code,
          is_registration: mode === 'register',
          remember_me: rememberMe,
          name: name || 'Клиент'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Сохранение токена если "Запомнить меня"
        if (data.session_token) {
          localStorage.setItem('session_token', data.session_token);
        }

        handleTelegramAuth({
          id: data.user.id,
          first_name: data.user.name,
          phone_number: data.user.phone,
          cashback: data.user.cashback,
          role: data.user.role,
        });

        toast({
          title: mode === 'register' ? 'Регистрация успешна' : 'Вход выполнен',
          description: `Добро пожаловать, ${data.user.name}!`,
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Неверный код',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      sendSMSCode();
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      verifyCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex items-center gap-3 justify-center">
            <span className="text-5xl">🍃</span>
            <h1 className="text-3xl font-bold text-primary italic">Мир Аккумуляторов</h1>
          </div>
          <CardDescription className="text-lg">
            С 1998 года на рынке
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {mode === 'choice' && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Добро пожаловать!</h3>
                <p className="text-sm text-muted-foreground">
                  Выберите способ входа
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base bg-[#FFCC00] hover:bg-[#FFD633] text-black"
                  onClick={handleYandexLogin}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.9 17.5h-2.5l-2.7-6.7h-.1v6.7H8.1V6.5h4.1c2.7 0 4.2 1.2 4.2 3.3 0 1.6-.9 2.7-2.3 3.1l2.8 4.6z"/>
                  </svg>
                  Войти через Яндекс
                </Button>
                
                <Button 
                  className="w-full h-12 text-base"
                  onClick={() => setMode('login')}
                  variant="outline"
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Войти по SMS
                </Button>
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">
                  {mode === 'register' ? 'Регистрация' : 'Вход'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Введите данные для получения SMS-кода
                </p>
              </div>

              <div className="space-y-3">
                {mode === 'register' && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="h-12"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Запомнить меня
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={phone.length < 10 || isLoading}
                >
                  {isLoading ? 'Отправка...' : 'Получить код'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setMode('choice')}
                >
                  Назад
                </Button>
              </div>
            </form>
          )}

          {mode === 'code' && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Введите код</h3>
                <p className="text-sm text-muted-foreground">
                  Код отправлен на номер {phone}
                </p>
                {devCode && (
                  <p className="text-xs text-primary font-mono bg-primary/10 p-2 rounded">
                    Тестовый код: {devCode}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 text-center text-2xl tracking-widest"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={code.length !== 6 || isLoading}
                >
                  {isLoading ? 'Проверка...' : 'Подтвердить'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => sendSMSCode()}
                  disabled={isLoading}
                >
                  Отправить код повторно
                </Button>
              </div>
            </form>
          )}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} />
                <span>Безопасно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={16} />
                <span>Быстро</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={16} />
                <span>Просто</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;