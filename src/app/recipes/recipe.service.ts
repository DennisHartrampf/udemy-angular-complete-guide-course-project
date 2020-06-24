import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('Spaghetti Aglio e Olio', 
      'Sehr lecker!',
      'https://img.chefkoch-cdn.de/rezepte/1452391250171274/bilder/1236586/crop-960x640/spaghetti-aglio-olio-e-peperoncino.jpg',
      [
        new Ingredient('Spaghetti', 500),
        new Ingredient('Garlic', 5),
        new Ingredient('Olive Oil', 150),
      ]),
    new Recipe('Pizza Funghi', 
      'Lecker!',
      'https://www.bella-cucina.de/wp-content/uploads/2016/11/pizza-funghi.jpg',
      [
        new Ingredient('Dough', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Mushrooms', 10),
        new Ingredient('Cheese', 1),
      ]),
  ];
  
  constructor(private shoppingListService: ShoppingListService) { }
  
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
