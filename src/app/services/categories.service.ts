import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    {
      id: 3,
      name: 'Fishes',
      imageUrl:
        'https://www.masalakorb.com/wp-content/uploads/2016/08/Grilled-Fish-Indian-Recipe-V5.jpg',
    },
    {
      id: 4,
      name: 'Breakfast',
      imageUrl:
        'https://simply-delicious-food.com/wp-content/uploads/2018/10/breakfast-board-500x500.jpg',
    },
    {
      id: 5,
      name: 'Desserts',
      imageUrl:
        'https://preppykitchen.com/wp-content/uploads/2020/05/No-Bake-Strawberry-Cheesecake-feature-1140x1615.jpg',
    },
    {
      id: 6,
      name: 'Vegetarian',
      imageUrl:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F35%2F2020%2F12%2F28%2Fveg-diet-plan-promo.jpg&q=85',
    },
    {
      id: 7,
      name: 'Pasta',
      imageUrl:
        'https://media.gettyimages.com/photos/pasta-plate-picture-id637214478?k=6&m=637214478&s=612x612&w=0&h=sU0ukGe_aYoztRgIIaVE9oem-b9JJs5V4ysCTiXwEDA=',
    },
    {
      id: 8,
      name: 'Chicken',
      imageUrl:
        'https://easychickenrecipes.com/wp-content/uploads/2019/03/cheesy-asparagus-stuffed-chicken-breast-recipe-4-of-9.jpg',
    },
  ];
  filteredCategories?: Category[];
  filteredCategriesEmitter!: EventEmitter<Category[]>;
  constructor(private http: HttpClient, private router: Router) {
    this.filteredCategriesEmitter = new EventEmitter<Category[]>();
  }

  getCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>(
    //   'http://34.66.166.236:3000/api/categories/'
    // );
    return new Observable<Category[]>((subscriber) =>
      subscriber.next(this.categories)
    );
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      'http://34.66.166.236:3000/api/categories/delete',
      category
    );
  }

  searchCategoryByName(categoryName: string): void {
    this.filteredCategories = this.categories.filter((category: Category) =>
      category.name.toLowerCase().includes(categoryName.toLowerCase())
    );
    this.filteredCategriesEmitter.emit(this.filteredCategories);
  }

  saveCategory(category: Category): void {
    this.http
      .post<Category>(
        'http://34.66.166.236/:3000/api/categories/create',
        category
      )
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

  getCategory(id: number) {
    return this.categories.find((category: Category) => category.id == id);
  }

  updateCategory(category: Category): void {
    this.http
      .post<Category>(
        'http://34.66.166.236/:3000/api/categories/update',
        category
      )
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
