import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../types/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body: string = JSON.stringify({email, password});
    return this.http.post('http://35.224.144.255:3000/api/auth/', body, {headers, responseType: 'text'})
      .pipe(map((response: string) => {
        const user: User = new User();
        // todo: get username
        user.email = email;
        user.token = response;
        if (user.token === '') {
          console.log('Error retrieving token');
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(email: string, name: string, password: string): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body: string = JSON.stringify({email, password, name});
    return this.http.post('http://35.224.144.255:3000/api/users/', body, {headers, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const user: User = new User();
        user.email = email;
        user.name = name;
        user.token = response.headers.get('x-auth-token') ?? '';
        if (user.token === '') {
          console.log('Error retrieving token');
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
