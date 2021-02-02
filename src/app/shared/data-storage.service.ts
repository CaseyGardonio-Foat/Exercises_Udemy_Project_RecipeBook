import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from '../recipe-book/recipe.service';
import { Recipe } from '../recipe-book/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService, 
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://udemy-project-recipebook-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response=> {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://udemy-project-recipebook-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes=> {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          });
        }),
        tap(recipes=> {
          this.recipeService.setRecipes(recipes)
        })
      );
    } 
}
  //Instructors' solution code for 20-300, which also doesn't work:
  // fetchRecipes() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http.get<Recipe[]>(
  //         'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
  //         {
  //           params: new HttpParams().set('auth', user.token)
  //         }
  //       );
  //     }),
  //     map(recipes => {
  //       return recipes.map(recipe => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : []
  //         };
  //       });
  //     }),
  //     tap(recipes => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }


