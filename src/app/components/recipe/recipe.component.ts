import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from './types/recipe';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CategoryService} from '../../services/categories.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe?: Recipe;
  categoryName: string = '';

  constructor(private recipeService: RecipeService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.recipeService.getRecipe(params.id).subscribe((recipe: Recipe | undefined) => {
        if (recipe) {
          this.recipe = recipe;
          this.categoryService.getCategory(recipe.categories).subscribe((category: Category | undefined) =>
            this.categoryName = category?.name ?? '');
        } else {
          Swal.fire('Error', 'Could Not Get Recipe!', 'error');
          this.router.navigate(['/']);
        }
      }));
  }

  separateInstructions(instructions: string): string[] {
    return instructions.split('\n');
  }
}
