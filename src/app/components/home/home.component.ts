import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe/types/recipe';
import { UnitEnum } from '../recipe/types/unit.enum';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes!: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    authService: AuthenticationService
  ) {
    if (authService.currentUserValue === null) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    // this.recipes = this.recipeService.recipes;
    this.recipeService.loadRecipes();
    this.recipeService.getRecipes().subscribe((recipesFromServer: Recipe[]) => {
      this.recipes = recipesFromServer;
    });
    this.recipeService.filteredRecipesEmitter.subscribe(
      (filteredRecipes: Recipe[]) => {
        if (filteredRecipes?.length) {
          this.recipes = filteredRecipes;
        } else {
          this.recipeService
            .getRecipes()
            .subscribe((recipesFromServer: Recipe[]) => {
              this.recipes = recipesFromServer;
            });
        }
      }
    );
  }
}
