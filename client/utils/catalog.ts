import { idGenerator } from './common';

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checkbox: false,
  id: idGenerator(),
});

export const productManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckboxObj);

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckboxObj);
