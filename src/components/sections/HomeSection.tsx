import { useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface HomeSectionProps {
  userPurchaseCount: number;
  brands: string[];
  vibrate: (pattern: number | number[]) => void;
  setActiveSection: (section: string) => void;
}

interface CarouselSlide {
  image: string;
  action: () => void;
  alt: string;
}

const HomeSection = ({ userPurchaseCount, brands, vibrate, setActiveSection }: HomeSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const carouselSlides: CarouselSlide[] = [
    {
      image: 'https://cdn.poehali.dev/files/IMG_0793.jpeg',
      action: () => setActiveSection('catalog'),
      alt: 'Аккумуляторы для автомобилей'
    },
    {
      image: 'https://cdn.poehali.dev/files/IMG_0793.jpeg',
      action: () => {
        setActiveSection('catalog');
        setTimeout(() => {
          const event = new CustomEvent('filterByBrand', { detail: 'Titan' });
          window.dispatchEvent(event);
        }, 100);
      },
      alt: 'Аккумуляторы Titan'
    },
    {
      image: 'https://cdn.poehali.dev/files/IMG_0793.jpeg',
      action: () => setActiveSection('promotions'),
      alt: 'Установка аккумулятора в подарок'
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {carouselSlides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={slide.action}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
        >
          <Icon name="ChevronLeft" size={24} className="text-gray-800" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
        >
          <Icon name="ChevronRight" size={24} className="text-gray-800" />
        </button>
      </div>

      <Card className="bg-gradient-to-br from-red-500/15 via-primary/10 to-blue-500/15 border-2 border-primary/40 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="https://cdn.poehali.dev/files/IMG_0793.jpeg"
                  alt="Блогер AcademeG с продукцией Carku"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-lg">
                <Icon name="Youtube" size={20} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1.5">
              <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <Icon name="Video" size={14} className="mr-1" />
                  YouTube
                </Badge>
                <h3 className="text-base font-bold">Рекомендует блогер AcademeG</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center md:justify-start">
                <Icon name="Users" size={14} />
                <span className="font-semibold">1,77 млн подписчиков</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Популярный автоблогер советует продукцию <span className="font-bold text-primary">Carku</span>
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary justify-center md:justify-start">
                <Icon name="Award" size={14} />
                <span>Мы работаем с брендом Carku</span>
              </div>
              <a 
                href="https://youtu.be/8ESv9PV_tpc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Icon name="Play" size={16} />
                Смотреть видеообзор
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Award" size={20} className="text-primary" />
            </div>
            <CardTitle className="text-xl">О компании</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary">1998</div>
              <p className="text-xs text-muted-foreground">Год основания</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <p className="text-xs text-muted-foreground">Клиентов</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-primary">6</div>
              <p className="text-xs text-muted-foreground">Точек</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            С 1998 года предлагаем широкий ассортимент аккумуляторов от 1 до 240 Ач для любого транспорта.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/20 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon name="Percent" size={20} className="text-green-600" />
              </div>
              <CardTitle className="text-xl">Скидка 5%</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent animate-shimmer" />
              <div className="relative z-10">
                <p className="text-xs text-muted-foreground">
                  {userPurchaseCount > 0 ? 'Вы - постоянный клиент!' : 'После первой покупки'}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  5% скидка
                </p>
              </div>
              <Icon name="Gift" size={28} className="text-green-600 relative z-10" />
            </div>
            <p className="text-xs text-muted-foreground">
              {userPurchaseCount > 0 
                ? 'Скидка 5% действует на все ваши покупки!' 
                : 'Получите скидку 5% после первой покупки!'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-600/5 border-2 border-amber-500/20 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon name="Zap" size={20} className="text-amber-600" />
              </div>
              <CardTitle className="text-xl">Хиты продаж</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-card rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500">1</Badge>
                  <span className="text-sm font-medium">Carku Pro 30</span>
                </div>
                <span className="text-xs text-muted-foreground">12 990₽</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-card rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500">2</Badge>
                  <span className="text-sm font-medium">Varta Blue 60Ah</span>
                </div>
                <span className="text-xs text-muted-foreground">6 500₽</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-card rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500">3</Badge>
                  <span className="text-sm font-medium">Bosch S4 75Ah</span>
                </div>
                <span className="text-xs text-muted-foreground">8 200₽</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-primary/5 to-amber-500/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 text-5xl animate-float">⚡</div>
          <div className="absolute bottom-4 right-4 text-5xl animate-float" style={{animationDelay: '1s'}}>🔋</div>
          <div className="absolute top-1/2 left-1/4 text-3xl transform -translate-y-1/2 animate-float" style={{animationDelay: '0.5s'}}>⚡</div>
          <div className="absolute top-1/3 right-1/3 text-4xl animate-float" style={{animationDelay: '1.5s'}}>🔌</div>
        </div>
        <CardHeader className="relative z-10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <CardTitle className="text-xl">Наши бренды</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {brands.map((brand, index) => (
              <Badge key={index} variant="outline" className="text-xs py-1 px-2.5 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:scale-105 transition-all duration-200">
                {brand}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-3">
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group border-2 border-primary/20 hover:border-primary/40 relative overflow-hidden" onClick={() => { vibrate(30); setActiveSection('catalog'); }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="pt-5 pb-5 text-center space-y-2 relative z-10">
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
              <Icon name="ShoppingBag" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Каталог товаров</h3>
            <p className="text-xs text-muted-foreground">Широкий выбор аккумуляторов</p>
            <Button className="w-full shadow-md hover:shadow-lg">Перейти в каталог</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group border-2 border-green-500/20 hover:border-green-500/40 relative overflow-hidden" onClick={() => setActiveSection('warranty')}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="pt-5 pb-5 text-center space-y-2 relative z-10">
            <div className="p-3 bg-green-500/10 rounded-full w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
              <Icon name="ShieldCheck" size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Проверка гарантии</h3>
            <p className="text-xs text-muted-foreground">Узнать срок гарантии</p>
            <Button variant="outline" className="w-full shadow-sm hover:shadow-md border-green-500/30 hover:bg-green-500/10">Проверить</Button>
          </CardContent>
        </Card>
      </div>

      <FooterInfo />
    </div>
  );
};

export default HomeSection;