import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('This is a test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
    new Recipe('This is a test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
    new Recipe('This is a test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
