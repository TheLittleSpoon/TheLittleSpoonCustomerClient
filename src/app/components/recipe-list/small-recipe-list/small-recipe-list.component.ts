import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe/types/recipe';

@Component({
  selector: 'app-small-recipe-list',
  templateUrl: './small-recipe-list.component.html',
  styleUrls: ['./small-recipe-list.component.css'],
})
export class SmallRecipeListComponent implements OnInit {
  @Input() title = '';
  @Input() recipes: Recipe[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
