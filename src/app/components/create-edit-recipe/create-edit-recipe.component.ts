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
import { Recipe } from '../recipe/types/recipe';
import { UnitEnum } from '../recipe/types/unit.enum';
import { Ingredient } from '../recipe/types/ingredient';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.css'],
})
export class CreateEditRecipeComponent implements OnInit, OnChanges {
  @Input() isEditMode?: boolean = true;
  @Input() recipe?: Recipe;
  @Output() saveRecipe!: EventEmitter<Recipe>;
  @Output() updateRecipe!: EventEmitter<Recipe>;
  url?: string;
  createRecipeForm!: FormGroup;
  recipeToEdit?: Recipe;
  recipeToEditChanged?: boolean;
  readonly unitEnum: typeof UnitEnum = UnitEnum;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.saveRecipe = new EventEmitter<Recipe>();
    this.updateRecipe = new EventEmitter<Recipe>();
    this.recipeToEditChanged = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeToEdit = this.recipeService.getRecipe(params.id);
    });
    this.initForm();
    this.createRecipeForm.valueChanges.subscribe((newRecipe) => {
      const { recipeName, instructions, ingredients, imageFile } = newRecipe;
      this.recipeToEditChanged =
        recipeName == this.recipeToEdit?.name &&
        instructions == this.recipeToEdit?.instructions &&
        JSON.stringify(ingredients) ==
          JSON.stringify(this.recipeToEdit?.ingredients) &&
        imageFile == this.recipeToEdit?.imageUrl;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

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

  addIngredient(ingredient?: Ingredient): void {
    this.ingredients.push(
      this.fb.group(
        {
          name: new FormControl(ingredient?.name, Validators.required),
          quantity: new FormControl(ingredient?.quantity, Validators.required),
          unit: new FormControl(ingredient?.unit, Validators.required),
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
    this.recipeToEdit
      ? this.recipeService.updateRecipe.emit(recipe)
      : this.recipeService.saveRecipe(recipe);
    this.recipeService.saveRecipe(recipe);
    this.createRecipeForm.reset();
    this.deleteUrl();
  }

  private addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => this.addIngredient(ingredient));
  }

  private initForm(): void {
    this.createRecipeForm = this.fb.group({
      recipeName: new FormControl(
        this.recipeToEdit ? this.recipeToEdit.name : '',
        [Validators.required, Validators.minLength(3)]
      ),
      instructions: new FormControl(
        this.recipeToEdit ? this.recipeToEdit.instructions : '',
        Validators.required
      ),
      imageFile: new FormControl(
        this.recipeToEdit ? this.recipeToEdit.imageUrl : ''
      ),
      ingredients: this.fb.array([], Validators.required),
    });
    this.recipeToEdit
      ? (this.url = this.recipeToEdit.imageUrl) &&
        this.addIngredients(this.recipeToEdit.ingredients)
      : '';
  }
}
