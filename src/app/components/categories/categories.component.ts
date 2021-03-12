import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/interfaces/category';
import {CategoryService} from 'src/app/services/categories.service';
import {RecipeService} from 'src/app/services/recipe.service';
import {Recipe} from '../recipe/types/recipe';
import Swal from 'sweetalert2';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];
  recipesToShow: Recipe[] = [];
  showRecipes!: boolean;
  title?: string;
  actionPressed!: boolean;
  isAdmin: boolean = false;

  constructor(private categoryService: CategoryService,
              private recipesService: RecipeService,
              private authenticationService: AuthenticationService) {
    this.showRecipes = false;
    this.actionPressed = false;
    this.isAdmin = this.authenticationService.currentUserValue?.isAdmin ?? false;
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));

    this.categoryService.filteredCategriesEmitter.subscribe(
      (filteredCategories: Category[]) => {
        this.categories =
          filteredCategories.length > 0 ? filteredCategories : this.categories;
      }
    );
  }

  setRecipesToShow(category?: Category): void {
    this.title = 'Recipes - ' + category?.name;
    if (this.showRecipes) {
      this.clearRecipes();
    }
    this.recipesService.getRecipes().subscribe(recipes => {
      this.recipesToShow = recipes.filter((recipe: Recipe) => recipe.categoryId === category?.id);
      if (this.recipesToShow.length > 0) {
        this.showRecipes = true;
      } else {
        Swal.fire('Error', 'No Recipe Found', 'error');
      }
    });
  }

  clearRecipes(): void {
    this.showRecipes = false;
    this.recipesToShow = [];
  }

  deleteCategory(category: Category): void {
    this.actionPressed = true;
    this.categoryService
      .deleteCategory(category)
      .toPromise()
      .then((data) => {
        Swal.fire('Success', 'Category Deleted!', 'success');
        this.actionPressed = false;
      })
      .catch((error) => {
        Swal.fire('Error', 'Could Not Delete Category!', 'error');
        this.actionPressed = false;
      });
  }
}
