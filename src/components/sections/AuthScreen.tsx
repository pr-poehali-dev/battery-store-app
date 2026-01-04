import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import TelegramLoginButton from '@/components/TelegramLoginButton';

interface AuthScreenProps {
  handleTelegramAuth: (user: any) => void;
}

const AuthScreen = ({ handleTelegramAuth }: AuthScreenProps) => {
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
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Вход в приложение</h3>
              <p className="text-sm text-muted-foreground">
                Войдите через Telegram, чтобы получить доступ к каталогу, корзине и бонусам
              </p>
            </div>

            <div className="py-4">
              <TelegramLoginButton
                botUsername="mir_akkumulyatorov_bot"
                onAuth={handleTelegramAuth}
                buttonSize="large"
                cornerRadius={10}
                requestAccess={true}
                usePic={true}
                lang="ru"
              />
            </div>

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex gap-3">
                <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Для входа:</p>
                  <ol className="space-y-1 ml-4 list-decimal">
                    <li>Нажмите кнопку выше</li>
                    <li>Подтвердите вход в окне Telegram</li>
                    <li>Готово! Ваши данные подтянутся автоматически</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex gap-2">
                <Icon name="AlertCircle" size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Если кнопка не работает:</p>
                  <ul className="space-y-0.5 ml-3 list-disc">
                    <li>Убедитесь что бот создан через @BotFather</li>
                    <li>Настройте домен командой /setdomain</li>
                    <li>Добавьте токен бота в секреты проекта</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

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
