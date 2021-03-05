import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CreateEditRecipeComponent } from './components/create-edit-recipe/create-edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './services/auth-guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search-recipe', component: SearchComponent },
  { path: 'create-recipe', component: CreateEditRecipeComponent },
  { path: 'edit-recipe/:id', component: CreateEditRecipeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
