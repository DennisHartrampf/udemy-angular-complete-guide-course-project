import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('Spaghetti Aglio e Olio', 'Sehr lecker!',
      'https://img.chefkoch-cdn.de/rezepte/1452391250171274/bilder/1236586/crop-960x640/spaghetti-aglio-olio-e-peperoncino.jpg'),
    new Recipe('Pizza Funghi', 'Lecker!',
      'https://www.bella-cucina.de/wp-content/uploads/2016/11/pizza-funghi.jpg'),
  ];
  
  getRecipes() {
    return this.recipes.slice();
  }
}
