import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../interfaces/recipe";

@Component({
  selector: 'app-small-recipe-list',
  templateUrl: './small-recipe-list.component.html',
  styleUrls: ['./small-recipe-list.component.css']
})
export class SmallRecipeListComponent implements OnInit {
  @Input() title: string = '';
  @Input() recipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
