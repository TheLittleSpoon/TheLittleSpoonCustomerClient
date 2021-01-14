import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SmallRecipeListComponent } from './components//recipe-list/small-recipe-list/small-recipe-list.component';
import { BigRecipeListComponent } from './components/recipe-list/big-recipe-list/big-recipe-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditRecipeComponent } from './components/create-edit-recipe/create-edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeComponent,
    SmallRecipeListComponent,
    BigRecipeListComponent,
    CreateEditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
