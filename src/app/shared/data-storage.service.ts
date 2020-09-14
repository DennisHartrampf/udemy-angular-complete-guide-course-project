import {Injectable} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private readonly RECIPES_API_ENDPOINT = 'https://udemy-angular-course-pro-7cf95.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(this.RECIPES_API_ENDPOINT, recipes).subscribe(
      response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    this.httpClient
      .get<Recipe[]>(this.RECIPES_API_ENDPOINT)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return DataStorageService.replaceUndefinedIngredientsByEmptyArray(recipe)
        });
      }))
      .subscribe(recipes => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      })
  }

  private static replaceUndefinedIngredientsByEmptyArray(recipe: Recipe) {
    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
  }
}
