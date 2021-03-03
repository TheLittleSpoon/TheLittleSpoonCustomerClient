import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Salads',
      imageUrl:
        'https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad.jpg',
    },
    {
      id: 2,
      name: 'Meat',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6g04Gj7W1Vo_P6C55ZGtrayc7MYgqL7uhQ&usqp=CAU',
    },
  ];
  constructor(private http: HttpClient) {}

  public getCategories(): Category[] {
    return this.categories;
  }

  public deleteCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      'http://34.66.166.236:3000/api/categories/delete',
      category
    );
  }
}
