import { Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientStartedEditing = new Subject<number>();
    ingredientsUpdated = new Subject<Ingredient[]>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    
    getIngredients() {
        return this.ingredients.slice();
    }
g
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients)
    }

    addBatchIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        /*use the spread operator here with push to convert the array to a list of object and push all at once;
        this avoids emitting an event each time a single ingredient from the array is pushed*/
        this.ingredientsUpdated.next(this.ingredients)
    }
}