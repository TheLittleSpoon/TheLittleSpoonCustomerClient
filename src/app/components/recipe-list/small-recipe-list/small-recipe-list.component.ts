import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe/types/recipe';

@Component({
  selector: 'app-small-recipe-list',
  templateUrl: './small-recipe-list.component.html',
  styleUrls: ['./small-recipe-list.component.css']
})
export class SmallRecipeListComponent implements OnInit {
  @Input() title = '';
  @Input() recipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
