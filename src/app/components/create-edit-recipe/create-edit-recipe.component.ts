import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.css'],
})
export class CreateEditRecipeComponent implements OnInit, OnChanges {
  @Input() isEditMode!: boolean;
  @Input() recipe?: Recipe;
  @Output() saveRecipe!: EventEmitter<Recipe>;
  url!: string;
  createRecipeForm!: FormGroup;

  constructor() {
    this.saveRecipe = new EventEmitter<Recipe>();
  }

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

  ngOnChanges(changes: SimpleChanges): void {}

  loadFile(event: any): void {
    var selectedImage = event.target.files[0];
    if (selectedImage) {
      var reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = (e: any) => {
        this.url = e.target.result;
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
      imageUrl: this.url,
      ingredients: this.createRecipeForm.controls['ingredients']?.value,
    };
    this.saveRecipe.emit(recipe);
    this.createRecipeForm.reset();
    this.deleteUrl();
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
      instructions: new FormControl('', Validators.required),
      imageFile: new FormControl('', Validators.required),
      ingredients: new FormArray([new FormControl(null)]),
    });
  }
}
