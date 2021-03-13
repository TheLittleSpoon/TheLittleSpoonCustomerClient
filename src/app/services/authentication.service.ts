import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../types/user';
import { RequestService } from './request.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private requestService: RequestService,
    private recipeService: RecipeService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body: string = JSON.stringify({ email, password });
    return this.http
      .post('http://35.224.144.255:3000/api/auth/', body, {
        headers,
        responseType: 'text',
      })
      .pipe(
        map((response: string) => {
          const user: User = new User();
          user.email = email;
          user.token = response;
          user.isAdmin = false;
          if (user.token === '') {
            console.log('Error retrieving token');
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.requestService.get('/api/users/me').subscribe((answer) => {
            const currentUser: User = JSON.parse(
              localStorage.getItem('currentUser') as string
            );
            currentUser.name = answer.name;
            currentUser.isAdmin = answer.isAdmin;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          });
          this.recipeService.loadRecipes();
          return user;
        })
      );
  }

  register(email: string, name: string, password: string): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body: string = JSON.stringify({ email, password, name });
    return this.http
      .post('http://35.224.144.255:3000/api/users/', body, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const user: User = new User();
          user.email = email;
          user.name = name;
          user.isAdmin = false;
          user.token = response.headers.get('x-auth-token') ?? '';
          if (user.token === '') {
            console.log('Error retrieving token');
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.recipeService.loadRecipes();
          return user;
        })
      );
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
