import {Ingredient} from "./ingredient";

export class Recipe {
  name!: string;
  imageUrl?: string;
  ingredients!: Ingredient[];
  instructions!: string[];
}
