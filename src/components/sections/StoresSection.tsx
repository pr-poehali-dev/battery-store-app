import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import StoreCard from './stores/StoreCard';
import ServiceCenterCard from './stores/ServiceCenterCard';
import StoresMap from './stores/StoresMap';
import FooterInfo from '@/components/ui/FooterInfo';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  coords: [number, number];
  workHours: string;
  dgisUrl: string;
  reviews?: Review[];
}

const stores: Store[] = [
  {
    id: 1,
    name: 'Магазин на Павловича, 26',
    address: 'ул. Павловича, 26',
    phone: '+7 (4212) 45-41-41',
    coords: [48.4795, 135.0825],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00',
    dgisUrl: 'https://2gis.ru/khabarovsk/firm/70000001018324238',
    reviews: [
      { author: 'Александр К.', rating: 5, text: 'Отличный магазин! Большой выбор аккумуляторов, помогли с подбором для моего авто. Цены адекватные.', date: '15 декабря 2025' },
      { author: 'Мария С.', rating: 5, text: 'Очень довольна обслуживанием. Консультанты профессиональные, установили быстро и качественно. Рекомендую!', date: '8 января 2026' }
    ]
  },
  {
    id: 2,
    name: 'Магазин на Павловича, 11',
    address: 'ул. Павловича, 11',
    phone: '+7 (4212) 45-99-99',
    coords: [48.4782, 135.0815],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00',
    dgisUrl: 'https://2gis.ru/khabarovsk/firm/70000001018325173',
    reviews: [
      { author: 'Дмитрий П.', rating: 5, text: 'Удобное расположение, всегда есть нужные модели в наличии. Персонал вежливый и грамотный.', date: '22 декабря 2025' },
      { author: 'Ольга В.', rating: 4, text: 'Хороший магазин, быстро обслужили. Единственное - немного тесновато внутри.', date: '3 января 2026' }
    ]
  },
  {
    id: 3,
    name: 'Магазин на Краснореченской, 149',
    address: 'ул. Краснореченская, 149',
    phone: '+7 (4212) 47-41-41',
    coords: [48.4240, 135.1085],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00',
    dgisUrl: 'https://2gis.ru/khabarovsk/firm/70000001039589773',
    reviews: [
      { author: 'Сергей Л.', rating: 5, text: 'Покупал аккумулятор для грузовика. Отличный сервис, помогли с выбором, дали гарантию. Всё супер!', date: '10 января 2026' }
    ]
  },
  {
    id: 4,
    name: 'Магазин на Воронежской, 66',
    address: 'ул. Воронежская, 66',
    phone: '+7 (4212) 28-41-41',
    coords: [48.4565, 135.1045],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00',
    dgisUrl: 'https://2gis.ru/khabarovsk/firm/70000001018326001',
    reviews: [
      { author: 'Андрей М.', rating: 5, text: 'Лучший магазин аккумуляторов в городе! Быстро, профессионально, честные цены. Спасибо!', date: '28 декабря 2025' },
      { author: 'Елена Г.', rating: 5, text: 'Приятно удивлена уровнем сервиса. Помогли разобраться с характеристиками, всё объяснили понятно.', date: '5 января 2026' }
    ]
  },
  {
    id: 5,
    name: 'Магазин на Суворова, 73а/2',
    address: 'ул. Суворова, 73а/2',
    phone: '+7 (4212) 97-41-41',
    coords: [48.5340, 135.1400],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00',
    dgisUrl: 'https://2gis.ru/khabarovsk/firm/70000001039581699',
    reviews: [
      { author: 'Игорь Н.', rating: 5, text: 'Работаю с этой сетью много лет. Всегда качественные аккумуляторы и честная гарантия. Молодцы!', date: '18 декабря 2025' }
    ]
  },
  {
    id: 6,
    name: 'Магазин на пр. 60-летия Октября, 154',
    address: 'Проспект 60-летия Октября, 154',
    phone: '+7 (4212) 28-45-45',
    coords: [48.4480, 135.1350],
    workHours: 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00',
    dgisUrl: 'https://2gis.ru/khabarovsk/firm/70000001018327003',
    reviews: [
      { author: 'Виктор З.', rating: 5, text: 'Отличный выбор аккумуляторов для мотоциклов и снегоходов. Консультанты знают своё дело!', date: '1 января 2026' },
      { author: 'Наталья Р.', rating: 4, text: 'Хороший магазин, адекватные цены. Немного долго ждала консультанта, но в целом всё отлично.', date: '7 января 2026' }
    ]
  }
];

const StoresSection = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
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
          
          const { store, distance } = findNearestStore(coords);
          setNearestStore(store);
          setSelectedStore(store);
          setIsLoadingLocation(false);
          
          toast({
            title: "Ближайший магазин найден!",
            description: `${store.name} находится в ${distance.toFixed(1)} км от вас`,
          });
        },
        () => {
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

  const handleBuildRoute = (coords: [number, number], dgisUrl?: string) => {
    window.open(`https://2gis.ru/khabarovsk?m=${coords[1]},${coords[0]}`, '_blank');
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

      <StoresMap />

      <div className="grid gap-4">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            isSelected={selectedStore?.id === store.id}
            isNearest={nearestStore?.id === store.id}
            onSelect={() => setSelectedStore(store)}
            onCall={handleCallStore}
            onBuildRoute={handleBuildRoute}
          />
        ))}
      </div>

      <ServiceCenterCard
        isExpanded={showServiceCenter}
        onToggle={() => setShowServiceCenter(!showServiceCenter)}
        onBuildRoute={handleBuildRoute}
      />

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

      <FooterInfo />
    </div>
  );
};

export default StoresSection;