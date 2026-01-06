import { Product, Store, ServiceCenter } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Аккумуляторная батарея SPAA 90-З-R (105D31L)',
    brand: 'SPARK',
    price: 2300,
    voltage: '12В',
    capacity: '90Ач',
    current: '850А',
    category: 'Автомобильные',
    compatible: ['Toyota', 'Nissan', 'Mitsubishi'],
    image: 'https://miraccum.ru/1c/import_files/8e/8ea0f41c2b0111ec9452049226bf29c1_ccef5e4e2cb211ec9452049226bf29c1.png'
  },
  {
    id: 2,
    name: 'Аккумулятор VOLT Classic 6CT-60 N',
    brand: 'VOLT',
    price: 4850,
    voltage: '12В',
    capacity: '60Ач',
    current: '480А',
    category: 'Автомобильные',
    compatible: ['Lada', 'Renault', 'Hyundai', 'Kia'],
    image: 'https://miraccum.ru/1c/import_files/52/52f5a4abaf2711e89437902b345a2634_52f5a4acaf2711e89437902b345a2634.jpg'
  },
  {
    id: 3,
    name: 'Аккумулятор VOLT CLASSIC 6CT-62 N',
    brand: 'VOLT',
    price: 5250,
    voltage: '12В',
    capacity: '62Ач',
    current: '540А',
    category: 'Автомобильные',
    compatible: ['Lada', 'UAZ', 'Chevrolet'],
    image: 'https://miraccum.ru/1c/import_files/52/52f5a4abaf2711e89437902b345a2634_52f5a4acaf2711e89437902b345a2634.jpg'
  },
  {
    id: 4,
    name: 'Аккумулятор VOLT CLASSIC 6CT-66 N',
    brand: 'VOLT',
    price: 5550,
    voltage: '12В',
    capacity: '66Ач',
    current: '590А',
    category: 'Автомобильные',
    compatible: ['Volkswagen', 'Ford', 'Mazda'],
    image: 'https://miraccum.ru/1c/import_files/52/52f5a4abaf2711e89437902b345a2634_52f5a4acaf2711e89437902b345a2634.jpg'
  },
  {
    id: 5,
    name: 'Аккумулятор VOLT CLASSIC 6CT-75 N',
    brand: 'VOLT',
    price: 6250,
    voltage: '12В',
    capacity: '75Ач',
    current: '650А',
    category: 'Автомобильные',
    compatible: ['Toyota', 'Honda', 'Nissan'],
    image: 'https://miraccum.ru/1c/import_files/52/52f5a4abaf2711e89437902b345a2634_52f5a4acaf2711e89437902b345a2634.jpg'
  },
  {
    id: 6,
    name: 'Аккумулятор VOLT CLASSIC 6CT-90 N',
    brand: 'VOLT',
    price: 7350,
    voltage: '12В',
    capacity: '90Ач',
    current: '760А',
    category: 'Автомобильные',
    compatible: ['Land Cruiser', 'Patrol', 'Pajero'],
    image: 'https://miraccum.ru/1c/import_files/52/52f5a4abaf2711e89437902b345a2634_52f5a4acaf2711e89437902b345a2634.jpg'
  },
  {
    id: 7,
    name: 'Аккумулятор VOLT CLASSIC 6CT-55 N',
    brand: 'VOLT',
    price: 4450,
    voltage: '12В',
    capacity: '55Ач',
    current: '460А',
    category: 'Автомобильные',
    compatible: ['Kalina', 'Priora', 'Granta'],
    image: 'https://miraccum.ru/1c/import_files/52/52f5a4abaf2711e89437902b345a2634_52f5a4acaf2711e89437902b345a2634.jpg'
  },
  {
    id: 8,
    name: 'Аккумулятор SOLITE Silver 110D26L',
    brand: 'SOLITE',
    price: 8950,
    voltage: '12В',
    capacity: '85Ач',
    current: '750А',
    category: 'Автомобильные',
    compatible: ['Toyota', 'Honda', 'Mazda', 'Nissan'],
    image: 'https://miraccum.ru/1c/import_files/solite.png'
  },
  {
    id: 9,
    name: 'Аккумулятор SOLITE Silver 95D26L',
    brand: 'SOLITE',
    price: 7850,
    voltage: '12В',
    capacity: '75Ач',
    current: '650А',
    category: 'Автомобильные',
    compatible: ['Toyota', 'Subaru', 'Mitsubishi'],
    image: 'https://miraccum.ru/1c/import_files/solite.png'
  },
  {
    id: 10,
    name: 'Аккумулятор VARTA Blue Dynamic D59',
    brand: 'VARTA',
    price: 9450,
    voltage: '12В',
    capacity: '60Ач',
    current: '540А',
    category: 'Европейские',
    compatible: ['Volkswagen', 'Ford', 'Renault', 'Chevrolet'],
    image: 'https://miraccum.ru/1c/import_files/varta.png'
  },
  {
    id: 11,
    name: 'Аккумулятор BOSCH S4 005',
    brand: 'BOSCH',
    price: 9850,
    voltage: '12В',
    capacity: '60Ач',
    current: '540А',
    category: 'Европейские',
    compatible: ['Volkswagen', 'Ford', 'Opel', 'Peugeot'],
    image: 'https://miraccum.ru/1c/import_files/bosch.png'
  },
  {
    id: 12,
    name: 'Аккумулятор MUTLU Calcium Silver 60',
    brand: 'MUTLU',
    price: 7950,
    voltage: '12В',
    capacity: '60Ач',
    current: '540А',
    category: 'Европейские',
    compatible: ['Volkswagen', 'Kia', 'Hyundai', 'Skoda'],
    image: 'https://miraccum.ru/1c/import_files/mutlu.png'
  },
  {
    id: 13,
    name: 'Аккумулятор TYUMEN BATTERY STANDARD 6CT-60L',
    brand: 'TYUMEN BATTERY',
    price: 5650,
    voltage: '12В',
    capacity: '60Ач',
    current: '500А',
    category: 'Российские',
    compatible: ['UAZ', 'Chevrolet Niva', 'Lada', 'Газель'],
    image: 'https://miraccum.ru/1c/import_files/tyumen.png'
  },
  {
    id: 14,
    name: 'Аккумулятор АКТЕХ 6СТ-55 АЗ',
    brand: 'АКТЕХ',
    price: 4950,
    voltage: '12В',
    capacity: '55Ач',
    current: '460А',
    category: 'Российские',
    compatible: ['Lada', 'UAZ', 'Daewoo'],
    image: 'https://miraccum.ru/1c/import_files/aktech.png'
  },
  {
    id: 15,
    name: 'Аккумулятор ЗВЕРЬ 6СТ-60',
    brand: 'ЗВЕРЬ',
    price: 5450,
    voltage: '12В',
    capacity: '60Ач',
    current: '530А',
    category: 'Российские',
    compatible: ['Lada', 'Renault', 'Hyundai', 'Kia'],
    image: 'https://miraccum.ru/1c/import_files/zver.png'
  },
  {
    id: 16,
    name: 'Аккумулятор TUBOR ARCTIC 6CT-60.0 VL',
    brand: 'TUBOR',
    price: 6150,
    voltage: '12В',
    capacity: '60Ач',
    current: '590А',
    category: 'Российские',
    compatible: ['Lada', 'Renault', 'Volkswagen', 'Ford'],
    image: 'https://miraccum.ru/1c/import_files/tubor.png'
  },
  {
    id: 17,
    name: 'Аккумулятор KAINAR 6СТ-60 VL',
    brand: 'KAINAR',
    price: 5850,
    voltage: '12В',
    capacity: '60Ач',
    current: '540А',
    category: 'Российские',
    compatible: ['Lada', 'UAZ', 'Chevrolet'],
    image: 'https://miraccum.ru/1c/import_files/kainar.png'
  },
  {
    id: 18,
    name: 'АКБ RDrive OEM NP1,2-12',
    brand: 'RDrive',
    price: 3300,
    voltage: '12В',
    capacity: '1.2Ач',
    current: '20А',
    category: 'Вспомогательные',
    compatible: ['Сигнализации', 'ИБП', 'Системы безопасности'],
    image: 'https://miraccum.ru/1c/import_files/eb/eba8a89f365011ee947a049226bf29c1_24c138eb374511ee947a049226bf29c1.jpg'
  },
  {
    id: 19,
    name: 'Аккумулятор VARTA Silver Dynamic AGM',
    brand: 'VARTA',
    price: 18900,
    voltage: '12В',
    capacity: '70Ач',
    current: '760А',
    category: 'AGM',
    compatible: ['BMW', 'Audi', 'Mercedes', 'Porsche'],
    image: 'https://miraccum.ru/1c/import_files/varta.png'
  },
  {
    id: 20,
    name: 'Аккумулятор MUTLU EFB 80',
    brand: 'MUTLU',
    price: 12900,
    voltage: '12В',
    capacity: '80Ач',
    current: '800А',
    category: 'EFB',
    compatible: ['Volkswagen', 'Skoda', 'BMW', 'Audi'],
    image: 'https://miraccum.ru/1c/import_files/mutlu.png'
  }
];

export const brands = [
  'SPARK', 'VOLT', 'SOLITE', 'VARTA', 'BOSCH', 'MUTLU', 
  'TYUMEN BATTERY', 'АКТЕХ', 'ЗВЕРЬ', 'TUBOR', 'KAINAR', 
  'RDrive'
];

export const stores: Store[] = [
  { name: 'Павловича, 26', address: 'ул. Павловича, 26' },
  { name: 'Павловича, 11', address: 'ул. Павловича, 11' },
  { name: 'Краснореченская, 149', address: 'ул. Краснореченская, 149' },
  { name: 'Воронежская, 66', address: 'ул. Воронежская, 66' },
  { name: 'Суворова, 73а/2', address: 'ул. Суворова, 73а/2' },
  { name: 'Пр. 60-летия Октября, 154', address: 'Проспект 60-летия Октября, 154' }
];

export const serviceCenter: ServiceCenter = {
  name: 'Сервисный центр',
  address: 'ул. Павловича, 11/2',
  description: 'Обслуживание аккумуляторных батарей'
};
