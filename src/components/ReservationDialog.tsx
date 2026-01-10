import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/types';
import { useReservations } from '@/hooks/useReservations';
import { stores } from '@/data/products';

interface ReservationDialogProps {
  product: Product;
  onClose: () => void;
  user: any;
}

const ReservationDialog = ({ product, onClose, user }: ReservationDialogProps) => {
  const { addReservation } = useReservations();
  const [quantity, setQuantity] = useState(1);
  const [selectedStore, setSelectedStore] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [success, setSuccess] = useState(false);
  const [reservationId, setReservationId] = useState('');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00'
  ];

  const handleSubmit = async () => {
    if (!selectedStore || !pickupDate || !pickupTime || !customerPhone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const reservation = addReservation({
      product,
      quantity,
      store: selectedStore,
      pickupDate,
      pickupTime,
      customerName: `${user.firstName} ${user.lastName}`,
      customerPhone
    });

    setReservationId(reservation.id);
    setSuccess(true);

    try {
      const response = await fetch('https://functions.poehali.dev/6faa2230-15d9-4722-a0b7-be9325b055ff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservation })
      });

      if (!response.ok) {
        console.error('Failed to send Telegram notification');
      }
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
        <Card className="max-w-md w-full animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
            <CardTitle className="text-2xl">Бронирование оформлено!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4 space-y-3 text-sm">
                <div>
                  <p className="font-medium">Номер бронирования:</p>
                  <p className="text-lg font-bold text-primary">{reservationId}</p>
                </div>
                <div>
                  <p className="font-medium">Товар:</p>
                  <p className="text-muted-foreground">{product.name}</p>
                </div>
                <div>
                  <p className="font-medium">Пункт выдачи:</p>
                  <p className="text-muted-foreground">{selectedStore}</p>
                </div>
                <div>
                  <p className="font-medium">Дата получения:</p>
                  <p className="text-muted-foreground">
                    {new Date(pickupDate).toLocaleDateString('ru-RU')} в {pickupTime}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-4">
                <div className="text-sm space-y-2">
                  <p className="font-semibold text-green-900 dark:text-green-100">Что дальше?</p>
                  <ul className="space-y-1 text-green-700 dark:text-green-300">
                    <li>• Мы подтвердим бронь в течение 1 часа</li>
                    <li>• Товар будет зарезервирован на 24 часа</li>
                    <li>• Приезжайте в выбранное время за покупкой</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                className="flex-1"
                onClick={() => window.location.href = `tel:+74212284242`}
              >
                <Icon name="Phone" size={18} className="mr-2" />
                Позвонить
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Закрыть
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in">
      <Card className="max-w-2xl w-full my-8 animate-scale-in">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Забронировать товар</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Резерв на 24 часа в выбранном магазине
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{product.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground">{product.brand}</p>
                  <p className="text-2xl font-bold text-primary mt-2">
                    {product.price.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Icon name="Package" size={16} />
                Количество
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
                <Badge variant="secondary" className="ml-auto text-base">
                  Итого: {(product.price * quantity).toLocaleString()} ₽
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                Пункт выдачи
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                <option value="">Выберите магазин</option>
                {stores.map((store, index) => (
                  <option key={index} value={store.address}>
                    {store.address}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  Дата получения
                </label>
                <Input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={minDate}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  Время получения
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Выберите время</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Icon name="Phone" size={16} />
                Телефон для связи
              </label>
              <Input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3 text-sm">
                <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-blue-900 dark:text-blue-100">
                  <p className="font-semibold">Условия бронирования:</p>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                    <li>• Товар резервируется на 24 часа</li>
                    <li>• Оплата производится при получении</li>
                    <li>• Возможна отмена бронирования</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              className="flex-1 h-12 text-lg"
              onClick={handleSubmit}
            >
              <Icon name="CheckCircle" size={20} className="mr-2" />
              Забронировать
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12"
            >
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationDialog;