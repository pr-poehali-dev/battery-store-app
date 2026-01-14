import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

interface ProductCardProps {
  product: Product;
  getCategoryBadge: (category: string) => { icon: string; color: string; label: string };
  addToCart: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: number) => void;
  onView?: (productId: number) => void;
}

const getCountryFlag = (manufacturer: string): string => {
  const countryFlags: { [key: string]: string } = {
    'КНР': '🇨🇳',
    'Китай': '🇨🇳',
    'Южная Корея': '🇰🇷',
    'Корея': '🇰🇷',
    'Япония': '🇯🇵',
    'Россия': '🇷🇺',
    'РФ': '🇷🇺',
    'Германия': '🇩🇪',
    'США': '🇺🇸',
    'Турция': '🇹🇷',
    'Польша': '🇵🇱',
    'Чехия': '🇨🇿',
    'Италия': '🇮🇹',
    'Франция': '🇫🇷',
    'Испания': '🇪🇸'
  };

  for (const [country, flag] of Object.entries(countryFlags)) {
    if (manufacturer.includes(country)) {
      return flag;
    }
  }
  
  return '🌍';
};

const ProductCard = ({ product, getCategoryBadge, addToCart, isFavorite = false, onToggleFavorite, onView }: ProductCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
      onClick={() => onView?.(product.id)}
    >
      <div className="relative aspect-square bg-white flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 right-3 ${getCategoryBadge(product.category).color} border shadow-sm`}>
          <span className="mr-1">{getCategoryBadge(product.category).icon}</span>
          {getCategoryBadge(product.category).label}
        </Badge>
        {onToggleFavorite && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 left-3 bg-white/90 hover:bg-white shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
          >
            <Icon name="Heart" size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
          </Button>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
        <CardDescription className="text-base font-medium">{product.brand}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg border">
            <Icon name="Zap" size={16} className="mx-auto mb-1 text-primary" />
            <p className="font-bold text-base">{product.voltage}</p>
            <p className="text-muted-foreground text-[10px]">напряжение</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg border">
            <Icon name="Battery" size={16} className="mx-auto mb-1 text-primary" />
            <p className="font-bold text-base">{product.capacity}</p>
            <p className="text-muted-foreground text-[10px]">ёмкость</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg border">
            <Icon name="Gauge" size={16} className="mx-auto mb-1 text-primary" />
            <p className="font-bold text-base">{product.current}</p>
            <p className="text-muted-foreground text-[10px]">пусковой ток</p>
          </div>
        </div>

        {(product.manufacturer || product.bodyTypeJIS || product.bodyTypeEN || product.technology || product.polarity) && (
          <div className="flex flex-wrap gap-1">
            {product.manufacturer && (
              <Badge variant="outline" className="text-xs">
                {getCountryFlag(product.manufacturer)} {product.manufacturer}
              </Badge>
            )}
            {product.bodyTypeJIS && (
              <Badge variant="outline" className="text-xs">
                JIS: {product.bodyTypeJIS}
              </Badge>
            )}
            {product.bodyTypeEN && (
              <Badge variant="outline" className="text-xs">
                EN: {product.bodyTypeEN}
              </Badge>
            )}
            {product.technology && (
              <Badge variant="outline" className="text-xs">
                {product.technology}
              </Badge>
            )}
            {product.polarity && (
              <Badge variant="outline" className="text-xs">
                {product.polarity}
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Совместимость:</p>
          <div className="flex flex-wrap gap-1">
            {product.compatible.slice(0, 3).map((car, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {car}
              </Badge>
            ))}
            {product.compatible.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.compatible.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="space-y-1">
            {product.oldPrice && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</p>
                <Badge variant="destructive" className="text-xs">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </Badge>
              </div>
            )}
            <p className="text-3xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
          </div>
          <Button 
            className="w-full h-11 text-base font-semibold group-hover:shadow-lg transition-all"
            onClick={() => addToCart(product)}
          >
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;