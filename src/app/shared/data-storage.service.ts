import {Injectable} from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {HttpClient} from "@angular/common/http";

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
}
