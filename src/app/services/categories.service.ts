import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

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
}
