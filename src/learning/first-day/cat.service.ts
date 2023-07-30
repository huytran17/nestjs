import { Injectable, Scope } from '@nestjs/common';
import Cat from '../model/cat.entity';
import { CatsData } from '../model/cat.data';

@Injectable({ scope: Scope.DEFAULT })
export class CatService {
  private cats: Cat[] = CatsData;

  async checkVersion(id: number): Promise<string> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(`Current version is ${id}`), 500),
    );
  }

  async findOne(id: number): Promise<Cat | undefined> {
    return await new Promise((resolve) => {
      const cat_found: Cat | undefined = this.cats.find((cat) => cat.id === id);

      setTimeout(() => resolve(cat_found), 1000);
    });
  }

  async findAll(): Promise<Cat[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.cats), 2000));
  }

  async create(catDetails: Omit<Cat, 'id'>): Promise<Cat> {
    return await new Promise((resolve) => {
      const new_cat = { ...catDetails, id: new Date().getTime() };

      this.cats.push(new_cat);

      setTimeout(() => resolve(new_cat), 1500);
    });
  }

  async update(
    id: number,
    catDetails: Omit<Cat, 'id'>,
  ): Promise<Cat | undefined> {
    return await new Promise((resolve) => {
      const cat_index = this.cats.findIndex((cat) => cat.id === id);

      const updated = { ...catDetails, id };

      this.cats[cat_index] = updated;

      setTimeout(() => resolve(updated), 1600);
    });
  }

  async deleteOne(id: number): Promise<string> {
    return await new Promise((resolve) => {
      this.cats = this.cats.filter((cat) => cat.id !== id);

      setTimeout(() => resolve(`Deleted cat ${id}`), 1000);
    });
  }
}
