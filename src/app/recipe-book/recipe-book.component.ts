import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service'

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: [RecipeService]
})
export class RecipeBookComponent implements OnInit {
  constructor() { }

  ngOnInit(){
    //no longer need this because we are using routing instead; 
    //all other references to RecipeService deleted from this component
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) =>{
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }
    


}
