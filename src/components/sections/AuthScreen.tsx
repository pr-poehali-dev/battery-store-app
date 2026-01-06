import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  handleTelegramAuth: (user: any) => void;
}

const AuthScreen = ({ handleTelegramAuth }: AuthScreenProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      handleTelegramAuth({
        id: Date.now(),
        first_name: name || 'Клиент',
        phone_number: phone,
        photo_url: '',
      });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Вход в приложение</h3>
              <p className="text-sm text-muted-foreground">
                Введите ваши данные для доступа к каталогу и бонусам
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
              </div>
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
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={phone.length < 10}
            >
              Войти в магазин
            </Button>
          </form>

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