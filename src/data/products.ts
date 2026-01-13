import { Product, Store, ServiceCenter } from '@/types';

export const products: Product[] = [];

export const brands = [
  'Varta',
  'Mutlu',
  'Titan',
  'Volt',
  'Solite',
  'Rocket',
  'FB',
  'ZV',
  'Arctic',
  'Tubor',
  'Duo',
  'SPAA',
  'Carku',
  'Upro',
  'Atlas'
];

export const technologies = [
  'EFB',
  'Кальциевая',
  'AGM'
];

export const polarities = [
  'Прямая',
  'Обратная'
];

export const stores: Store[] = [
  { name: 'Павловича, 26', address: 'ул. Павловича, 26', phone: '+7 (4212) 45-41-41' },
  { name: 'Павловича, 11', address: 'ул. Павловича, 11', phone: '+7 (4212) 45-99-99' },
  { name: 'Краснореченская, 149', address: 'ул. Краснореченская, 149', phone: '+7 (4212) 47-41-41' },
  { name: 'Воронежская, 66', address: 'ул. Воронежская, 66', phone: '+7 (4212) 28-41-41' },
  { name: 'Суворова, 73а/2', address: 'ул. Суворова, 73а/2', phone: '+7 (4212) 97-41-41' },
  { name: 'Пр. 60-летия Октября, 154', address: 'Проспект 60-летия Октября, 154', phone: '+7 (4212) 28-45-45' }
];

export const serviceCenter: ServiceCenter = {
  name: 'Сервисный центр',
  address: 'ул. Павловича, 11/2',
  description: 'Обслуживание аккумуляторных батарей'
};
