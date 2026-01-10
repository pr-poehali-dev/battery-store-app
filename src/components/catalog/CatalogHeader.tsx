import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CatalogHeaderProps {
  productsCount: number;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const CatalogHeader = ({ productsCount, sortBy, setSortBy }: CatalogHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold">Каталог товаров</h2>
        <Badge variant="secondary" className="text-base">
          {productsCount}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="ArrowUpDown" size={18} className="text-muted-foreground" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background text-sm font-medium min-w-[180px]"
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="capacity">Емкость: больше → меньше</option>
          <option value="name-asc">Название: A → Z</option>
          <option value="name-desc">Название: Z → A</option>
        </select>
      </div>
    </div>
  );
};

export default CatalogHeader;
