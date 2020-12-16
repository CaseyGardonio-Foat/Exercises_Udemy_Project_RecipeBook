import { Recipe } from './recipe.model';
import { Output, EventEmitter } from '@angular/core'

export class RecipeService {
    @Output() recipeSelected = new EventEmitter<Recipe>()

    private recipes: Recipe[] = [
        new Recipe('This is a test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
        new Recipe('This is another test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
        new Recipe('This is yet another test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),   
        ];

    getRecipes() {
        return this.recipes.slice();
    }

}