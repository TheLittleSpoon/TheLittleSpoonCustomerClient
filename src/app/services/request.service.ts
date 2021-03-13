import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable()
export class RequestService {
  private readonly serverPath: string = 'http://35.224.144.255:3000';
  constructor(private http: HttpClient) {
  }

  get(endpoint: string, isAuth: boolean = true): Observable<any> {
    let headers = {};
    if (isAuth) {
      const currentUser: User = JSON.parse(
        localStorage.getItem('currentUser') as string
      );
      headers = { 'x-auth-token': currentUser.token };
    }
    return this.http.get(`${this.serverPath}${endpoint}`, { headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  post(endpoint: string, body: any): Observable<any> {
    const currentUser: User = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    const headers = {
      'x-auth-token': currentUser.token,
      'content-type': 'application/json',
    };
    return this.http
      .post(`${this.serverPath}${endpoint}`, body, { headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  put(endpoint: string, body: any): Observable<any> {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser') as string);
    const headers = {'x-auth-token': currentUser.token, 'content-type': 'application/json'};
    return this.http.put(`${this.serverPath}${endpoint}`, body, {headers})
      .pipe(map((response) => {
        return response;
      }), catchError(this.handleError));
  }

  delete(endpoint: string, id: any): Observable<any> {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser') as string);
    const headers = {'x-auth-token': currentUser.token};
    return this.http.delete(`${this.serverPath}${endpoint}${id}`, {headers})
      .pipe(map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
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
