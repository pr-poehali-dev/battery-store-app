import { User } from '@/types';

export interface LoyaltyLevel {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
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
    id: 'bronze',
    name: 'Бронза',
    icon: '🥉',
    color: 'bg-amber-700/10',
    bgGradient: 'from-amber-700/20 to-amber-600/10',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-700/30',
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
    minSpent: 50000,
    cashbackPercent: 5,
    benefits: [
      'Кэшбек 5% от покупок',
      'Расширенная гарантия +6 мес',
      'Приоритетная консультация',
      'Скидка на услуги сервиса 10%'
    ]
  },
  {
    id: 'gold',
    name: 'Золото',
    icon: '🥇',
    color: 'bg-yellow-500/10',
    bgGradient: 'from-yellow-500/20 to-yellow-400/10',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-500/30',
    minSpent: 150000,
    cashbackPercent: 7,
    benefits: [
      'Кэшбек 7% от покупок',
      'Расширенная гарантия +12 мес',
      'Персональный менеджер',
      'Скидка на услуги сервиса 20%',
      'Бесплатная установка аккумулятора',
      'Доступ к эксклюзивным товарам'
    ]
  },
  {
    id: 'platinum',
    name: 'Платина',
    icon: '💎',
    color: 'bg-purple-500/10',
    bgGradient: 'from-purple-500/20 to-purple-400/10',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-500/30',
    minSpent: 300000,
    cashbackPercent: 10,
    benefits: [
      'Кэшбек 10% от покупок',
      'Пожизненная гарантия',
      'VIP-поддержка 24/7',
      'Скидка на услуги сервиса 30%',
      'Бесплатная доставка и установка',
      'Доступ к VIP-акциям',
      'Подарки на день рождения',
      'Эвакуатор при разряде батареи'
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
