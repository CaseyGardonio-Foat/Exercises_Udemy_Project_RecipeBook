import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientsUpdated = new Subject<Ingredient[]>();
    ingredientStartedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients.slice())
    }

    addBatchIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        /*use the spread operator here with push to convert the array to a list of object and push all at once;
        this avoids emitting an event each time a single ingredient from the array is pushed*/
        this.ingredientsUpdated.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index]= newIngredient;
        this.ingredientsUpdated.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }
}