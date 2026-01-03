import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  voltage: string;
  capacity: string;
  current: string;
  category: string;
  compatible: string[];
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  name: string;
  address: string;
}

interface CartSectionProps {
  cart: CartItem[];
  cartTotal: number;
  cartCashback: number;
  cartItemsCount: number;
  selectedStore: string;
  setSelectedStore: (value: string) => void;
  stores: Store[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  setActiveSection: (section: string) => void;
}

const CartSection = ({
  cart,
  cartTotal,
  cartCashback,
  cartItemsCount,
  selectedStore,
  setSelectedStore,
  stores,
  removeFromCart,
  updateQuantity,
  setActiveSection
}: CartSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Корзина</h2>
        {cartItemsCount > 0 && (
          <Badge variant="secondary" className="text-base">
            {cartItemsCount} товаров
          </Badge>
        )}
      </div>

      {cart.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">
              Добавьте товары из каталога
            </p>
            <Button onClick={() => setActiveSection('catalog')}>
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Перейти в каталог
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <Card key={item.product.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl flex-shrink-0">{item.product.image}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{item.product.voltage}</Badge>
                            <Badge variant="outline" className="text-xs">{item.product.capacity}</Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Icon name="Trash2" size={18} className="text-destructive" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            {(item.product.price * item.quantity).toLocaleString()} ₽
                          </div>
                          <div className="text-xs text-green-600">
                            +{Math.floor(item.product.price * item.quantity * 0.03)} ₽ кэшбек
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={24} className="text-amber-600" />
                <CardTitle className="text-xl">Самовывоз из магазина</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Выберите магазин для получения заказа:</p>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background text-sm"
              >
                <option value="">Выберите магазин...</option>
                {stores.map((store, index) => (
                  <option key={index} value={store.address}>
                    {store.name} — {store.address}
                  </option>
                ))}
              </select>
              {selectedStore && (
                <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Icon name="CheckCircle" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-600 font-medium">{selectedStore}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Итого</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span>Товары ({cartItemsCount})</span>
                <span className="font-semibold">{cartTotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between items-center text-lg border-t pt-4">
                <span className="font-semibold">Начислим кэшбек (3%)</span>
                <Badge variant="secondary" className="text-lg py-1 px-3">
                  +{cartCashback.toLocaleString()} ₽
                </Badge>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Wallet" size={20} className="text-blue-600" />
                  <p className="font-semibold text-blue-600">Оплата при получении</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Вы оплачиваете заказ наличными или картой при самовывозе в магазине
                </p>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                <span>К оплате</span>
                <span className="text-primary">{cartTotal.toLocaleString()} ₽</span>
              </div>
              <Button
                size="lg"
                className="w-full text-lg"
                disabled={!selectedStore}
                onClick={() => {
                  const message = `Здравствуйте! Хочу оформить заказ:\n\nТовары:\n${cart.map(item => `${item.product.name} — ${item.quantity} шт. × ${item.product.price} ₽`).join('\n')}\n\nИтого: ${cartTotal.toLocaleString()} ₽\nКэшбек: +${cartCashback} ₽\n\nМагазин для самовывоза:\n${selectedStore}\n\nОплата при получении`;
                  window.open(`https://t.me/nobodystillhere?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Оформить заказ
              </Button>
              {!selectedStore && (
                <p className="text-sm text-amber-600 text-center">
                  ⚠️ Выберите магазин для самовывоза
                </p>
              )}
              <p className="text-sm text-muted-foreground text-center">
                Менеджер уточнит наличие и подтвердит заказ
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CartSection;
