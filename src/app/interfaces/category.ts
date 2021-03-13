import { Recipe } from '../components/recipe/types/recipe';

export class Category {
  _id?: string;
  name!: string;
  recipes?: Recipe[];
}
