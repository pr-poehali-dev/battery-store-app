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
    phone: '+7 (4212) 45-78-40',
    coords: [48.4808, 135.0838],
    workHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-18:00, Вс: 10:00-16:00'
  },
  {
    id: 2,
    name: 'Магазин на Павловича, 11',
    address: 'ул. Павловича, 11',
    phone: '+7 (4212) 45-78-41',
    coords: [48.4790, 135.0820],
    workHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-18:00, Вс: 10:00-16:00'
  },
  {
    id: 3,
    name: 'Магазин на Краснореченской, 149',
    address: 'ул. Краснореченская, 149',
    phone: '+7 (4212) 45-78-42',
    coords: [48.5100, 135.1100],
    workHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-18:00, Вс: 10:00-16:00'
  },
  {
    id: 4,
    name: 'Магазин на Воронежской, 66',
    address: 'ул. Воронежская, 66',
    phone: '+7 (4212) 45-78-43',
    coords: [48.4550, 135.1050],
    workHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-18:00, Вс: 10:00-16:00'
  },
  {
    id: 5,
    name: 'Магазин на Суворова, 73а/2',
    address: 'ул. Суворова, 73а/2',
    phone: '+7 (4212) 45-78-44',
    coords: [48.4650, 135.0680],
    workHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-18:00, Вс: 10:00-16:00'
  },
  {
    id: 6,
    name: 'Магазин на пр. 60-летия Октября, 154',
    address: 'Проспект 60-летия Октября, 154',
    phone: '+7 (4212) 45-78-45',
    coords: [48.4400, 135.1300],
    workHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-18:00, Вс: 10:00-16:00'
  }
];

const StoresSection = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestStore, setNearestStore] = useState<Store | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
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
                  <Badge variant="secondary" className="flex-shrink-0">
                    #{store.id}
                  </Badge>
                </div>

                {selectedStore?.id === store.id && (
                  <div className="space-y-3 pt-3 border-t animate-slide-up">
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
    </div>
  );
};

export default StoresSection;