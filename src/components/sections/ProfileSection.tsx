import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import Barcode from 'react-barcode';
import FooterInfo from '@/components/ui/FooterInfo';
import { getUserLevel, getNextLevel, getProgressToNextLevel, getAmountToNextLevel, loyaltyLevels } from '@/utils/loyalty';
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

      <Card className={`border-2 ${getUserLevel(user).borderColor} bg-gradient-to-br ${getUserLevel(user).bgGradient} overflow-hidden relative`}>
        <div className="absolute top-0 right-0 text-8xl opacity-10">{getUserLevel(user).icon}</div>
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl">{getUserLevel(user).icon}</span>
                <div>
                  <CardTitle className="text-2xl">{getUserLevel(user).name}</CardTitle>
                  <CardDescription>Ваш уровень лояльности</CardDescription>
                </div>
              </div>
            </div>
            <Badge className={`${getUserLevel(user).color} ${getUserLevel(user).textColor} border ${getUserLevel(user).borderColor} text-base px-3 py-1`}>
              {getUserLevel(user).cashbackPercent}% кэшбек
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Потрачено всего:</span>
              <span className="font-bold">{(user.totalSpent || 0).toLocaleString()} ₽</span>
            </div>
            {getNextLevel(user) && (
              <>
                <Progress value={getProgressToNextLevel(user)} className="h-3" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    До уровня <span className="font-semibold">{getNextLevel(user)?.name}</span>:
                  </span>
                  <span className="font-bold text-primary">
                    {getAmountToNextLevel(user).toLocaleString()} ₽
                  </span>
                </div>
              </>
            )}
            {!getNextLevel(user) && (
              <div className="text-center py-2">
                <Badge variant="secondary" className="text-sm">
                  <Icon name="Crown" size={14} className="mr-1" />
                  Максимальный уровень достигнут!
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Icon name="Gift" size={18} />
              Ваши привилегии:
            </h4>
            <div className="space-y-2">
              {getUserLevel(user).benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
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
          <div className="bg-white p-6 rounded-lg border-2 border-primary/30 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon name="QrCode" size={20} className="text-primary" />
              <h3 className="font-semibold text-lg">Ваш личный штрих-код</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Предъявите этот код при покупке для начисления кэшбека
            </p>
            <div className="flex justify-center">
              <Barcode 
                value={user.telegram_id || user.phone || '0000000000'}
                width={2}
                height={80}
                displayValue={true}
                background="#ffffff"
                lineColor="#000000"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ID: {user.telegram_id || user.phone}
            </p>
          </div>


          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={18} className="text-green-600" />
              <p className="font-semibold text-green-600">Как работает кэшбек?</p>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
              <li>С каждой покупки возвращается {getUserLevel(user).cashbackPercent}% на ваш счёт</li>
              <li>Кэшбек можно использовать для оплаты следующих заказов</li>
              <li>Накопленные средства не сгорают</li>
              <li>Чем выше уровень — тем больше кэшбек!</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Примеры начисления (ваш уровень):</h4>
            <div className="grid gap-2">
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Покупка на 5 000 ₽</span>
                <Badge variant="secondary">+{Math.floor(5000 * getUserLevel(user).cashbackPercent / 100)} ₽</Badge>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Покупка на 10 000 ₽</span>
                <Badge variant="secondary">+{Math.floor(10000 * getUserLevel(user).cashbackPercent / 100)} ₽</Badge>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Покупка на 20 000 ₽</span>
                <Badge variant="secondary">+{Math.floor(20000 * getUserLevel(user).cashbackPercent / 100)} ₽</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Crown" size={24} className="text-primary" />
            Все уровни лояльности
          </CardTitle>
          <CardDescription>Совершайте покупки и получайте больше привилегий</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loyaltyLevels.map((level) => {
            const isCurrentLevel = getUserLevel(user).id === level.id;
            const isUnlocked = (user.totalSpent || 0) >= level.minSpent;
            
            return (
              <Card 
                key={level.id} 
                className={`relative overflow-hidden transition-all ${
                  isCurrentLevel 
                    ? `border-2 ${level.borderColor} bg-gradient-to-br ${level.bgGradient} shadow-lg scale-105` 
                    : isUnlocked
                    ? 'border-2 border-green-500/30 bg-green-500/5'
                    : 'border opacity-60'
                }`}
              >
                {isCurrentLevel && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary">
                      <Icon name="Check" size={12} className="mr-1" />
                      Текущий
                    </Badge>
                  </div>
                )}
                {!isCurrentLevel && isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Открыт
                    </Badge>
                  </div>
                )}
                {!isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-muted">
                      <Icon name="Lock" size={12} className="mr-1" />
                      Закрыт
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{level.icon}</span>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{level.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {level.minSpent === 0 
                          ? 'Стартовый уровень' 
                          : `От ${level.minSpent.toLocaleString()} ₽`
                        }
                      </CardDescription>
                    </div>
                    <Badge className={`${level.color} ${level.textColor} border ${level.borderColor}`}>
                      {level.cashbackPercent}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {level.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                    {level.benefits.length > 3 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        +{level.benefits.length - 3} ещё привилегий
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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

      <FooterInfo />
    </div>
  );
};

export default ProfileSection;