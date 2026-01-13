import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  const [testCode, setTestCode] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);
    
    if (limited.length <= 3) return limited;
    if (limited.length <= 6) return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSendCode = async () => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!cleanPhone || cleanPhone.length !== 10) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректный номер телефона (10 цифр)',
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

    if (!agreedToTerms) {
      toast({
        title: 'Ошибка',
        description: 'Необходимо согласиться с обработкой данных',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/cecdecab-000b-4d65-9160-6e06bc91079f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', phone: cleanPhone }),
      });

      const data = await response.json();

      if (response.ok) {
        setCodeSent(true);
        
        if (data.test_mode && data.test_code) {
          setTestCode(data.test_code);
          toast({
            title: 'Тестовый код',
            description: `Ваш код: ${data.test_code}`,
          });
        } else {
          toast({
            title: 'Код отправлен',
            description: 'Проверьте SMS на вашем телефоне',
          });
        }
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

    const cleanPhone = phone.replace(/\D/g, '');

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/cecdecab-000b-4d65-9160-6e06bc91079f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_code',
          phone: cleanPhone,
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
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-base">
                    7
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="900 123 4567"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={codeSent}
                    className="pl-9 font-mono"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Введите 10 цифр без скобок и пробелов
                </p>
              </div>

              {codeSent && (
                <>
                  {testCode && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Info" size={16} className="text-yellow-600 dark:text-yellow-500" />
                        <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">Тестовый режим</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-yellow-900 dark:text-yellow-300 tracking-wider">
                        {testCode}
                      </p>
                    </div>
                  )}
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
                </>
              )}

              <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  disabled={codeSent}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    Я соглашаюсь на обработку моих персональных данных
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Мы используем ваши данные для обработки заказов и улучшения сервиса
                  </p>
                </div>
              </div>

              {!codeSent ? (
                <Button
                  className="w-full h-12 text-base"
                  onClick={handleSendCode}
                  disabled={isLoading || !agreedToTerms}
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
                      setTestCode(null);
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