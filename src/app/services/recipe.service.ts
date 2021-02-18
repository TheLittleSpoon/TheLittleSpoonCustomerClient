import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Recipe} from '../components/recipe/types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {
  }

  saveRecipe(recipe: Recipe): void {
    console.log(recipe);
    this.http
      .post<Recipe>('http://34.66.166.236/:3000/api/recipes/create', recipe)
      .toPromise()
      .then((data) => {
        console.log(data);
      });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('http://34.66.166.236:3000/api/recipes/');
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
