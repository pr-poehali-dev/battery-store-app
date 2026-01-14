import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface SideMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  favoritesCount: number;
}

const SideMenu = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  activeSection, 
  setActiveSection, 
  favoritesCount 
}: SideMenuProps) => {
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-[#3D6B8C] text-white border-r-0 animate-slide-in-left">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-3 text-white">
            <span className="text-3xl">🍃</span>
            <span className="text-xl italic">Мир Аккумуляторов</span>
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'home' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('home')}
          >
            <Icon name="Home" size={20} className="mr-3" />
            Главная
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'catalog' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('catalog')}
          >
            <Icon name="ShoppingBag" size={20} className="mr-3" />
            Каталог
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'favorites' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('favorites')}
          >
            <Icon name="Heart" size={20} className="mr-3" />
            Избранное
            {favoritesCount > 0 && (
              <Badge className="ml-auto">{favoritesCount}</Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'history' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('history')}
          >
            <Icon name="History" size={20} className="mr-3" />
            История просмотров
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'stores' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('stores')}
          >
            <Icon name="MapPin" size={20} className="mr-3" />
            Магазины
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'promotions' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('promotions')}
          >
            <Icon name="Sparkles" size={20} className="mr-3" />
            Акции
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'warranty' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('warranty')}
          >
            <Icon name="Shield" size={20} className="mr-3" />
            Гарантия
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'blog' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('blog')}
          >
            <Icon name="BookOpen" size={20} className="mr-3" />
            Блог
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'about' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('about')}
          >
            <Icon name="Info" size={20} className="mr-3" />
            О компании
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'contacts' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('contacts')}
          >
            <Icon name="Phone" size={20} className="mr-3" />
            Контакты
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
              activeSection === 'profile' ? 'bg-white/20 shadow-md' : ''
            }`}
            onClick={() => handleNavigation('profile')}
          >
            <Icon name="User" size={20} className="mr-3" />
            Профиль
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
