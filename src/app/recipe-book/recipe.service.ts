import { Recipe } from './recipe.model';
import { Output, Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs'

@Injectable()
export class RecipeService {
    // @Output() recipeSelected = new Subject<Recipe>()
    //we don't need this anymore because we are using routing to select recipes now
    recipesChanged = new Subject<Recipe[]>();
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

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}