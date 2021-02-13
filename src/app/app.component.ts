import { Component } from '@angular/core';
import { Recipe } from './interfaces/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'the-little-spoon-customer-client';

  constructor(private recipeService: RecipeService) {}

  saveRecipe(recipe: Recipe): void {
    this.recipeService.saveRecipe(recipe);
  }
}
