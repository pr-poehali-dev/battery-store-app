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

      <Card className={`border-2 ${getUserLevel(user).borderColor} bg-gradient-to-br ${getUserLevel(user).bgGradient} overflow-hidden relative group hover:shadow-xl transition-all duration-500`}>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-5">
          <span className="text-9xl absolute top-4 right-4">{getUserLevel(user).icon}</span>
          <span className="text-8xl italic font-bold text-primary/20 absolute top-20 right-8">🍃</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl animate-bounce-subtle">{getUserLevel(user).icon}</span>
                <div>
                  <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">{getUserLevel(user).name}</CardTitle>
                  <CardDescription className="text-base">Ваш статус программы лояльности</CardDescription>
                </div>
              </div>
            </div>
            {getUserLevel(user).discountPercent > 0 && (
              <Badge className={`${getUserLevel(user).color} ${getUserLevel(user).textColor} border ${getUserLevel(user).borderColor} text-lg px-4 py-2 shadow-lg animate-pulse-slow`}>
                {getUserLevel(user).discountPercent}% скидка
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Совершено покупок:</span>
              <span className="font-bold">{(user.purchaseCount || 0)}</span>
            </div>
            {getNextLevel(user) && (
              <>
                <Progress value={getProgressToNextLevel(user)} className="h-3" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    До уровня <span className="font-semibold">{getNextLevel(user)?.name}</span>:
                  </span>
                  <span className="font-bold text-primary">
                    {getAmountToNextLevel(user)} {getAmountToNextLevel(user) === 1 ? 'покупка' : 'покупок'}
                  </span>
                </div>
              </>
            )}
            {!getNextLevel(user) && (
              <div className="text-center py-2">
                <Badge variant="secondary" className="text-sm">
                  <Icon name="Crown" size={14} className="mr-1" />
                  Вы - постоянный клиент!
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
          <div className="flex items-center gap-2">
            <Icon name="QrCode" size={24} className="text-primary" />
            <CardTitle>Карта постоянного клиента</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-primary/30 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon name="Percent" size={20} className="text-green-600" />
              <h3 className="font-semibold text-lg">
                {(user.purchaseCount || 0) > 0 ? 'Скидка 5% активна!' : 'Совершите первую покупку'}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Предъявите этот код при покупке для получения скидки
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


          <div className="p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg animate-pulse-slow">
                <Icon name="Sparkles" size={20} className="text-green-600" />
              </div>
              <p className="font-bold text-green-600 text-lg">Как работает кэшбек?</p>
            </div>
            <ul className="text-sm space-y-2 ml-2">
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>С каждой покупки возвращается <strong className="text-green-700">{getUserLevel(user).cashbackPercent}%</strong> на ваш счёт</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Оплачивайте кэшбеком до <strong className="text-green-700">100%</strong> стоимости покупки</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Кэшбек <strong className="text-green-700">не сгорает</strong> — копите сколько угодно</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Достигните <strong className="text-slate-600">Серебра</strong> для <strong className="text-green-700">5% кэшбека</strong></span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-lg flex items-center gap-2">
              <Icon name="Calculator" size={20} className="text-primary" />
              Примеры начисления на вашем уровне:
            </h4>
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                <span className="font-medium">Покупка на 5 000 ₽</span>
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30 group-hover:scale-110 transition-transform duration-300">+{Math.floor(5000 * getUserLevel(user).cashbackPercent / 100)} ₽</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                <span className="font-medium">Покупка на 10 000 ₽</span>
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30 group-hover:scale-110 transition-transform duration-300">+{Math.floor(10000 * getUserLevel(user).cashbackPercent / 100)} ₽</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                <span className="font-medium">Покупка на 20 000 ₽</span>
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30 group-hover:scale-110 transition-transform duration-300">+{Math.floor(20000 * getUserLevel(user).cashbackPercent / 100)} ₽</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-shadow duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg animate-pulse-slow">
              <Icon name="Trophy" size={28} className="text-primary" />
            </div>
            Уровни программы лояльности
          </CardTitle>
          <CardDescription className="text-base">Покупайте больше — получайте выгоднее!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loyaltyLevels.map((level, index) => {
            const isCurrentLevel = getUserLevel(user).id === level.id;
            const isUnlocked = (user.purchaseCount || 0) >= level.minPurchases;
            
            return (
              <Card 
                key={level.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`relative overflow-hidden animate-slide-up group hover:scale-[1.02] transition-all duration-500 ${
                  isCurrentLevel 
                    ? `border-2 ${level.borderColor} bg-gradient-to-br ${level.bgGradient} shadow-2xl scale-105 ring-2 ring-blue-500/20` 
                    : isUnlocked
                    ? 'border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 to-emerald-500/5 hover:shadow-xl'
                    : 'border opacity-70 hover:opacity-90'
                }`}
              >
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                  <span className="text-6xl absolute bottom-2 right-2">{level.icon}</span>
                  <span className="text-5xl italic font-bold text-primary/30 absolute bottom-10 right-6">🍃</span>
                </div>
                {isCurrentLevel && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary shadow-lg animate-pulse-slow">
                      <Icon name="Star" size={14} className="mr-1" />
                      Ваш уровень
                    </Badge>
                  </div>
                )}
                {!isCurrentLevel && isUnlocked && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Доступен
                    </Badge>
                  </div>
                )}
                {!isUnlocked && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-gray-200/80 text-gray-500">
                      <Icon name="Lock" size={14} className="mr-1" />
                      Закрыт
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{level.icon}</span>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{level.name}</CardTitle>
                      <CardDescription className="text-base font-medium">
                        {level.minPurchases === 0 
                          ? '🎉 Доступен сразу' 
                          : `💰 От ${level.minPurchases} ${level.minPurchases === 1 ? 'покупки' : 'покупок'}`
                        }
                      </CardDescription>
                    </div>
                    <Badge className={`${level.color} ${level.textColor} border ${level.borderColor} text-lg px-3 py-1 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      ⚡ {level.cashbackPercent}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {level.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm hover:translate-x-1 transition-transform duration-200">
                        <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{benefit}</span>
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