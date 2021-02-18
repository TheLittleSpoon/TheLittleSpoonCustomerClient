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
import {Recipe} from '../recipe/types/recipe';
import {UnitEnum} from '../recipe/types/unit.enum';
import {Ingredient} from '../recipe/types/ingredient';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.css'],
})
export class CreateEditRecipeComponent implements OnInit, OnChanges {
  @Input() isEditMode?: boolean = true;
  @Input() recipe?: Recipe;
  @Output() saveRecipe!: EventEmitter<Recipe>;
  url!: string;
  createRecipeForm!: FormGroup;
  readonly unitEnum: typeof UnitEnum = UnitEnum;

  constructor(private fb: FormBuilder,
              private recipeService: RecipeService) {
    this.saveRecipe = new EventEmitter<Recipe>();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  loadFile(event: any): void {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
  }

  deleteUrl(): void {
    this.url = '';
    this.createRecipeForm.controls.imageFile?.setValue(undefined);
  }

  addIngredient(): void {
    this.ingredients.push(
      this.fb.group(
        {
          name: new FormControl(undefined, Validators.required),
          quantity: new FormControl(undefined, Validators.required),
          unit: new FormControl(undefined, Validators.required),
        },
        Validators.required
      )
    );
  }

  get ingredients(): FormArray {
    return this.createRecipeForm.get('ingredients') as FormArray;
  }

  onSubmit(): void {
    const ingredientsArray: Ingredient[] = [];
    for (const element of this.ingredients.controls) {
      const ingredient = {
        name: element.get('name')?.value,
        quantity: element.get('quantity')?.value,
        unit: element.get('unit')?.value,
      };
      if (ingredient.name && ingredient.quantity && ingredient.unit) {
        ingredientsArray.push(ingredient);
      }
    }
    const recipe: Recipe = {
      name: this.createRecipeForm.controls.recipeName?.value,
      instructions: this.createRecipeForm.controls.instructions?.value,
      imageUrl: this.url,
      ingredients: ingredientsArray,
    };
    this.saveRecipe.emit(recipe);
    this.recipeService.saveRecipe(recipe);
    this.createRecipeForm.reset();
    this.deleteUrl();
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
