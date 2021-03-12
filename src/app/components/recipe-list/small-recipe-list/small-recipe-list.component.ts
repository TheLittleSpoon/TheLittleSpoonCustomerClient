import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {RecipeService} from 'src/app/services/recipe.service';
import {Recipe} from '../../recipe/types/recipe';
import Swal from 'sweetalert2';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../types/user';

@Component({
  selector: 'app-small-recipe-list',
  templateUrl: './small-recipe-list.component.html',
  styleUrls: ['./small-recipe-list.component.css'],
})
export class SmallRecipeListComponent implements OnInit {
  @Input() title ? = '';
  @Input() recipes: Recipe[] = [];
  userId!: string;

  constructor(private router: Router, private recipeService: RecipeService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((user: User | null) => this.userId = user?.id ?? '');
  }

  ngOnInit(): void {
  }

  deleteRecipe(recipe: Recipe): void {
    Swal.fire({
      text: 'Are you sure you want to delete this recipe?',
      icon: 'question',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
    }).then((result: any) => {
      if (result.value) {
        this.recipeService.deleteRecipe(recipe).subscribe((data) => {
        });
        Swal.fire(
          'Deleted!',
          recipe.name + ' recipe has been deleted.',
          'success'
        );
      }
    });
  }
}
