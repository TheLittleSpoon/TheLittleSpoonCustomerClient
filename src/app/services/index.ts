import {AuthGuard} from './auth-guard';
import {AuthenticationService} from './authentication.service';
import {CategoryService} from './categories.service';
import {RecipeService} from './recipe.service';
import {RequestService} from './request.service';

export const APP_SERVICES = [
  AuthGuard,
  AuthenticationService,
  CategoryService,
  RecipeService,
  RequestService
];
