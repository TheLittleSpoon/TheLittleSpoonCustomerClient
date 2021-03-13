import { Ingredient } from './ingredient';

export class Recipe {
  _id?: string;
  name!: string;
  image?: string;
  ingredients!: Ingredient[];
  instructions!: string[];
  categories!: string;
  author!: string;
}
