import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';
import { User } from '@/types';

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
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.firstName} {user.lastName}</CardTitle>
              <p className="text-muted-foreground text-sm">
                {user.telegram_id ? `Telegram ID: ${user.telegram_id}` : `+${user.phone}`}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Percent" size={24} className="text-green-600" />
            <CardTitle>Ваша скидка</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg border-2 border-green-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon name="BadgePercent" size={32} className="text-green-600" />
              <h3 className="font-bold text-3xl text-green-600">5%</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Постоянная скидка на все товары
            </p>
          </div>
        </CardContent>
      </Card>

      {(user.purchaseCount || 0) >= 1 && (
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Icon name="Sparkles" size={28} className="text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Эксклюзивные акции</CardTitle>
                <CardDescription className="text-base">Только для постоянных клиентов</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="overflow-hidden border-2 border-amber-500/30 shadow-lg">
              <div className="relative h-40">
                <img 
                  src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/da6f4b8c-9659-41ce-9885-e38394da2a85.jpg"
                  alt="VIP акция"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Icon name="Crown" size={14} />
                  VIP
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Icon name="Gift" size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Рекордная распродажа!</h3>
                    <p className="text-sm text-muted-foreground">Эксклюзивно для постоянных клиентов</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Аккумуляторы MEDALIST</span>
                    <span className="text-lg font-bold text-amber-600">-15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Аккумуляторы ROCKET</span>
                    <span className="text-lg font-bold text-amber-600">-12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Аккумуляторы SUPER NOVA</span>
                    <span className="text-lg font-bold text-amber-600">-10%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>Акция действует до конца месяца</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-2 border-blue-500/30 shadow-lg">
              <div className="relative h-40">
                <img 
                  src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/9879afdb-18e9-4be7-aa46-c5b8b33eb12c.jpg"
                  alt="Бонусная программа"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Icon name="Star" size={14} />
                  BONUS
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon name="Plus" size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Бонусная программа</h3>
                    <p className="text-sm text-muted-foreground">Накапливайте бонусы за каждую покупку</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>5% бонусами от каждой покупки</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Бонусы списываются до 100% стоимости</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Бонусы не сгорают</span>
                  </div>
                </div>
              </div>
            </Card>
          </CardContent>
        </Card>
      )}

      <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Info" size={24} className="text-orange-600" />
            <CardTitle>Важная информация</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <Icon name="AlertCircle" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
            <p>Скидки не суммируются с другими акциями</p>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Icon name="AlertCircle" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
            <p>Сообщите ваш ID кассиру перед оформлением покупки</p>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Icon name="AlertCircle" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
            <p>Скидка применяется автоматически при предъявлении ID</p>
          </div>
        </CardContent>
      </Card>

      <FooterInfo />
    </div>
  );
};

export default ProfileSection;