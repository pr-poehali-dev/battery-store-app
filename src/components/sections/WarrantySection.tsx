import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import FooterInfo from '@/components/ui/FooterInfo';

interface WarrantyInfo {
  serial_number: string;
  brand: string;
  model: string;
  purchase_date: string;
  warranty_months: number;
  warranty_end: string;
  days_left: number;
  is_valid: boolean;
  buyer_phone?: string;
  buyer_name?: string;
  store_address?: string;
}

const WarrantySection = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [warrantyInfo, setWarrantyInfo] = useState<WarrantyInfo | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!serialNumber.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите серийный номер аккумулятора',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setWarrantyInfo(null);

    try {
      const response = await fetch('https://functions.poehali.dev/0126470b-16a6-45c5-b227-85b4b511fb1a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serial_number: serialNumber.trim() })
      });

      const data = await response.json();

      if (data.found && data.warranty) {
        setWarrantyInfo(data.warranty);
        toast({
          title: 'Аккумулятор найден!',
          description: `${data.warranty.brand} ${data.warranty.model}`,
        });
      } else {
        setNotFound(true);
        toast({
          title: 'Не найдено',
          description: 'Аккумулятор с таким номером не найден в нашей базе',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось проверить гарантию. Попробуйте позже.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDaysText = (days: number) => {
    if (days === 1) return '1 день';
    if (days >= 2 && days <= 4) return `${days} дня`;
    return `${days} дней`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon name="ShieldCheck" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl">Проверка гарантии</CardTitle>
          <p className="text-sm text-muted-foreground">
            Введите серийный номер аккумулятора для проверки гарантии
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Например: VARTA-2024-001234"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              className="flex-1"
            />
            <Button onClick={handleCheck} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="Search" size={16} className="mr-2" />
                  Проверить
                </>
              )}
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-2">
                  <p className="font-medium text-gray-900">Где найти серийный номер?</p>
                  <p className="text-gray-700">
                    Серийный номер находится на этикетке аккумулятора. 
                    Обычно это комбинация букв и цифр (например: VARTA-2024-001234).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {warrantyInfo && (
            <Card className={`border-2 ${warrantyInfo.is_valid ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} animate-slide-up`}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${warrantyInfo.is_valid ? 'bg-green-100' : 'bg-red-100'}`}>
                      <Icon name={warrantyInfo.is_valid ? "CheckCircle2" : "XCircle"} size={24} className={warrantyInfo.is_valid ? 'text-green-600' : 'text-red-600'} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{warrantyInfo.is_valid ? 'Гарантия действительна' : 'Гарантия истекла'}</h3>
                      <p className="text-sm text-muted-foreground">Серийный номер: {warrantyInfo.serial_number}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Package" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Модель</p>
                        <p className="font-medium">{warrantyInfo.brand} {warrantyInfo.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Дата покупки</p>
                        <p className="font-medium">{formatDate(warrantyInfo.purchase_date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Срок гарантии</p>
                        <p className="font-medium">{warrantyInfo.warranty_months} месяцев</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name="CalendarCheck" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Гарантия до</p>
                        <p className="font-medium">{formatDate(warrantyInfo.warranty_end)}</p>
                      </div>
                    </div>
                    {warrantyInfo.is_valid && (
                      <div className="flex items-center gap-2">
                        <Icon name="Timer" size={16} className="text-green-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Осталось</p>
                          <p className="font-medium text-green-600">{getDaysText(warrantyInfo.days_left)}</p>
                        </div>
                      </div>
                    )}
                    {warrantyInfo.store_address && (
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Место покупки</p>
                          <p className="font-medium">{warrantyInfo.store_address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {warrantyInfo.buyer_name && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Покупатель</p>
                        <p className="font-medium">{warrantyInfo.buyer_name}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!warrantyInfo.is_valid && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">Срок гарантии истек</p>
                          <p className="text-gray-700 mt-1">
                            Свяжитесь с нашими магазинами для консультации по замене или ремонту.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          )}

          {notFound && (
            <Card className="border-2 border-orange-500 bg-orange-50 animate-slide-up">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="Search" size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Аккумулятор не найден</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Возможные причины:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Неверно введен серийный номер</li>
                      <li>Аккумулятор приобретен не в нашей сети</li>
                      <li>Покупка была совершена давно и не попала в электронную базу</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      Позвоните в магазин, где была совершена покупка, для уточнения информации.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm space-y-2">
              <p className="font-medium">Демо-данные для проверки</p>
              <p className="text-muted-foreground">
                Попробуйте ввести: <code className="bg-white px-2 py-1 rounded">MUTLU-2025-009012</code> 
                {' '}или{' '}
                <code className="bg-white px-2 py-1 rounded">VARTA-2023-112233</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FooterInfo />
    </div>
  );
};

export default WarrantySection;
