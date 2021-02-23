import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  recipeSearchForm!: FormGroup;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeSearchForm = this.fb.group({
      recipeName: new FormControl(''),
    });

    this.recipeSearchForm.valueChanges.subscribe((change) => {
      if (change.recipeName == '') {
        this.recipeService.searchRecipeByName('');
      }
    });
  }

  onSubmit(): void {
    this.recipeSearchForm.controls['recipeName'].value != ''
      ? this.recipeService.searchRecipeByName(
          this.recipeSearchForm.controls['recipeName'].value
        )
      : undefined;
  }
}
