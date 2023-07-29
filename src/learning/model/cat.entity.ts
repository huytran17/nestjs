import ICat from './cat.interface';

export default class Cat implements ICat {
  public readonly id: number;
  public readonly name: string;
  public readonly age: number;

  constructor({ id, name, age }: { id: number; name: string; age: number }) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
