import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/categories.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe/types/recipe';
import Swal from 'sweetalert2';

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
  constructor(
    private categoryService: CategoryService,
    private recipesService: RecipeService
  ) {
    this.categories = this.categoryService.getCategories();
    this.showRecipes = false;
  }

  ngOnInit(): void {}

  setRecipesToShow(category?: Category): void {
    this.title = 'Recipes - ' + category?.name;
    if (this.showRecipes) {
      this.clearRecipes();
    }
    this.recipesToShow = this.recipesService.recipes.filter(
      (recipe: Recipe) => recipe.categoryId == category?.id
    );
    if (this.recipesToShow.length > 0) {
      this.showRecipes = true;
    } else {
      Swal.fire('Error', 'No Recipe Found', 'error');
    }
  }

  clearRecipes(): void {
    this.showRecipes = false;
    this.recipesToShow = [];
    this.title = '';
  }
}
