import {Ingredient} from './ingredient';

export class Recipe {
  id?: number;
  name!: string;
  imageUrl?: string;
  ingredients!: Ingredient[];
  instructions!: string[];
  categoryId!: number;
  author!: string;
}
