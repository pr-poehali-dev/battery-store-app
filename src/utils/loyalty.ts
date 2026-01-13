import { User } from '@/types';

export interface LoyaltyLevel {
  id: 'base' | 'silver';
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  minSpent: number;
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
    minSpent: 0,
    cashbackPercent: 3,
    benefits: [
      'Кэшбек 3% от покупок',
      'Базовая гарантия',
      'Доступ к акциям'
    ]
  },
  {
    id: 'silver',
    name: 'Серебро',
    icon: '🥈',
    color: 'bg-slate-400/10',
    bgGradient: 'from-slate-400/20 to-slate-300/10',
    textColor: 'text-slate-600',
    borderColor: 'border-slate-400/30',
    minSpent: 30000,
    cashbackPercent: 5,
    benefits: [
      'Кэшбек 5% от покупок',
      'Приоритетная консультация'
    ]
  }
];

export const getUserLevel = (user: User): LoyaltyLevel => {
  const totalSpent = user.totalSpent || 0;
  
  for (let i = loyaltyLevels.length - 1; i >= 0; i--) {
    if (totalSpent >= loyaltyLevels[i].minSpent) {
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
  const totalSpent = user.totalSpent || 0;
  const currentLevel = getUserLevel(user);
  const nextLevel = getNextLevel(user);
  
  if (!nextLevel) {
    return 100;
  }
  
  const currentMin = currentLevel.minSpent;
  const nextMin = nextLevel.minSpent;
  const progress = ((totalSpent - currentMin) / (nextMin - currentMin)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
};

export const getAmountToNextLevel = (user: User): number => {
  const totalSpent = user.totalSpent || 0;
  const nextLevel = getNextLevel(user);
  
  if (!nextLevel) {
    return 0;
  }
  
  return Math.max(nextLevel.minSpent - totalSpent, 0);
};