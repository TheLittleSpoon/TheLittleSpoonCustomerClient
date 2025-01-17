import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../components/recipe/types/recipe';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RequestService } from './request.service';
import { map } from 'rxjs/operators';

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
    const body: string = JSON.stringify(recipe);
    this.requestService
      .post('/api/recipes/create', body)
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
    const body: string = JSON.stringify(recipe);
    this.requestService
      .put('/api/recipes/', body)
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

  searchRecipe(name: string, category: string, ingredient: string): void {
    if (name != '' || category != '' || ingredient != '') {
      this.requestService
        .post('/api/recipes/byFilter', {
          name,
          category,
          ingredient,
        })
        .toPromise()
        .then((recipes: Recipe[]) => {
          this.filteredRecipes = recipes;
          this.filteredRecipesEmitter.emit(this.filteredRecipes);
        })
        .catch(() => {
          Swal.fire('Error', 'Could Not Search!', 'error');
        });
    }
    this.filteredRecipesEmitter.emit([]);
  }

  deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return this.requestService.delete('/api/recipes/', recipe._id);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.requestService.get('/api/recipes/');
  }

  loadRecipes(): void {
    this.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  getRecipe(id: string): Observable<Recipe | undefined> {
    return this.getRecipes().pipe(
      map((recipes: Recipe[]) =>
        recipes.find((recipe: Recipe) => recipe._id === id)
      )
    );
  }

  getGroupByCategory(): Observable<any> {
    return this.requestService.get('/api/recipes/categories');
  }
}
