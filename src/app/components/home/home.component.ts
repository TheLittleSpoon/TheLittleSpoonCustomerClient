import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../interfaces/recipe";
import {UnitEnum} from "../../interfaces/unit.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [{
    name: 'hard boiled egg',
    imageUrl: 'https://static.toiimg.com/thumb/msid-68494742,width-800,height-600,resizemode-75,imgsize-1248878,pt-32,y_pad-40/68494742.jpg',
    ingredients: [{name: 'egg', quantity: 1, unit: UnitEnum.AMOUNT}],
    instructions: ['boil water in small pot', 'put egg in pot', 'wait 15 minutes', 'take egg out']
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
