import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  handleTelegramAuth: (user: any) => void;
}

const AuthScreen = ({ handleTelegramAuth }: AuthScreenProps) => {
  const { toast } = useToast();
  const botUsername = 'Miraccumhbkbot';

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

  const handleTelegramLogin = () => {
    const telegramUrl = `https://t.me/${botUsername}?start=login`;
    window.open(telegramUrl, '_blank');
    
    toast({
      title: 'Переход в Telegram',
      description: 'Откройте бота и следуйте инструкциям для входа',
    });
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">или</span>
                </div>
              </div>
              
              <Button
                className="w-full h-12 text-base bg-[#0088cc] hover:bg-[#0077b3] text-white"
                onClick={handleTelegramLogin}
              >
                <Icon name="Send" size={20} className="mr-2" />
                Войти через Telegram
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
