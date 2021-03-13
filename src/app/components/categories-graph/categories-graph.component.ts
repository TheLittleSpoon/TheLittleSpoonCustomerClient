import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {CategoryService} from '../../services/categories.service';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../recipe/types/recipe';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-categories-graph',
  templateUrl: './categories-graph.component.html',
  styleUrls: ['./categories-graph.component.css']
})
export class CategoriesGraphComponent {
}
