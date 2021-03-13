import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UnitEnum } from '../components/recipe/types/unit.enum';
import { Recipe } from '../components/recipe/types/recipe';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];
  filteredRecipes?: Recipe[];
  filteredRecipesEmitter!: EventEmitter<Recipe[]>;
  constructor(private requestService: RequestService, private router: Router) {
    this.filteredRecipesEmitter = new EventEmitter<Recipe[]>();
  }

  saveRecipe(recipe: Recipe): void {
    this.requestService
      .post('/api/recipes/create', recipe)
      .toPromise()
      .then((data) => {
        Swal.fire('Success', 'Recipe Saved!', 'success');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        Swal.fire('Error', 'Could Not Save Recipe!', 'error');
        this.router.navigate(['home']);
      });
  }

  updateRecipe(recipe: Recipe): void {
    this.requestService
      .post('/api/recipes/update', recipe)
      .toPromise()
      .then((data) => {
        Swal.fire('Success', 'Recipe Saved!', 'success');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        Swal.fire('Error', 'Could Not Save Recipe!', 'error');
        this.router.navigate(['home']);
      });
  }

  searchRecipe(
    recipeName: string,
    categoryId: number,
    ingredientName: string
  ): void {
    this.requestService
      .post('http://34.66.166.236:3000/api/recipes/filter', {
        recipeName,
        categoryId,
        ingredientName,
      })
      .toPromise()
      .then((recipes: Recipe[]) => (this.filteredRecipes = recipes))
      .catch(() => {
        Swal.fire('Error', 'Could Not Search!', 'error');
      });
    // );
    this.filteredRecipesEmitter.emit(this.filteredRecipes);
  }

  deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return this.requestService.post('/api/recipes/delete', recipe);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.requestService.get('/api/recipes/');
  }

  loadRecipes(): void {
    this.requestService.get('/api/recipes/').subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
