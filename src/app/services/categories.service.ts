import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from './request.service';

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
    // return new Observable<Category[]>((subscriber) =>
    //   subscriber.next(this.categories)
    // );
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.requestService.post('/api/categories/delete', category);
  }

  searchCategoryByName(categoryName: string): void {
    this.filteredCategories = this.categories.filter((category: Category) =>
      category.name.toLowerCase().includes(categoryName.toLowerCase())
    );
    this.filteredCategriesEmitter.emit(this.filteredCategories);
  }

  saveCategory(category: Category): void {
    this.requestService
      .post('/api/categories/', category)
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

  getCategory(id: string): Category | undefined {
    return this.categories.find((category: Category) => category._id === id);
  }

  updateCategory(category: Category): void {
    this.requestService
      .post('/api/categories/update', category)
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
