import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  title: string;
  image: string;
  category?: string;
}

const categories: Category[] = [
  {
    id: 'auto',
    title: 'АККУМУЛЯТОРЫ ДЛЯ АВТОМОБИЛЕЙ',
    image: 'https://miraccum.ru/wp-content/uploads/2025/06/Group-1339-1.jpg',
    category: 'Азиатские'
  },
  {
    id: 'moto',
    title: 'АККУМУЛЯТОРЫ ДЛЯ МОТОТЕХНИКИ',
    image: 'https://miraccum.ru/wp-content/uploads/2023/06/MirAcum-moto.png'
  },
  {
    id: 'warehouse',
    title: 'АККУМУЛЯТОРЫ ДЛЯ СКЛАДСКОЙ И УБОРОЧНОЙ ТЕХНИКИ',
    image: 'https://miraccum.ru/wp-content/uploads/2023/02/MirAcum-1.png'
  },
  {
    id: 'carku',
    title: 'CARKU',
    image: 'https://miraccum.ru/wp-content/uploads/2021/07/Group-1335-1.jpg',
    category: 'Пусковые устройства'
  },
  {
    id: 'vtoman',
    title: 'VTOMAN',
    image: 'https://miraccum.ru/wp-content/uploads/2023/05/MirAcum.png'
  },
  {
    id: 'sale',
    title: 'АКЦИЯ АКБ',
    image: 'https://miraccum.ru/wp-content/uploads/2021/07/Group-1797.jpg'
  },
  {
    id: 'generators',
    title: 'БЕНЗОГЕНЕРАТОРЫ',
    image: 'https://miraccum.ru/wp-content/uploads/2021/07/Group-1792.jpg'
  },
  {
    id: 'chainsaws',
    title: 'БЕНЗОПИЛЫ',
    image: 'https://miraccum.ru/wp-content/uploads/2021/07/Group-1796.jpg'
  },
  {
    id: 'chargers',
    title: 'ЗАРЯДНЫЕ УСТРОЙСТВА',
    image: 'https://miraccum.ru/wp-content/uploads/2021/07/Group-1335.jpg',
    category: 'Зарядные устройства'
  }
];

interface CategoryCarouselProps {
  onCategoryClick: (category?: string) => void;
}

const CategoryCarousel = ({ onCategoryClick }: CategoryCarouselProps) => {
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.category)}
              className="flex-none w-[140px] md:w-[180px] cursor-pointer group/item snap-start"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 p-2 text-xs md:text-sm font-bold text-white text-center leading-tight">
                  {cat.title}
                </p>
              </div>
            </button>
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