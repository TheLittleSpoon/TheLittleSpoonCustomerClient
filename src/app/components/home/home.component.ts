import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe/types/recipe';
import { UnitEnum } from '../recipe/types/unit.enum';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipesFromServer: Recipe[]) => {
      if (recipesFromServer) {
        this.recipes = recipesFromServer;
      }
    });
    this.recipeService.filteredRecipesEmitter.subscribe(
      (filteredRecipes: Recipe[]) => {
        this.recipes =
          filteredRecipes.length > 0 ? filteredRecipes : this.recipes;
      }
    );
  }
}
