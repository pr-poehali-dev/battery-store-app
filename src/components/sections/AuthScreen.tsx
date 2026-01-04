import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  authStep: 'method' | 'phone' | 'telegram' | 'code' | 'register' | 'login';
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  telegramId: string;
  setTelegramId: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  authMethod: 'sms' | 'telegram';
  setAuthMethod: (method: 'sms' | 'telegram') => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleSendCode: () => void;
  handleVerifyCode: () => void;
  handleRegister: () => void;
  handleLogin: () => void;
  setAuthStep: (step: 'method' | 'phone' | 'telegram' | 'code' | 'register' | 'login') => void;
}

const AuthScreen = ({
  authStep,
  phoneNumber,
  setPhoneNumber,
  telegramId,
  setTelegramId,
  verificationCode,
  setVerificationCode,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  authMethod,
  setAuthMethod,
  rememberMe,
  setRememberMe,
  handleSendCode,
  handleVerifyCode,
  handleRegister,
  handleLogin,
  setAuthStep
}: AuthScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Battery" size={40} className="text-primary" />
          </div>
          <CardTitle className="text-3xl">Мир Аккумуляторов</CardTitle>
          <CardDescription>Войдите в личный кабинет</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {authStep === 'method' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Выберите способ входа или регистрации
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full h-auto py-6 flex flex-col gap-2"
                  variant="outline"
                  onClick={() => {
                    setAuthMethod('telegram');
                    setAuthStep('telegram');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Icon name="MessageCircle" size={24} className="text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Telegram</p>
                      <p className="text-xs text-muted-foreground">Быстрый вход через бота</p>
                    </div>
                  </div>
                </Button>
                <Button
                  className="w-full h-auto py-6 flex flex-col gap-2"
                  variant="outline"
                  onClick={() => {
                    setAuthMethod('sms');
                    setAuthStep('phone');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon name="Smartphone" size={24} className="text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">SMS</p>
                      <p className="text-xs text-muted-foreground">Вход через номер телефона</p>
                    </div>
                  </div>
                </Button>
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Уже есть аккаунт?
                  </span>
                </div>
              </div>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => setAuthStep('login')}
              >
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти в аккаунт
              </Button>
            </>
          )}

          {authStep === 'telegram' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telegram ID</label>
                <Input
                  type="text"
                  placeholder="123456789"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value.replace(/\D/g, ''))}
                  className="text-lg"
                />
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-xs text-muted-foreground mb-2">
                    <Icon name="Info" size={14} className="inline mr-1" />
                    Как узнать свой Telegram ID:
                  </p>
                  <ol className="text-xs text-muted-foreground space-y-1 ml-4 list-decimal">
                    <li>Откройте бота <a href="https://t.me/userinfobot" target="_blank" className="text-blue-600 underline">@userinfobot</a></li>
                    <li>Отправьте команду /start</li>
                    <li>Скопируйте ваш ID и вставьте сюда</li>
                  </ol>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id="remember-telegram" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label
                  htmlFor="remember-telegram"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Запомнить меня
                </label>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSendCode}
                disabled={telegramId.length < 5}
              >
                <Icon name="ArrowRight" size={20} className="mr-2" />
                Отправить код в Telegram
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setAuthStep('method')}
              >
                Назад
              </Button>
            </>
          )}

          {authStep === 'phone' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Номер телефона</label>
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={11}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Введите номер телефона для входа или регистрации
                </p>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id="remember-phone" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label
                  htmlFor="remember-phone"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Запомнить меня
                </label>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSendCode}
                disabled={phoneNumber.length < 10}
              >
                <Icon name="ArrowRight" size={20} className="mr-2" />
                Отправить SMS
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setAuthStep('method')}
              >
                Назад
              </Button>
            </>
          )}

          {authStep === 'code' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Код отправлен {authMethod === 'telegram' ? 'в Telegram' : 'на номер'}
                </p>
                <p className="font-semibold">{authMethod === 'telegram' ? `ID: ${telegramId}` : `+${phoneNumber}`}</p>
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={() => {
                    setAuthStep(authMethod === 'telegram' ? 'telegram' : 'phone');
                    setVerificationCode('');
                  }}
                >
                  Изменить {authMethod === 'telegram' ? 'ID' : 'номер'}
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Код подтверждения</label>
                <Input
                  type="text"
                  placeholder="____"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Для демо используйте код: <span className="font-semibold">1234</span>
                </p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 4}
              >
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Подтвердить
              </Button>
            </>
          )}

          {authStep === 'login' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Выберите способ входа
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full h-auto py-6 flex flex-col gap-2"
                  variant="outline"
                  onClick={() => {
                    setAuthMethod('telegram');
                    setAuthStep('telegram');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Icon name="MessageCircle" size={24} className="text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Telegram</p>
                      <p className="text-xs text-muted-foreground">Войти через Telegram ID</p>
                    </div>
                  </div>
                </Button>
                <Button
                  className="w-full h-auto py-6 flex flex-col gap-2"
                  variant="outline"
                  onClick={() => {
                    setAuthMethod('sms');
                    setAuthStep('phone');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon name="Smartphone" size={24} className="text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">SMS</p>
                      <p className="text-xs text-muted-foreground">Войти через номер телефона</p>
                    </div>
                  </div>
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => setAuthStep('method')}
              >
                Назад
              </Button>
            </>
          )}

          {authStep === 'register' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Создание нового аккаунта
                </p>
                <p className="font-semibold">{authMethod === 'telegram' ? `Telegram ID: ${telegramId}` : `+${phoneNumber}`}</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input
                    type="text"
                    placeholder="Иван"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Фамилия</label>
                  <Input
                    type="text"
                    placeholder="Иванов"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleRegister}
                disabled={!firstName || !lastName}
              >
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  setAuthStep(authMethod === 'telegram' ? 'telegram' : 'phone');
                  setFirstName('');
                  setLastName('');
                }}
              >
                Назад
              </Button>
            </>
          )}
          
          <Button 
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Очистить данные и начать заново
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;