import { Product, Store, ServiceCenter } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'ZVEFBA 80-З-R (85D23L)',
    brand: 'ZV',
    price: 9750,
    voltage: '12V',
    capacity: '80Ah',
    current: '680A',
    category: 'Азиатские',
    compatible: ['Toyota Camry', 'Honda Accord', 'Mazda 6', 'Nissan Teana'],
    image: '🔋'
  },
  {
    id: 2,
    name: 'ZVК 100-З-R',
    brand: 'ZV',
    price: 13150,
    voltage: '12V',
    capacity: '100Ah',
    current: '850A',
    category: 'Грузовые',
    compatible: ['Toyota Land Cruiser', 'Nissan Patrol', 'Mitsubishi Pajero', 'УАЗ Патриот'],
    image: '⚡'
  },
  {
    id: 3,
    name: 'ZVKА 58-З-R (75B24L)',
    brand: 'ZV',
    price: 6450,
    voltage: '12V',
    capacity: '58Ah',
    current: '520A',
    category: 'Азиатские',
    compatible: ['Toyota Corolla', 'Honda Civic', 'Mazda 3', 'Suzuki Swift'],
    image: '🔋'
  },
  {
    id: 4,
    name: 'ZVEFB 60-З-R',
    brand: 'ZV',
    price: 9050,
    voltage: '12V',
    capacity: '60Ah',
    current: '560A',
    category: 'EFB',
    compatible: ['Volkswagen Polo', 'Skoda Rapid', 'Toyota Corolla', 'Hyundai Solaris'],
    image: '🔌'
  },
  {
    id: 5,
    name: 'DUOPА 50-З-R-k (60B24L)',
    brand: 'Duo',
    price: 5500,
    voltage: '12V',
    capacity: '50Ah',
    current: '480A',
    category: 'Азиатские',
    compatible: ['Nissan Note', 'Mazda Demio', 'Honda Fit', 'Suzuki SX4'],
    image: '🔋'
  },
  {
    id: 6,
    name: 'ARCTIC ASIA 6CT-65.0 VL',
    brand: 'Arctic',
    price: 11300,
    voltage: '12V',
    capacity: '65Ah',
    current: '640A',
    category: 'Азиатские премиум',
    compatible: ['Toyota RAV4', 'Nissan X-Trail', 'Mazda CX-5', 'Subaru Forester'],
    image: '❄️'
  },
  {
    id: 7,
    name: 'Rocket SMF 65Ah (75D23L)',
    brand: 'Rocket',
    price: 8650,
    voltage: '12V',
    capacity: '65Ah',
    current: '580A',
    category: 'Азиатские',
    compatible: ['Toyota Camry', 'Honda CR-V', 'Nissan Murano', 'Mazda 6'],
    image: '🚀'
  },
  {
    id: 8,
    name: 'Varta Blue Dynamic D59 60Ah',
    brand: 'Varta',
    price: 8990,
    voltage: '12V',
    capacity: '60Ah',
    current: '540A',
    category: 'Европейские',
    compatible: ['Volkswagen Polo', 'Ford Focus', 'Renault Logan', 'Chevrolet Cruze'],
    image: '🔵'
  },
  {
    id: 9,
    name: 'Mutlu Calcium Silver 75Ah',
    brand: 'Mutlu',
    price: 9850,
    voltage: '12V',
    capacity: '75Ah',
    current: '720A',
    category: 'Европейские',
    compatible: ['Volkswagen Tiguan', 'Kia Sportage', 'Hyundai Tucson', 'Skoda Octavia'],
    image: '⚡'
  },
  {
    id: 10,
    name: 'Titan Arctic 62Ah',
    brand: 'Titan',
    price: 7450,
    voltage: '12V',
    capacity: '62Ah',
    current: '620A',
    category: 'Российские',
    compatible: ['Lada Vesta', 'Lada Granta', 'Renault Duster', 'Hyundai Solaris'],
    image: '🔋'
  },
  {
    id: 11,
    name: 'Titan Euro Silver 76Ah',
    brand: 'Titan',
    price: 8950,
    voltage: '12V',
    capacity: '76Ah',
    current: '760A',
    category: 'Европейские',
    compatible: ['Volkswagen Passat', 'BMW 3-Series', 'Audi A4', 'Mercedes C-Class'],
    image: '⚡'
  },
  {
    id: 12,
    name: 'Solite 85Ah (105D31L)',
    brand: 'Solite',
    price: 10900,
    voltage: '12V',
    capacity: '85Ah',
    current: '750A',
    category: 'Азиатские',
    compatible: ['Toyota Land Cruiser Prado', 'Mitsubishi Pajero Sport', 'Nissan Pathfinder'],
    image: '⚡'
  },
  {
    id: 13,
    name: 'FB 7000 55B24L 50Ah',
    brand: 'FB',
    price: 6200,
    voltage: '12V',
    capacity: '50Ah',
    current: '470A',
    category: 'Азиатские',
    compatible: ['Toyota Corolla', 'Honda Civic', 'Nissan Tiida', 'Mazda 3'],
    image: '🔋'
  },
  {
    id: 14,
    name: 'Tubor Aquatech 90Ah',
    brand: 'Tubor',
    price: 9990,
    voltage: '12V',
    capacity: '90Ah',
    current: '850A',
    category: 'Европейские',
    compatible: ['BMW X5', 'Audi Q7', 'Mercedes GLE', 'Volkswagen Touareg'],
    image: '💧'
  },
  {
    id: 15,
    name: 'Volt Standard 55Ah',
    brand: 'Volt',
    price: 5990,
    voltage: '12V',
    capacity: '55Ah',
    current: '460A',
    category: 'Российские',
    compatible: ['Lada Kalina', 'Lada Priora', 'Chevrolet Niva', 'Daewoo Nexia'],
    image: '🔋'
  },
  {
    id: 16,
    name: 'Varta Silver Dynamic AGM 70Ah',
    brand: 'Varta',
    price: 18900,
    voltage: '12V',
    capacity: '70Ah',
    current: '760A',
    category: 'AGM',
    compatible: ['BMW X3', 'Audi Q5', 'Mercedes GLC', 'Porsche Macan'],
    image: '⚡'
  },
  {
    id: 17,
    name: 'Mutlu EFB 80Ah',
    brand: 'Mutlu',
    price: 12900,
    voltage: '12V',
    capacity: '80Ah',
    current: '800A',
    category: 'EFB',
    compatible: ['Volkswagen Passat', 'Skoda Superb', 'BMW 3-Series', 'Audi A4'],
    image: '🔌'
  },
  {
    id: 18,
    name: 'Аком 60Ah',
    brand: 'Аком',
    price: 6850,
    voltage: '12V',
    capacity: '60Ah',
    current: '520A',
    category: 'Российские',
    compatible: ['Lada Vesta', 'Renault Logan', 'Hyundai Solaris', 'Kia Rio'],
    image: '🔋'
  },
  {
    id: 19,
    name: 'Tyumen Battery 64Ah',
    brand: 'Tyumen',
    price: 7200,
    voltage: '12V',
    capacity: '64Ah',
    current: '590A',
    category: 'Российские',
    compatible: ['УАЗ Патриот', 'Chevrolet Niva', 'Lada 4x4', 'Газель'],
    image: '🔋'
  },
  {
    id: 20,
    name: 'Bosch S4 005 60Ah',
    brand: 'Bosch',
    price: 9500,
    voltage: '12V',
    capacity: '60Ah',
    current: '540A',
    category: 'Европейские',
    compatible: ['Volkswagen Golf', 'Ford Focus', 'Opel Astra', 'Peugeot 308'],
    image: '🔵'
  },
  {
    id: 21,
    name: 'Carku X4 Пусковое устройство',
    brand: 'Carku',
    price: 8990,
    voltage: '12V',
    capacity: '12000mAh',
    current: '600A',
    category: 'Пусковые устройства',
    compatible: ['Универсальное'],
    image: '🔧'
  },
  {
    id: 22,
    name: 'Vtoman Jump 600',
    brand: 'Vtoman',
    price: 12990,
    voltage: '12V',
    capacity: '15000mAh',
    current: '800A',
    category: 'Пусковые устройства',
    compatible: ['Универсальное'],
    image: '🔧'
  },
  {
    id: 23,
    name: 'R drive One Зарядное',
    brand: 'R drive',
    price: 5490,
    voltage: '12V/24V',
    capacity: '—',
    current: '10A',
    category: 'Зарядные устройства',
    compatible: ['Универсальное'],
    image: '🔌'
  }
];

export const brands = [
  'ZV', 'Duo', 'Arctic', 'Rocket', 'Varta', 'Mutlu', 
  'Titan', 'Solite', 'FB', 'Tubor', 'Volt', 'Аком', 
  'Tyumen', 'Bosch', 'Carku', 'Vtoman', 'R drive'
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