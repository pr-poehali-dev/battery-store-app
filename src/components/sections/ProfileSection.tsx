import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface User {
  phone: string;
  firstName: string;
  lastName: string;
  cashback: number;
}

interface ProfileSectionProps {
  user: User;
  handleLogout: () => void;
}

const ProfileSection = ({ user, handleLogout }: ProfileSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Личный кабинет</h2>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти
        </Button>
      </div>

      <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={32} className="text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{user.firstName} {user.lastName}</CardTitle>
              <p className="text-muted-foreground">+{user.phone}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wallet" size={24} className="text-primary" />
              <CardTitle>Мой кэшбек</CardTitle>
            </div>
            <div className="text-3xl font-bold text-primary">
              {user.cashback} ₽
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={18} className="text-green-600" />
              <p className="font-semibold text-green-600">Как работает кэшбек?</p>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
              <li>С каждой покупки возвращается 3% на ваш счёт</li>
              <li>Кэшбек можно использовать для оплаты следующих заказов</li>
              <li>Накопленные средства не сгорают</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Примеры начисления:</h4>
            <div className="grid gap-2">
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Покупка на 5 000 ₽</span>
                <Badge variant="secondary">+150 ₽</Badge>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Покупка на 10 000 ₽</span>
                <Badge variant="secondary">+300 ₽</Badge>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Покупка на 20 000 ₽</span>
                <Badge variant="secondary">+600 ₽</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История покупок</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Icon name="ShoppingBag" size={48} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">История покупок пока пуста</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
