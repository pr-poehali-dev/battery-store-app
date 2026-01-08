import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  coords: [number, number];
  workHours: string;
}

const stores: Store[] = [
  {
    id: 1,
    name: 'Магазин на Павловича, 26',
    address: 'ул. Павловича, 26',
    phone: '+7 (4212) 45-41-41',
    coords: [48.4808, 135.0838],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00'
  },
  {
    id: 2,
    name: 'Магазин на Павловича, 11',
    address: 'ул. Павловича, 11',
    phone: '+7 (4212) 45-99-99',
    coords: [48.4790, 135.0820],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00'
  },
  {
    id: 3,
    name: 'Магазин на Краснореченской, 149',
    address: 'ул. Краснореченская, 149',
    phone: '+7 (4212) 47-41-41',
    coords: [48.5100, 135.1100],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00'
  },
  {
    id: 4,
    name: 'Магазин на Воронежской, 66',
    address: 'ул. Воронежская, 66',
    phone: '+7 (4212) 28-41-41',
    coords: [48.4550, 135.1050],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00'
  },
  {
    id: 5,
    name: 'Магазин на Суворова, 73а/2',
    address: 'ул. Суворова, 73а/2',
    phone: '+7 (4212) 97-41-41',
    coords: [48.4650, 135.0680],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00'
  },
  {
    id: 6,
    name: 'Магазин на пр. 60-летия Октября, 154',
    address: 'Проспект 60-летия Октября, 154',
    phone: '+7 (4212) 28-45-45',
    coords: [48.4400, 135.1300],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00'
  }
];

