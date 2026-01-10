import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';
import { useReservations } from '@/hooks/useReservations';
import { Reservation } from '@/types';

interface ReservationSectionProps {
  user: any;
}

const ReservationSection = ({ user }: ReservationSectionProps) => {
  const { reservations, cancelReservation, getUserReservations } = useReservations();
  const [showHistory, setShowHistory] = useState(false);

  const userReservations = getUserReservations();

  const getStatusColor = (status: Reservation['status']) => {
    const colors = {
      'pending': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400',
      'confirmed': 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400',
      'ready': 'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400',
      'completed': 'bg-gray-500/10 text-gray-600 border-gray-500/20 dark:bg-gray-500/20 dark:text-gray-400',
      'cancelled': 'bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/20 dark:text-red-400'
    };
    return colors[status];
  };

  const getStatusLabel = (status: Reservation['status']) => {
    const labels = {
      'pending': 'Ожидает подтверждения',
      'confirmed': 'Подтверждено',
      'ready': 'Готово к выдаче',
      'completed': 'Выдано',
      'cancelled': 'Отменено'
    };
    return labels[status];
  };

  const getStatusIcon = (status: Reservation['status']) => {
    const icons = {
      'pending': 'Clock',
      'confirmed': 'CheckCircle',
      'ready': 'Package',
      'completed': 'CheckCheck',
      'cancelled': 'XCircle'
    };
    return icons[status];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
            <Icon name="Package" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl">Мои бронирования</CardTitle>
          <CardDescription>
            Управляйте забронированными товарами
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex gap-3">
        <Button
          variant={!showHistory ? 'default' : 'outline'}
          onClick={() => setShowHistory(false)}
          className="flex-1"
        >
          <Icon name="Package" size={18} className="mr-2" />
          Активные
          {userReservations.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {userReservations.length}
            </Badge>
          )}
        </Button>
        <Button
          variant={showHistory ? 'default' : 'outline'}
          onClick={() => setShowHistory(true)}
          className="flex-1"
        >
          <Icon name="History" size={18} className="mr-2" />
          История
        </Button>
      </div>

      {!showHistory && userReservations.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Package" size={40} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold">У вас пока нет бронирований</p>
              <p className="text-muted-foreground mt-2">
                Забронируйте товары в каталоге для самовывоза
              </p>
            </div>
          </div>
        </Card>
      )}

      {!showHistory && userReservations.length > 0 && (
        <div className="space-y-4">
          {userReservations.map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(reservation.status)} variant="outline">
                        <Icon name={getStatusIcon(reservation.status) as any} size={14} className="mr-1" />
                        {getStatusLabel(reservation.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        #{reservation.id}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{reservation.product.name}</CardTitle>
                    <CardDescription>{reservation.product.brand}</CardDescription>
                  </div>
                  <div className="text-2xl">{reservation.product.image}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Количество</p>
                    <p className="font-medium">{reservation.quantity} шт</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Сумма</p>
                    <p className="font-medium text-primary">
                      {(reservation.product.price * reservation.quantity).toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="MapPin" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Пункт выдачи</p>
                      <p className="text-muted-foreground">{reservation.store}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Calendar" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Дата и время получения</p>
                      <p className="text-muted-foreground">
                        {new Date(reservation.pickupDate).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })} в {reservation.pickupTime}
                      </p>
                    </div>
                  </div>
                </div>

                {reservation.status === 'ready' && (
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-green-900 dark:text-green-100">Товар готов к выдаче!</p>
                          <p className="text-green-700 dark:text-green-300 mt-1">
                            Приезжайте в выбранный магазин для получения заказа
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.location.href = `tel:+74212284242`}
                    >
                      <Icon name="Phone" size={18} className="mr-2" />
                      Позвонить
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => {
                        if (confirm('Вы уверены, что хотите отменить бронирование?')) {
                          cancelReservation(reservation.id);
                        }
                      }}
                    >
                      <Icon name="X" size={18} className="mr-2" />
                      Отменить
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showHistory && (
        <div className="space-y-4">
          {reservations
            .filter(res => res.status === 'completed' || res.status === 'cancelled')
            .map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(reservation.status)} variant="outline">
                          <Icon name={getStatusIcon(reservation.status) as any} size={14} className="mr-1" />
                          {getStatusLabel(reservation.status)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          #{reservation.id}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{reservation.product.name}</CardTitle>
                      <CardDescription>
                        {new Date(reservation.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <div className="text-2xl">{reservation.product.image}</div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          {reservations.filter(res => res.status === 'completed' || res.status === 'cancelled').length === 0 && (
            <Card className="p-12">
              <div className="text-center space-y-4">
                <Icon name="History" size={64} className="mx-auto text-muted-foreground" />
                <div>
                  <p className="text-xl font-semibold">История пуста</p>
                  <p className="text-muted-foreground mt-2">
                    Здесь будут отображаться завершенные и отмененные бронирования
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      <FooterInfo />
    </div>
  );
};

export default ReservationSection;
