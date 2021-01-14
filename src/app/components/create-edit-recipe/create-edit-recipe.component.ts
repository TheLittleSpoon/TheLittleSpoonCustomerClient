import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.css'],
})
export class CreateEditRecipeComponent implements OnInit {
  @Input() isEditMode!: boolean;
  @Input() recipe?: Recipe;
  url!: string;
  createRecipeForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.recipe = {
      name: 's',
      instructions: ['ss'],
      ingredients: [],
    };
    this.createRecipeForm?.valueChanges.subscribe((changes) => {
      console.log(changes);
    });
    this.initForm();
  }

  loadFile(event: Event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result as string;

        this.createRecipeForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  deleteUrl(): void {
    this.url = '';
  }

  onSubmit(): void {
    let recipe: Recipe = {
      name: this.createRecipeForm.controls['recipeName']?.value,
      instructions: this.createRecipeForm.controls['instructions']?.value,
      imageUrl: this.createRecipeForm.controls['imageFile']?.value,
      ingredients: this.createRecipeForm.controls['ingredients']?.value,
    };
    console.log(recipe);
    this.createRecipeForm.reset();
  }

  private get f() {
    return this.createRecipeForm.controls;
  }

  private initForm(): void {
    this.createRecipeForm = new FormGroup({
      recipeName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      instructions: new FormControl('', [Validators.required]),
      imageFile: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      ingredients: new FormArray([new FormControl(null)]),
    });
  }
}
