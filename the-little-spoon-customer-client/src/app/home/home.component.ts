import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe/types/recipe";
import {UnitEnum} from "../recipe/types/unit.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [{
    name: 'hard boiled egg',
    imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2Fmsid-68494742%2Cwidth-800%2Cheight-600%2Cresizemode-75%2Cimgsize-1248878%2Cpt-32%2Cy_pad-40%2F68494742.jpg&imgrefurl=https%3A%2F%2Ftimesofindia.indiatimes.com%2Flife-style%2Fhealth-fitness%2Fdiet%2Fcan-eating-eggs-give-you-heart-trouble-here-is-what-experts-have-to-say%2Farticleshow%2F68494742.cms&tbnid=y-0EbORHg1-pmM&vet=12ahUKEwjFlaS4y4XuAhVP4BoKHat3CgEQMygLegUIARCFAg..i&docid=BV7ttPxxNqwjNM&w=800&h=600&q=egg&safe=active&ved=2ahUKEwjFlaS4y4XuAhVP4BoKHat3CgEQMygLegUIARCFAg',
    ingredients: [{name: 'egg', quantity: 1, unit: UnitEnum.AMOUNT}],
    instructions: ['boil water in small pot', 'put egg in pot', 'wait 15 minutes', 'take egg out']
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
