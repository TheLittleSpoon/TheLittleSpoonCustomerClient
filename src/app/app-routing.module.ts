import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateEditCategoryComponent } from './components/create-edit-category/create-edit-category.component';
import { CreateEditRecipeComponent } from './components/create-edit-recipe/create-edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './services/auth-guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RecipeComponent} from './components/recipe/recipe.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-recipe', component: CreateEditRecipeComponent },
  { path: 'edit-recipe/:id', component: CreateEditRecipeComponent },
  { path: 'create-category', component: CreateEditCategoryComponent },
  { path: 'edit-category/:id', component: CreateEditCategoryComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
