import { Component } from '@angular/core';
import { Recipe } from './interfaces/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'the-little-spoon-customer-client';

  saveRecipe(recipe: Recipe): void {}
}
