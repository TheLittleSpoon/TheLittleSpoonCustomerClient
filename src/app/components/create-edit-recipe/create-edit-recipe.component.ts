import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { Recipe } from 'src/app/interfaces/recipe';
import { UnitEnum } from 'src/app/interfaces/unit.enum';

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
  readonly unitEnum: typeof UnitEnum = UnitEnum;

  constructor(private fb: FormBuilder) {
    this.saveRecipe = new EventEmitter<Recipe>();
  }

  ngOnInit(): void {
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
    this.createRecipeForm.controls['imageFile']?.setValue(undefined);
  }

  addIngredient(): void {
    this.createRecipeForm.controls['ingredients'].push(
      this.fb.group(
        {
          name: new FormControl(undefined, Validators.required),
          quantity: new FormControl(undefined, Validators.required),
          unit: new FormControl(undefined, Validators.required),
        },
        Validators.required
      )
    );
    console.log(this.createRecipeForm);
  }

  onSubmit(): void {
    console.log(this.createRecipeForm);
    let ingredients: Ingredient[] = [];
    this.createRecipeForm.controls['ingredients']?.controls.forEach(
      (element) => {
        let ingredient = {
          name: element.controls['name'].value,
          quantity: element.controls['quantity'].value,
          unit: element.controls['unit'].value,
        };
        if (ingredient.name && ingredient.quantity && ingredient.unit) {
          ingredients.push(ingredient);
        }
      }
    );
    let recipe: Recipe = {
      name: this.createRecipeForm.controls['recipeName']?.value,
      instructions: this.createRecipeForm.controls['instructions']?.value,
      imageUrl: this.url,
      ingredients: ingredients,
    };
    this.saveRecipe.emit(recipe);
    this.createRecipeForm.reset();
    this.deleteUrl();
  }

  private get f() {
    return this.createRecipeForm.controls;
  }

  private initForm(): void {
    this.createRecipeForm = this.fb.group({
      recipeName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      instructions: new FormControl('', Validators.required),
      imageFile: new FormControl('', Validators.required),
      ingredients: this.fb.array([], Validators.required),
    });
  }
}