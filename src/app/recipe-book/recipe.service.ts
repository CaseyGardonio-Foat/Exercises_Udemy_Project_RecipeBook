import { Recipe } from './recipe.model';
import { Output, EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    @Output() recipeSelected = new EventEmitter<Recipe>()

    private recipes: Recipe[] = [
        new Recipe('This is a test recipe', 'This is only a test', '../../assets/SwedishChef.gif', 
        [new Ingredient ('ingredient1', 1), 
        new Ingredient ('ingredient2', 2), 
        new Ingredient ('ingredient3', 3)]),
        new Recipe('This is another test recipe', 'This is only a test', '../../assets/SwedishChef.gif',
        [new Ingredient ('ingredient1', 1), 
        new Ingredient ('ingredient2', 2), 
        new Ingredient ('ingredient3', 3)]),       
        new Recipe('This is yet another test recipe', 'This is only a test', '../../assets/SwedishChef.gif',
        [new Ingredient ('ingredient1', 1), 
        new Ingredient ('ingredient2', 2), 
        new Ingredient ('ingredient3', 3)])        
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipeIngredients(ingredients: Ingredient[]){
        this.shoppingListService.addBatchIngredients(ingredients)
    }

}