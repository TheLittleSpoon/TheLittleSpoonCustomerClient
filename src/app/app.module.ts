import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RecipeComponent} from './recipe/recipe.component';
import {SmallRecipeListComponent} from './recipe-list/small-recipe-list/small-recipe-list.component';
import {BigRecipeListComponent} from './recipe-list/big-recipe-list/big-recipe-list.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeComponent,
    SmallRecipeListComponent,
    BigRecipeListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
