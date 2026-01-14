import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AppHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  theme: string;
  toggleTheme: () => void;
  cartItemsCount: number;
  setActiveSection: (section: string) => void;
}

const AppHeader = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  theme, 
  toggleTheme, 
  cartItemsCount, 
  setActiveSection 
}: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-[#3D6B8C] shadow-lg relative">
      <div className="container mx-auto px-4 py-6 relative">
        <div className="flex items-center justify-between">
          <button 
            className={`text-white p-2 hover:bg-white/10 rounded transition-all duration-300 relative group ${
              isMenuOpen ? 'menu-burger-open' : ''
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1.5">
              <div className="w-8 h-0.5 bg-white menu-burger-line"></div>
              <div className="w-8 h-0.5 bg-white menu-burger-line"></div>
              <div className="w-8 h-0.5 bg-white menu-burger-line"></div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded shadow-lg">
                Больше разделов
              </span>
            </div>
          </button>
          <div className="flex items-center gap-3 flex-1 justify-center">
            <img 
              src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/b0d6cc27-e22a-4472-aad9-4350954d6d7f.jpg" 
              alt="Мир Аккумуляторов"
              className="w-11 h-11 object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-white italic">Мир Аккумуляторов</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:bg-white/10"
              title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={22} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection('cart')}
              className="relative text-white hover:bg-white/10"
            >
              <Icon name="ShoppingCart" size={22} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
