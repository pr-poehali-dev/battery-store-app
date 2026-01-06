import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  handleTelegramAuth: (user: any) => void;
}

const AuthScreen = ({ handleTelegramAuth }: AuthScreenProps) => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [devCode, setDevCode] = useState('');
  const { toast } = useToast();

  const SMS_API = 'https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518';

  const sendCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SMS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, action: 'send' })
      });

      const data = await response.json();

      if (data.success) {
        setDevCode(data.dev_code || '');
        setStep('code');
        toast({
          title: 'Код отправлен',
          description: data.dev_code ? `Тестовый: ${data.dev_code}` : 'Проверьте SMS',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить',
          variant: 'destructive',
        });
      }
    } catch {
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
    try {
      const response = await fetch(SMS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code, name: name || 'Клиент', action: 'verify' })
      });

      const data = await response.json();

      if (data.success) {
        handleTelegramAuth({
          id: data.user.id,
          first_name: data.user.name,
          phone_number: data.user.phone,
          cashback: data.user.cashback,
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Неверный код',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением',
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
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Battery" size={40} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-primary">
              Мир Аккумуляторов
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              С 1998 года на рынке
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Вход в приложение</h3>
                <p className="text-sm text-muted-foreground">
                  Введите данные для получения SMS-кода
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="h-12"
                  required
                />
              </div>

              <Button 
                className="w-full h-12"
                onClick={sendCode}
                disabled={phone.length < 10 || isLoading}
              >
                {isLoading ? 'Отправка...' : 'Получить код'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Введите код</h3>
                <p className="text-sm text-muted-foreground">
                  Код отправлен на {phone}
                </p>
                {devCode && (
                  <p className="text-xs text-primary font-mono bg-primary/10 p-2 rounded">
                    Код: {devCode}
                  </p>
                )}
              </div>

              <Input
                type="text"
                placeholder="____"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="h-12 text-center text-2xl tracking-widest"
                maxLength={4}
                autoFocus
              />

              <div className="space-y-2">
                <Button 
                  className="w-full h-12"
                  onClick={verifyCode}
                  disabled={code.length !== 4 || isLoading}
                >
                  {isLoading ? 'Проверка...' : 'Подтвердить'}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep('phone')}
                >
                  Назад
                </Button>
              </div>
            </div>
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