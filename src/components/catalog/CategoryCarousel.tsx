import { useState } from 'react';
import { Card } from '@/components/ui/card';
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
    id: 'generators',
    title: 'БЕНЗОГЕНЕРАТОРЫ',
    image: 'https://cdn.poehali.dev/files/IMG_0942.jpeg'
  },
  {
    id: 'chainsaws',
    title: 'БЕНЗОПИЛЫ',
    image: 'https://cdn.poehali.dev/files/IMG_0942.jpeg'
  }
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2 >= categories.length ? 0 : prev + 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, categories.length - 2) : prev - 2));
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + 2);
  
  if (visibleCategories.length === 1) {
    visibleCategories.push(categories[0]);
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Button
          onClick={prevSlide}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-xl"
          size="icon"
        >
          <Icon name="ChevronLeft" size={24} />
        </Button>

        <div className="grid md:grid-cols-2 gap-4 px-14 md:px-20">
          {visibleCategories.map((category, idx) => (
            <Card
              key={`${category.id}-${idx}`}
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-2"
            >
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <h3 className="text-base md:text-xl font-bold text-gray-900 min-h-[3rem] md:min-h-[3.5rem] leading-tight">
                  {category.title}
                </h3>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-contain p-2 md:p-4"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button
          onClick={nextSlide}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-xl"
          size="icon"
        >
          <Icon name="ChevronRight" size={24} />
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx * 2)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 2) === idx
                ? 'bg-primary w-8'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
