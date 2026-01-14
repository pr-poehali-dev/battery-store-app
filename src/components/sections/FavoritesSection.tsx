import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/catalog/ProductCard';
import FooterInfo from '@/components/ui/FooterInfo';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  voltage: string;
  capacity: string;
  current: string;
  category: string;
  compatible: string[];
  image: string;
  manufacturer?: string;
  bodyTypeJIS?: string;
  bodyTypeEN?: string;
  technology?: string;
  polarity?: string;
}

interface FavoritesSectionProps {
  favoriteProducts: Product[];
  favorites: number[];
  getCategoryBadge: (category: string) => { icon: string; color: string; label: string };
  addToCart: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  onViewProduct: (productId: number) => void;
}

const FavoritesSection = ({
  favoriteProducts,
  favorites,
  getCategoryBadge,
  addToCart,
  onToggleFavorite,
  onViewProduct
}: FavoritesSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Icon name="Heart" size={32} className="text-red-500" />
        <div>
          <h2 className="text-2xl font-bold">Избранное</h2>
          <p className="text-muted-foreground">
            {favoriteProducts.length > 0 
              ? `${favoriteProducts.length} ${favoriteProducts.length === 1 ? 'товар' : 'товара'}`
              : 'Нет избранных товаров'}
          </p>
        </div>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              getCategoryBadge={getCategoryBadge}
              addToCart={addToCart}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onView={onViewProduct}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <Icon name="Heart" size={64} className="mx-auto text-muted-foreground" />
            <div>
              <p className="text-xl font-semibold">Избранное пусто</p>
              <p className="text-muted-foreground mt-2">
                Добавляйте понравившиеся товары, нажимая на иконку ❤️
              </p>
            </div>
          </div>
        </Card>
      )}

      <FooterInfo />
    </div>
  );
};

export default FavoritesSection;
