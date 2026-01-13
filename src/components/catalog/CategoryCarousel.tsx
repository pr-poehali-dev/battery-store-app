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
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/8a5a889f-4663-431f-a326-8ceb1e204c12.jpg',
    category: 'Азиатские'
  },
  {
    id: 'moto',
    title: 'АККУМУЛЯТОРЫ ДЛЯ МОТОТЕХНИКИ',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/ef0e57a7-629a-41a0-b800-6ad8682a9765.jpg'
  },
  {
    id: 'warehouse',
    title: 'АККУМУЛЯТОРЫ ДЛЯ СКЛАДСКОЙ И УБОРОЧНОЙ ТЕХНИКИ',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/3395e99b-9afc-4402-aadc-75dd03a38863.jpg'
  },
  {
    id: 'carku',
    title: 'CARKU',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/0f3aa941-b89a-4a8b-b5b0-8725d4117c80.jpg',
    category: 'Пусковые устройства'
  },
  {
    id: 'vtoman',
    title: 'VTOMAN',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/5af8815d-312b-4c98-b395-261b2567b88d.jpg'
  },
  {
    id: 'sale',
    title: 'АКЦИЯ АКБ',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/f7cd35ed-79eb-497a-84d0-ff3821d50efc.jpg'
  },
  {
    id: 'generators',
    title: 'БЕНЗОГЕНЕРАТОРЫ',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/27d11bf1-b052-4260-93a2-f048bb1a9c24.jpg'
  },
  {
    id: 'chainsaws',
    title: 'БЕНЗОПИЛЫ',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/8685734c-05cc-4eb9-8c92-0bdb974c9578.jpg'
  },
  {
    id: 'chargers',
    title: 'ЗАРЯДНЫЕ УСТРОЙСТВА',
    image: 'https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/291ce176-5bb2-405c-a102-8af82240c18a.jpg',
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