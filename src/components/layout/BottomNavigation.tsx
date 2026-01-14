import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BottomNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartItemsCount: number;
}

const BottomNavigation = ({ 
  activeSection, 
  setActiveSection, 
  cartItemsCount 
}: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          <Button
            variant={activeSection === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('home')}
            className="flex flex-col h-auto py-2 px-2"
          >
            <Icon name="Home" size={18} />
            <span className="text-xs mt-1">Главная</span>
          </Button>
          <Button
            variant={activeSection === 'catalog' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('catalog')}
            className="flex flex-col h-auto py-2 px-2"
          >
            <Icon name="ShoppingBag" size={18} />
            <span className="text-xs mt-1">Каталог</span>
          </Button>
          <Button
            variant={activeSection === 'cart' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('cart')}
            className="flex flex-col h-auto py-2 px-2 relative"
          >
            <Icon name="ShoppingCart" size={18} />
            <span className="text-xs mt-1">Корзина</span>
            {cartItemsCount > 0 && (
              <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeSection === 'stores' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('stores')}
            className="flex flex-col h-auto py-2 px-2"
          >
            <Icon name="MapPin" size={18} />
            <span className="text-xs mt-1">Магазины</span>
          </Button>
          <Button
            variant={activeSection === 'contacts' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('contacts')}
            className="flex flex-col h-auto py-2 px-2"
          >
            <Icon name="Phone" size={18} />
            <span className="text-xs mt-1">Контакты</span>
          </Button>
          <Button
            variant={activeSection === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('profile')}
            className="flex flex-col h-auto py-2 px-2"
          >
            <Icon name="User" size={18} />
            <span className="text-xs mt-1">Профиль</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
