import { User } from '@/types';

export interface LoyaltyLevel {
  id: 'base' | 'silver';
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  minPurchases: number;
  discountPercent: number;
  cashbackPercent: number;
  benefits: string[];
}

export const loyaltyLevels: LoyaltyLevel[] = [
  {
    id: 'base',
    name: 'Базовый',
    icon: '🔋',
    color: 'bg-blue-500/10',
    bgGradient: 'from-blue-500/20 to-blue-400/10',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500/30',
    minPurchases: 0,
    discountPercent: 0,
    cashbackPercent: 0,
    benefits: [
      'Базовая гарантия',
      'Доступ к акциям'
    ]
  },
  {
    id: 'silver',
    name: 'Постоянный клиент',
    icon: '⭐',
    color: 'bg-green-500/10',
    bgGradient: 'from-green-500/20 to-green-400/10',
    textColor: 'text-green-600',
    borderColor: 'border-green-500/30',
    minPurchases: 1,
    discountPercent: 5,
    cashbackPercent: 0,
    benefits: [
      'Скидка 5% на все покупки',
      'Приоритетная консультация',
      'Доступ к эксклюзивным акциям'
    ]
  }
];

export const getUserLevel = (user: User): LoyaltyLevel => {
  const purchaseCount = user.purchaseCount || 0;
  
  for (let i = loyaltyLevels.length - 1; i >= 0; i--) {
    if (purchaseCount >= loyaltyLevels[i].minPurchases) {
      return loyaltyLevels[i];
    }
  }
  
  return loyaltyLevels[0];
};

export const getNextLevel = (user: User): LoyaltyLevel | null => {
  const currentLevel = getUserLevel(user);
  const currentIndex = loyaltyLevels.findIndex(l => l.id === currentLevel.id);
  
  if (currentIndex < loyaltyLevels.length - 1) {
    return loyaltyLevels[currentIndex + 1];
  }
  
  return null;
};

export const getProgressToNextLevel = (user: User): number => {
  const purchaseCount = user.purchaseCount || 0;
  const currentLevel = getUserLevel(user);
  const nextLevel = getNextLevel(user);
  
  if (!nextLevel) {
    return 100;
  }
  
  const currentMin = currentLevel.minPurchases;
  const nextMin = nextLevel.minPurchases;
  const progress = ((purchaseCount - currentMin) / (nextMin - currentMin)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
};

export const getAmountToNextLevel = (user: User): number => {
  const purchaseCount = user.purchaseCount || 0;
  const nextLevel = getNextLevel(user);
  
  if (!nextLevel) {
    return 0;
  }
  
  return Math.max(nextLevel.minPurchases - purchaseCount, 0);
};