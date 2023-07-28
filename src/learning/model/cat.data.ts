import Cat from './cat.entity';

const CatsData: Cat[] = [
  {
    id: 1,
    name: 'Tom',
    age: 10,
  },
  {
    id: 2,
    name: 'Oggy',
    age: 11,
  },
  {
    id: 3,
    name: 'Doraemon',
    age: 12,
  },
];

export default Object.freeze({
  CatsData,
});

export { CatsData };
