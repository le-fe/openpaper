import dataName from '../data/data-name.json';

export function randomName() {
  return dataName[Math.floor(Math.random() * dataName.length)];
}
