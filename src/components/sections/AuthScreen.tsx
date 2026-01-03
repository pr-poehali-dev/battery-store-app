import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  authStep: 'phone' | 'code' | 'register';
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  handleSendCode: () => void;
  handleVerifyCode: () => void;
  handleRegister: () => void;
  setAuthStep: (step: 'phone' | 'code' | 'register') => void;
}

const AuthScreen = ({
  authStep,
  phoneNumber,
  setPhoneNumber,
  verificationCode,
  setVerificationCode,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleSendCode,
  handleVerifyCode,
  handleRegister,
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
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSendCode}
                disabled={phoneNumber.length < 10}
              >
                <Icon name="ArrowRight" size={20} className="mr-2" />
                Продолжить
              </Button>
            </>
          )}

          {authStep === 'code' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Код отправлен на номер
                </p>
                <p className="font-semibold">+{phoneNumber}</p>
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={() => {
                    setAuthStep('phone');
                    setVerificationCode('');
                  }}
                >
                  Изменить номер
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

          {authStep === 'register' && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Создание нового аккаунта
                </p>
                <p className="font-semibold">+{phoneNumber}</p>
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
                  setAuthStep('phone');
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
