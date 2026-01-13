import { Product, Store, ServiceCenter } from '@/types';

export const products: Product[] = [];

export const brands = [
  'CARKU BATTERY',
  'DUO POWER',
  'FURUKAWA BATTERY',
  'GLADIATOR',
  'MUTLU',
  'RDRIVE',
  'ROCKET',
  'SEIWA',
  'SOLITE',
  'SPARK',
  'TITAN',
  'ARCTIC',
  'TOPLA',
  'TUBOR',
  'TUNGSTONE',
  'TYUMEN',
  'VARTA STURM',
  'VARTA',
  'VOLT',
  'ЗВЕРЬ'
];

export const manufacturers = [
  'Япония',
  'КНР',
  'Россия',
  'ЕС',
  'Турция',
  'Республика Корея'
];

export const bodyTypesJIS = [
  '31S-1000',
  'B19',
  'B20',
  'B24',
  'D23',
  'D26',
  'D31',
  'D33',
  'E41',
  'F51',
  'G51',
  'H52'
];

export const bodyTypesEN = [
  'L0',
  'L1',
  'L2',
  'L3',
  'L4',
  'L5',
  'L6',
  'LB1',
  'LB2',
  'LB3',
  'LB4'
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

export const compatibleCars = [
  'Toyota Camry',
  'Toyota Corolla',
  'Toyota RAV4',
  'Toyota Land Cruiser',
  'Toyota Prius',
  'Toyota Highlander',
  'Honda Accord',
  'Honda Civic',
  'Honda CR-V',
  'Honda Fit',
  'Nissan X-Trail',
  'Nissan Qashqai',
  'Nissan Tiida',
  'Nissan Almera',
  'Nissan Patrol',
  'Mazda 3',
  'Mazda 6',
  'Mazda CX-5',
  'Mazda CX-7',
  'Mitsubishi Outlander',
  'Mitsubishi Lancer',
  'Mitsubishi Pajero',
  'Mitsubishi ASX',
  'Subaru Forester',
  'Subaru Outback',
  'Subaru Impreza',
  'Subaru Legacy',
  'Suzuki Grand Vitara',
  'Suzuki Swift',
  'Suzuki SX4',
  'Lexus RX',
  'Lexus ES',
  'Lexus GX',
  'Lexus LX',
  'Hyundai Solaris',
  'Hyundai Creta',
  'Hyundai Tucson',
  'Hyundai Santa Fe',
  'Hyundai Elantra',
  'Kia Rio',
  'Kia Sportage',
  'Kia Sorento',
  'Kia Cerato',
  'Kia Soul',
  'Chevrolet Cruze',
  'Chevrolet Aveo',
  'Chevrolet Lacetti',
  'Chevrolet Captiva',
  'Ford Focus',
  'Ford Mondeo',
  'Ford Fiesta',
  'Ford Kuga',
  'Volkswagen Polo',
  'Volkswagen Tiguan',
  'Volkswagen Passat',
  'Volkswagen Golf',
  'Volkswagen Jetta',
  'Mercedes-Benz E-Class',
  'Mercedes-Benz C-Class',
  'Mercedes-Benz GLE',
  'Mercedes-Benz GLC',
  'BMW 3 Series',
  'BMW 5 Series',
  'BMW X5',
  'BMW X3',
  'Audi A4',
  'Audi A6',
  'Audi Q5',
  'Audi Q7',
  'Skoda Octavia',
  'Skoda Rapid',
  'Skoda Kodiaq',
  'Skoda Yeti',
  'Renault Logan',
  'Renault Duster',
  'Renault Sandero',
  'Renault Kaptur',
  'Peugeot 308',
  'Peugeot 408',
  'Peugeot 3008',
  'Citroen C4',
  'Citroen C5',
  'Lada Granta',
  'Lada Vesta',
  'Lada Largus',
  'Lada 4x4 (Нива)',
  'Lada Kalina',
  'Lada Priora',
  'УАЗ Patriot',
  'УАЗ Hunter',
  'УАЗ Pickup',
  'ГАЗ 3110 (Волга)',
  'ГАЗ Соболь',
  'ГАЗель',
  'Универсальное'
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