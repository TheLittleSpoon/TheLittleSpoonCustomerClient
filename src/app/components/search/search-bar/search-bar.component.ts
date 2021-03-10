import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.objectSearchForm = this.fb.group({
      objectName: new FormControl(''),
    });

    this.objectSearchForm.valueChanges.subscribe((change) => {
      if (change.objectName == '') {
        switch (this.objectType) {
          case Object.recipe: {
            this.recipeService.searchRecipeByName('');
            break;
          }
          case Object.category: {
            this.categoryService.searchCategoryByName('');
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  onSubmit(): void {
    if (this.objectSearchForm.controls['objectName'].value != '') {
      switch (this.objectType) {
        case Object.recipe: {
          this.recipeService.searchRecipeByName(
            this.objectSearchForm.controls['objectName'].value
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
}
