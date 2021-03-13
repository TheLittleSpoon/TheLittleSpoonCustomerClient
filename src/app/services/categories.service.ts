import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from './request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  filteredCategories?: Category[];
  filteredCategriesEmitter!: EventEmitter<Category[]>;

  constructor(private requestService: RequestService, private router: Router) {
    this.filteredCategriesEmitter = new EventEmitter<Category[]>();
  }

  getCategories(): Observable<Category[]> {
    return this.requestService.get('/api/categories/', false);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.requestService.delete('/api/categories/', category._id);
  }

  searchCategoryByName(categoryName: string): void {
    this.getCategories().subscribe((categories: Category[]) => {
      this.filteredCategories = categories.filter((category: Category) =>
        category.name.toLowerCase().includes(categoryName.toLowerCase())
      );
      this.filteredCategriesEmitter.emit(this.filteredCategories);
    });
  }

  saveCategory(category: Category): void {
    const body: string = JSON.stringify(category);
    this.requestService
      .post('/api/categories/', body)
      .toPromise()
      .then((data) => {
        Swal.fire('Success', 'Category Saved!', 'success');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        Swal.fire('Error', 'Could Not Save Category!', 'error');
        this.router.navigate(['home']);
      });
  }

  getCategory(id: string): Observable<Category | undefined> {
    return this.getCategories().pipe(
      map((categories: Category[]) =>
        categories.find((category: Category) => category._id === id)
      )
    );
  }

  updateCategory(category: Category): void {
    const body: string = JSON.stringify(category);
    this.requestService
      .put('/api/categories/', body)
      .toPromise()
      .then((data) => {
        Swal.fire('Success', 'Category Saved!', 'success');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        Swal.fire('Error', 'Could Not Save Category!', 'error');
        this.router.navigate(['home']);
      });
  }
}