const StoresSection = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestStore, setNearestStore] = useState<Store | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showServiceCenter, setShowServiceCenter] = useState(false);
  const { toast } = useToast();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findNearestStore = (userCoords: [number, number]) => {
    let nearest = stores[0];
    let minDistance = calculateDistance(userCoords[0], userCoords[1], nearest.coords[0], nearest.coords[1]);

    stores.forEach(store => {
      const distance = calculateDistance(userCoords[0], userCoords[1], store.coords[0], store.coords[1]);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = store;
      }
    });

    return { store: nearest, distance: minDistance };
  };

  const handleFindNearest = () => {
    setIsLoadingLocation(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          
          const { store, distance } = findNearestStore(coords);
          setNearestStore(store);
          setSelectedStore(store);
          setIsLoadingLocation(false);
          
          toast({
            title: "Ближайший магазин найден!",
            description: `${store.name} находится в ${distance.toFixed(1)} км от вас`,
          });
        },
        (error) => {
          setIsLoadingLocation(false);
          toast({
            title: "Не удалось определить местоположение",
            description: "Разрешите доступ к геолокации в настройках браузера",
            variant: "destructive"
          });
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast({
        title: "Геолокация недоступна",
        description: "Ваш браузер не поддерживает определение местоположения",
        variant: "destructive"
      });
    }
  };

  const handleCallStore = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleBuildRoute = (coords: [number, number]) => {
    window.open(`https://yandex.ru/maps/?rtext=~${coords[0]},${coords[1]}&rtt=auto`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon name="MapPin" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl">Наши магазины</CardTitle>
          <p className="text-sm text-muted-foreground">6 точек продаж по Хабаровску</p>
          
          <div className="mt-4">
            <Button 
              onClick={handleFindNearest}
              disabled={isLoadingLocation}
              className="w-full md:w-auto"
            >
              {isLoadingLocation ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Определяем...
                </>
              ) : (
                <>
                  <Icon name="Navigation" size={16} className="mr-2" />
                  Найти ближайший магазин
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[400px] bg-muted">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=135.0838%2C48.4808&z=12&l=map&pt=135.0838,48.4808,pm2rdm~135.0820,48.4790,pm2rdm~135.1100,48.5100,pm2rdm~135.1050,48.4550,pm2rdm~135.0680,48.4650,pm2rdm~135.1300,48.4400,pm2rdm"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              style={{ position: 'relative' }}
              title="Карта магазинов"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {stores.map((store) => (
          <Card 
            key={store.id}
            className={`transition-all hover:shadow-lg cursor-pointer ${
              selectedStore?.id === store.id ? 'border-primary ring-2 ring-primary/20' : ''
            } ${nearestStore?.id === store.id ? 'bg-primary/5' : ''}`}
            onClick={() => setSelectedStore(store)}
          >
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Store" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        {nearestStore?.id === store.id && (
                          <Badge className="bg-green-500">Ближайший</Badge>
                        )}
                      </div>
                      <div className="flex items-start gap-2 mt-1 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Icon name="Phone" size={16} className="flex-shrink-0" />
                        <a href={`tel:${store.phone}`} className="hover:text-primary transition-colors">
                          {store.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="secondary" className="flex-shrink-0">
                      #{store.id}
                    </Badge>
                    {selectedStore?.id !== store.id && (
                      <div className="flex flex-col items-center text-primary animate-bounce">
                        <Icon name="ChevronDown" size={20} />
                        <span className="text-xs">Подробнее</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedStore?.id === store.id && (
                  <div className="space-y-3 pt-3 border-t animate-slide-up">
                    {store.id === 1 && (
                      <div className="grid grid-cols-2 gap-2">
                        <img 
                          src="https://cdn.poehali.dev/files/IMG_0834.jpeg" 
                          alt="Магазин Павловича 26 - внешний вид"
                          className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        />
                        <img 
                          src="https://cdn.poehali.dev/files/IMG_0835.jpeg" 
                          alt="Магазин Павловича 26 - вход"
                          className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {store.id === 2 && (
                      <div className="grid grid-cols-2 gap-2">
                        <img 
                          src="https://cdn.poehali.dev/files/IMG_0838.jpeg" 
                          alt="Магазин Павловича 11 - вход зимой"
                          className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        />
                        <img 
                          src="https://cdn.poehali.dev/files/IMG_0839.jpeg" 
                          alt="Магазин Павловича 11 - фасад"
                          className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {store.id === 3 && (
                      <div className="grid grid-cols-2 gap-2">
                        <img 
                          src="https://cdn.poehali.dev/files/IMG_0843.jpeg" 
                          alt="Магазин Краснореченская 149 - общий вид"
                          className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        />
                        <img 
                          src="https://cdn.poehali.dev/files/IMG_0842.jpeg" 
                          alt="Магазин Краснореченская 149 - вход"
                          className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {store.id === 4 && (
                      <img 
                        src="https://cdn.poehali.dev/files/IMG_0841.jpeg" 
                        alt="Магазин Воронежская 66 - фасад"
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {store.id === 5 && (
                      <img 
                        src="https://cdn.poehali.dev/files/IMG_0844.jpeg" 
                        alt="Магазин Суворова 73а/2 - павильон"
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {store.id === 6 && (
                      <img 
                        src="https://cdn.poehali.dev/files/IMG_0840.jpeg" 
                        alt="Магазин Проспект 60-летия Октября 154 - вход"
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="flex items-start gap-2 text-sm">
                      <Icon name="Clock" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Режим работы:</p>
                        <p className="text-muted-foreground">{store.workHours}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallStore(store.phone);
                        }}
                        className="w-full"
                      >
                        <Icon name="Phone" size={16} className="mr-2" />
                        Позвонить
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuildRoute(store.coords);
                        }}
                        className="w-full"
                      >
                        <Icon name="Navigation" size={16} className="mr-2" />
                        Маршрут
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card 
        className={`transition-all hover:shadow-lg cursor-pointer border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-600/5 ${
          showServiceCenter ? 'ring-2 ring-amber-500/20' : ''
        }`}
        onClick={() => setShowServiceCenter(!showServiceCenter)}
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
                {!showServiceCenter && (
                  <div className="flex flex-col items-center text-amber-600 animate-bounce">
                    <Icon name="ChevronDown" size={20} />
                    <span className="text-xs">Подробнее</span>
                  </div>
                )}
              </div>
            </div>

            {showServiceCenter && (
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

                <div className="flex items-start gap-2 text-sm">
                  <Icon name="Clock" size={16} className="mt-0.5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Режим работы:</p>
                    <p className="text-muted-foreground">Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 p-3 rounded-lg">
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="CheckCircle2" size={16} className="mt-0.5 text-amber-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-amber-600">Услуги сервиса:</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <li>• Диагностика аккумуляторов</li>
                        <li>• Зарядка и обслуживание</li>
                        <li>• Ремонт и восстановление</li>
                        <li>• Консультация специалистов</li>
                      </ul>
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
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuildRoute([48.4790, 135.0820]);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    <Icon name="Navigation" size={16} className="mr-2" />
                    Маршрут
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm space-y-2">
              <p className="font-medium">Удобный выбор магазина</p>
              <p className="text-muted-foreground">
                Нажмите на магазин, чтобы увидеть подробную информацию и построить маршрут. Все магазины работают по единому графику.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground/70 text-center space-y-1">
          <span className="block">ИП ОВИС МАРК АЛЕКСАНДРОВИЧ</span>
          <span className="block">ИП ИСРАИЛОВА ЮЛИЯ ВЛАДИМИРОВНА</span>
          <span className="block mt-2">©2026 Мир Аккумуляторов</span>
        </p>
      </div>
    </div>
  );
};

export default StoresSection;