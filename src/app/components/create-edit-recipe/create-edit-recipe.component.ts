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
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../types/user';

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
  categories?: Category[];
  submitted!: boolean;
  showProgressBar!: boolean;
  readonly unitEnum: typeof UnitEnum = UnitEnum;
  private currentUser: any;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.saveRecipe = new EventEmitter<Recipe>();
    this.updateRecipe = new EventEmitter<Recipe>();
    this.recipeToEditChanged = true;
    this.showProgressBar = false;
    this.authenticationService.currentUser.subscribe(
      (user: User | null) => (this.currentUser = user)
    );
  }

  ngOnInit(): void {
    this.recipeService.loadRecipes();
    this.route.params.subscribe((params) => {
      this.recipeToEdit = this.recipeService.recipes.find(
        (recipe: Recipe) => recipe._id == params.id
      );
    });
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));
    this.initForm();
    this.createRecipeForm.valueChanges.subscribe((newRecipe) => {
      const {
        recipeName,
        categoryId,
        instructions,
        ingredients,
        imageUrl,
      } = newRecipe;
      this.recipeToEditChanged =
        recipeName == this.recipeToEdit?.name &&
        categoryId == this.recipeToEdit?.categories &&
        instructions == this.recipeToEdit?.instructions &&
        JSON.stringify(ingredients) ==
          JSON.stringify(this.recipeToEdit?.ingredients) &&
        imageUrl == this.recipeToEdit?.image;
      this.url = imageUrl;
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
    this.createRecipeForm.controls.imageUrl?.setValue(undefined);
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
    this.showProgressBar = true;
    const ingredientsArray: Ingredient[] = [];
    for (const element of this.ingredients.controls) {
      const ingredient = {
        name: element.get('name')?.value,
        categoryId: element.get('categoryId')?.value,
        quantity: element.get('quantity')?.value,
        unit: element.get('unit')?.value,
      };
      if (ingredient.name && ingredient.quantity && ingredient.unit) {
        ingredientsArray.push(ingredient);
      }
    }
    const recipe: Recipe = {
      _id: this.recipeToEdit?._id,
      name: this.createRecipeForm.controls.recipeName?.value,
      categories: this.createRecipeForm.controls.categoryId?.value,
      instructions: this.createRecipeForm.controls.instructions?.value,
      image: this.url,
      ingredients: ingredientsArray,
      author: this.currentUser.id,
    };
    this.recipeToEdit
      ? this.recipeService.updateRecipe(recipe)
      : this.recipeService.saveRecipe(recipe);
    this.createRecipeForm.reset();
    this.deleteUrl();
  }

  private addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient) => this.addIngredient(ingredient));
  }

  private initForm(): void {
    this.createRecipeForm = this.fb.group({
      recipeName: new FormControl(
        this.recipeToEdit ? this.recipeToEdit.name : '',
        [Validators.required, Validators.minLength(3)]
      ),
      categoryId: new FormControl(this.recipeToEdit?.categories, [
        Validators.required,
      ]),
      instructions: new FormControl(
        this.recipeToEdit?.instructions,
        Validators.required
      ),
      imageUrl: new FormControl(
        this.recipeToEdit ? this.recipeToEdit.image : ''
      ),
      ingredients: this.fb.array([], Validators.required),
    });
    if (this.recipeToEdit) {
      this.url = this.recipeToEdit.image;
      this.addIngredients(this.recipeToEdit.ingredients);
    }
  }

  updateForm(): void {
    const updatedFormValue: any = {
      recipeName: this.recipeToEdit?.name,
      categoryId: this.recipeToEdit?.categories,
      instructions: this.recipeToEdit?.instructions,
      imageUrl: this.recipeToEdit?.image,
    };
    this.createRecipeForm.patchValue(updatedFormValue);
    this.addIngredients(this.recipeToEdit?.ingredients ?? []);
  }
}
