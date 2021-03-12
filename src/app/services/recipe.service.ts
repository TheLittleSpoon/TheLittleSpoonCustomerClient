import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UnitEnum } from '../components/recipe/types/unit.enum';
import { Recipe } from '../components/recipe/types/recipe';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [
    {
      id: 1,
      name: 'hard boiled egg',
      imageUrl:
        'https://static.toiimg.com/thumb/msid-68494742,width-800,height-600,resizemode-75,imgsize-1248878,pt-32,y_pad-40/68494742.jpg',
      ingredients: [{ name: 'egg', quantity: 1, unit: UnitEnum.AMOUNT }],
      instructions: [
        'boil water in small pot',
        'put egg in pot',
        'wait 15 minutes',
        'take egg out',
      ],
      categoryId: 1,
    },
    {
      id: 2,
      name: 'glass of water',
      imageUrl:
        'data:image/jpeg;base64,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',
      ingredients: [{ name: 'water', quantity: 1, unit: UnitEnum.CUP }],
      instructions: ['pour water into glass'],
      categoryId: 1,
    },
  ];
  filteredRecipes?: Recipe[];
  filteredRecipesEmitter!: EventEmitter<Recipe[]>;
  constructor(private http: HttpClient, private router: Router) {
    this.filteredRecipesEmitter = new EventEmitter<Recipe[]>();
  }

  saveRecipe(recipe: Recipe): void {
    this.http
      .post<Recipe>('http://34.66.166.236/:3000/api/recipes/create', recipe)
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
    this.http
      .post<Recipe>('http://34.66.166.236/:3000/api/recipes/update', recipe)
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
    this.http
      .post<Recipe[]>('http://34.66.166.236:3000/api/recipes/filter', {
        recipeName,
        categoryId,
        ingredientName,
      })
      .toPromise()
      .then((recipes: Recipe[]) => (this.filteredRecipes = recipes))
      .catch((error) => {
        Swal.fire('Error', 'Could Not Search!', 'error');
      });
    // this.filteredRecipes = this.recipes.filter((recipe: Recipe) =>
    //   recipe.name.toLowerCase().includes(recipeName.toLowerCase())
    // );
    this.filteredRecipesEmitter.emit(this.filteredRecipes);
  }

  deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(
      'http://34.66.166.236:3000/api/recipes/delete',
      recipe
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('http://34.66.166.236:3000/api/recipes/');
  }

  getRecipe(id: number) {
    return this.recipes.find((recipe) => recipe.id == id);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
