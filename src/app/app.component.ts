import { RecipeService } from './services/recipe.service';
import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Recipe} from './components/recipe/types/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'the-little-spoon-customer-client';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private recipeService: RecipeService) {
    this.initIconsRegistry();
  }

  ngOnInit(): void {
    this.initIconsRegistry();
  }

  initIconsRegistry(): void {
    this.matIconRegistry.addSvgIcon('the_little_spoon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/TheLittleSpoonLogo.svg'));
    this.matIconRegistry.addSvgIcon('burger',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/burger.svg'));
    this.matIconRegistry.addSvgIcon('white-burger',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/white-burger.svg'));
  }

  saveRecipe(recipe: Recipe): void {
    this.recipeService.saveRecipe(recipe);
  }
}
