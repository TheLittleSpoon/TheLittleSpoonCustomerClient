import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/categories.service';
import { RecipeService } from 'src/app/services/recipe.service';

enum Object {
  recipe = 1,
  category,
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Input() objectType!: number;
  objectSearchForm!: FormGroup;
  categories!: Category[];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.objectSearchForm = this.fb.group({
      categoryId: new FormControl(''),
      objectName: new FormControl(''),
      ingredientName: new FormControl(''),
    });

    this.objectSearchForm.valueChanges.subscribe((change) => {
      // if (change.objectName == '') {
      //   switch (this.objectType) {
      //     case Object.recipe: {
      //       this.recipeService.searchRecipeByName('');
      //       break;
      //     }
      //     case Object.category: {
      //       this.categoryService.searchCategoryByName('');
      //       break;
      //     }
      //     default: {
      //       break;
      //     }
      //   }
      // }
    });

    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));
  }

  onSubmit(): void {
    switch (this.objectType) {
      case Object.recipe: {
        this.recipeService.searchRecipe(
          this.objectSearchForm.controls['objectName'].value,
          this.objectSearchForm.controls['categoryId'].value,
          this.objectSearchForm.controls['ingredientName'].value
        );
        break;
      }
      case Object.category: {
        this.categoryService.searchCategoryByName(
          this.objectSearchForm.controls['objectName'].value
        );
        break;
      }
      default: {
        break;
      }
    }
  }
}
