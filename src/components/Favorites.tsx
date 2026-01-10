import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoritesProps {
  setActiveSection: (section: string) => void;
  addToCart: (id: number, name: string, price: number, image: string) => void;
}

export default function Favorites({ setActiveSection, addToCart }: FavoritesProps) {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Icon name="Heart" size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Избранное пусто</h2>
        <p className="text-muted-foreground text-center mb-6">
          Добавляйте товары в избранное, чтобы не потерять их
        </p>
        <Button onClick={() => setActiveSection('catalog')}>
          <Icon name="ShoppingBag" size={18} className="mr-2" />
          Перейти в каталог
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Избранное</h2>
        <Badge variant="secondary" className="text-base px-3 py-1">
          {favorites.length} {favorites.length === 1 ? 'товар' : 'товаров'}
        </Badge>
      </div>

      <div className="grid gap-4">
        {favorites.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-4 p-4">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-lg text-4xl">
                    {item.image}
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                    onClick={() => removeFavorite(item.id)}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => addToCart(item.id, item.name, item.price, item.image)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}