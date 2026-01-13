import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  title: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 'auto',
    title: 'АККУМУЛЯТОРЫ ДЛЯ АВТОМОБИЛЕЙ',
    image: 'https://cdn.poehali.dev/files/IMG_0939.jpeg'
  },
  {
    id: 'moto',
    title: 'АККУМУЛЯТОРЫ ДЛЯ МОТОТЕХНИКИ',
    image: 'https://cdn.poehali.dev/files/IMG_0940.jpeg'
  },
  {
    id: 'warehouse',
    title: 'АККУМУЛЯТОРЫ ДЛЯ СКЛАДСКОЙ И УБОРОЧНОЙ ТЕХНИКИ',
    image: 'https://cdn.poehali.dev/files/IMG_0940.jpeg'
  },
  {
    id: 'carku',
    title: 'CARKU',
    image: 'https://cdn.poehali.dev/files/IMG_0941.jpeg'
  },
  {
    id: 'vtoman',
    title: 'VTOMAN',
    image: 'https://cdn.poehali.dev/files/IMG_0941.jpeg'
  },
  {
    id: 'sale',
    title: 'АКЦИЯ АКБ',
    image: 'https://cdn.poehali.dev/files/IMG_0941.jpeg'
  },
  {
    id: 'generators',
    title: 'БЕНЗОГЕНЕРАТОРЫ',
    image: 'https://cdn.poehali.dev/files/IMG_0942.jpeg'
  },
  {
    id: 'chainsaws',
    title: 'БЕНЗОПИЛЫ',
    image: 'https://cdn.poehali.dev/files/IMG_0942.jpeg'
  },
  {
    id: 'chargers',
    title: 'ЗАРЯДНЫЕ УСТРОЙСТВА',
    image: 'https://cdn.poehali.dev/files/IMG_0942.jpeg'
  }
];

const CategoryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Каталог</h2>
      <div className="relative group">
        <Button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          size="icon"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-none w-[140px] md:w-[180px] cursor-pointer group/item snap-start"
            >
              <div className="text-center space-y-2">
                <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover/item:scale-105 border">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-contain p-3"
                  />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700 line-clamp-2 leading-tight">
                  {category.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          size="icon"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default CategoryCarousel;