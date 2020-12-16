import { Recipe } from './recipe.model'

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('This is a test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
        new Recipe('This is another test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),
        new Recipe('This is yet another test recipe', 'This is only a test', '../../assets/SwedishChef.gif'),   
        ];

    getRecipes() {
        return this.recipes.slice();
    }

}