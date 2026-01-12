import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  handlePhoneAuth: (user: any) => void;
}

const AuthScreen = ({ handlePhoneAuth }: AuthScreenProps) => {
  const { toast } = useToast();
  const [isRegistration, setIsRegistration] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите номер телефона',
        variant: 'destructive',
      });
      return;
    }

    if (isRegistration && !name.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите ваше имя',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/d4e5fqh6g4q6djsrvtfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setCodeSent(true);
        toast({
          title: 'Код отправлен',
          description: 'Проверьте SMS на вашем телефоне',
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
        description: 'Проблема с сетью',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите код из SMS',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/d4e5fqh6g4q6djsrvtfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_code',
          phone,
          code,
          is_registration: isRegistration,
          name: isRegistration ? name : undefined,
          remember_me: true,
        }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.session_token) {
          localStorage.setItem('session_token', data.session_token);
        }
        handlePhoneAuth(data.user);
        toast({
          title: 'Успешно',
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
        description: 'Проблема с сетью',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                {isRegistration ? 'Регистрация' : 'Вход'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRegistration ? 'Создайте аккаунт для заказов' : 'Войдите по номеру телефона'}
              </p>
            </div>

            <div className="space-y-4">
              {isRegistration && (
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Иван"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={codeSent}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 900 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={codeSent}
                />
              </div>

              {codeSent && (
                <div className="space-y-2">
                  <Label htmlFor="code">Код из SMS</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
              )}

              {!codeSent ? (
                <Button
                  className="w-full h-12 text-base"
                  onClick={handleSendCode}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  ) : (
                    <Icon name="Send" size={20} className="mr-2" />
                  )}
                  Получить код
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="w-full h-12 text-base"
                    onClick={handleVerifyCode}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    ) : (
                      <Icon name="LogIn" size={20} className="mr-2" />
                    )}
                    Войти
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setCodeSent(false);
                      setCode('');
                    }}
                  >
                    Отправить код повторно
                  </Button>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">или</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsRegistration(!isRegistration);
                  setCodeSent(false);
                  setCode('');
                }}
              >
                {isRegistration ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;