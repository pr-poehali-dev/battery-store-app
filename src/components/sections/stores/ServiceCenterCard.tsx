import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface ServiceCenterCardProps {
  isExpanded: boolean;
  onToggle: () => void;
  onBuildRoute: (coords: [number, number], dgisUrl?: string) => void;
}

const ServiceCenterCard = ({ isExpanded, onToggle, onBuildRoute }: ServiceCenterCardProps) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const coords: [number, number] = [48.4782, 135.0815];

  const openNavigator = (type: 'gis' | 'yandex' | 'google') => {
    const [lat, lon] = coords;
    const urls = {
      gis: `https://2gis.ru/khabarovsk?m=${lon},${lat}`,
      yandex: `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`,
      google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
    };
    window.open(urls[type], '_blank');
    setIsNavMenuOpen(false);
  };
  return (
    <Card 
      className={`transition-all hover:shadow-lg cursor-pointer ${
        isExpanded ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/5' : ''
      }`}
      onClick={onToggle}
    >
      <CardContent className="pt-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Wrench" size={20} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">Сервисный центр</h3>
                  <Badge className="bg-amber-500">Обслуживание</Badge>
                </div>
                <div className="flex items-start gap-2 mt-1 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>ул. Павловича, 11д2</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Обслуживание аккумуляторных батарей</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge variant="secondary" className="flex-shrink-0 bg-amber-500/20">
                <Icon name="Wrench" size={14} />
              </Badge>
              {!isExpanded && (
                <div className="flex flex-col items-center text-amber-600 animate-bounce">
                  <Icon name="ChevronDown" size={20} />
                  <span className="text-xs">Подробнее</span>
                </div>
              )}
            </div>
          </div>

          {isExpanded && (
            <div className="space-y-3 pt-3 border-t border-amber-500/20 animate-slide-up">
              <div className="grid grid-cols-2 gap-2">
                <img 
                  src="https://cdn.poehali.dev/files/IMG_0831.jpeg" 
                  alt="Сервисный центр - вид 1"
                  className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://cdn.poehali.dev/files/IMG_0832.jpeg" 
                  alt="Сервисный центр - вид 2"
                  className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Icon name="Wrench" size={16} className="text-amber-600" />
                  Наши услуги
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>Проверка качества аккумулятора с актом</li>
                  <li>Зарядка АКБ любого типа</li>
                  <li>Установка на транспортное средство</li>
                  <li>Проверка электрооборудования автомобиля</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <Icon name="Clock" size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">График работы:</p>
                    <p className="text-muted-foreground">Пн-Пт: 9:00-19:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 10:00-18:00</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = 'tel:+74212459999';
                  }}
                  className="w-full border-amber-500/30 hover:bg-amber-500/10"
                >
                  <Icon name="Phone" size={16} className="mr-2" />
                  Позвонить
                </Button>
                <DropdownMenu open={isNavMenuOpen} onOpenChange={setIsNavMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600"
                    >
                      <Icon name="Navigation" size={16} className="mr-2" />
                      Маршрут
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={() => openNavigator('gis')}>
                      <Icon name="Map" size={16} className="mr-2" />
                      2ГИС
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openNavigator('yandex')}>
                      <Icon name="MapPin" size={16} className="mr-2" />
                      Яндекс.Карты
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openNavigator('google')}>
                      <Icon name="Globe" size={16} className="mr-2" />
                      Google Maps
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCenterCard;