import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface StoreCardProps {
  store: Store;
  isSelected: boolean;
  isNearest: boolean;
  onSelect: () => void;
  onCall: (phone: string) => void;
  onBuildRoute: (coords: [number, number], dgisUrl?: string) => void;
}

const storeImages: Record<number, string[]> = {
  1: [
    'https://cdn.poehali.dev/files/IMG_0834.jpeg',
    'https://cdn.poehali.dev/files/IMG_0835.jpeg'
  ],
  2: [
    'https://cdn.poehali.dev/files/IMG_0838.jpeg',
    'https://cdn.poehali.dev/files/IMG_0839.jpeg'
  ],
  3: [
    'https://cdn.poehali.dev/files/IMG_0847.jpeg',
    'https://cdn.poehali.dev/files/IMG_0848.jpeg'
  ],
  4: [
    'https://cdn.poehali.dev/files/IMG_0843.jpeg',
    'https://cdn.poehali.dev/files/IMG_0844.jpeg'
  ],
  5: [
    'https://cdn.poehali.dev/files/IMG_0851.jpeg',
    'https://cdn.poehali.dev/files/IMG_0852.jpeg'
  ],
  6: [
    'https://cdn.poehali.dev/files/IMG_0855.jpeg',
    'https://cdn.poehali.dev/files/IMG_0856.jpeg'
  ]
};

const StoreCard = ({ store, isSelected, isNearest, onSelect, onCall, onBuildRoute }: StoreCardProps) => {
  const averageRating = store.reviews && store.reviews.length > 0
    ? (store.reviews.reduce((sum, review) => sum + review.rating, 0) / store.reviews.length).toFixed(1)
    : null;

  return (
    <Card 
      className={`transition-all hover:shadow-lg cursor-pointer ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : ''
      } ${isNearest ? 'bg-primary/5' : ''}`}
      onClick={onSelect}
    >
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Store" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  {isNearest && (
                    <Badge className="bg-green-500">Ближайший</Badge>
                  )}
                  {averageRating && (
                    <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                      <Icon name="Star" size={12} className="mr-1 text-amber-500 fill-amber-500" />
                      {averageRating}
                    </Badge>
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
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} className="flex-shrink-0" />
                  <span>{store.workHours}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge variant="secondary" className="flex-shrink-0">
                #{store.id}
              </Badge>
              {!isSelected && (
                <div className="flex flex-col items-center text-primary animate-bounce">
                  <Icon name="ChevronDown" size={20} />
                  <span className="text-xs">Подробнее</span>
                </div>
              )}
            </div>
          </div>

          {isSelected && storeImages[store.id] && (
            <div className="space-y-3 pt-3 border-t animate-slide-up">
              <div className="grid grid-cols-2 gap-2">
                {storeImages[store.id].map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${store.name} - фото ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>

              {store.reviews && store.reviews.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="MessageSquare" size={18} className="text-amber-600" />
                    <h4 className="font-semibold text-sm">Отзывы с 2ГИС</h4>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {store.reviews.map((review, index) => (
                      <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-2.5 border border-amber-100">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-sm">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i}
                                name={i < review.rating ? "Star" : "Star"} 
                                size={12} 
                                className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCall(store.phone);
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
                    onBuildRoute(store.coords, store.dgisUrl);
                  }}
                  className="w-full"
                >
                  <Icon name="Map" size={16} className="mr-2" />
                  2ГИС
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;