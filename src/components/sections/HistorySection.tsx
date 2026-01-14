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

interface HistorySectionProps {
  historyProducts: Product[];
  favorites: number[];
  getCategoryBadge: (category: string) => { icon: string; color: string; label: string };
  addToCart: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  onViewProduct: (productId: number) => void;
  onClearHistory: () => void;
}

const HistorySection = ({
  historyProducts,
  favorites,
  getCategoryBadge,
  addToCart,
  onToggleFavorite,
  onViewProduct,
  onClearHistory
}: HistorySectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="History" size={32} className="text-primary" />
          <div>
            <h2 className="text-2xl font-bold">История просмотров</h2>
            <p className="text-muted-foreground">
              {historyProducts.length > 0 
                ? `${historyProducts.length} ${historyProducts.length === 1 ? 'товар' : 'товаров'}`
                : 'История пуста'}
            </p>
          </div>
        </div>
        {historyProducts.length > 0 && (
          <Button variant="outline" size="sm" onClick={onClearHistory}>
            <Icon name="Trash2" size={16} className="mr-2" />
            Очистить
          </Button>
        )}
      </div>

      {historyProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyProducts.map((product) => (
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
            <Icon name="History" size={64} className="mx-auto text-muted-foreground" />
            <div>
              <p className="text-xl font-semibold">История просмотров пуста</p>
              <p className="text-muted-foreground mt-2">
                Просматривайте товары — они будут сохраняться здесь
              </p>
            </div>
          </div>
        </Card>
      )}

      <FooterInfo />
    </div>
  );
};

export default HistorySection;
