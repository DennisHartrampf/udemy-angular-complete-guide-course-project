import {Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  
  // private recipes: Recipe[] = [
  //   new Recipe('Spaghetti Aglio e Olio', 
  //     'Sehr lecker!',
  //     'https://img.chefkoch-cdn.de/rezepte/1452391250171274/bilder/1236586/crop-960x640/spaghetti-aglio-olio-e-peperoncino.jpg',
  //     [
  //       new Ingredient('Spaghetti', 500),
  //       new Ingredient('Garlic', 5),
  //       new Ingredient('Olive Oil', 150),
  //     ]),
  //   new Recipe('Pizza Funghi', 
  //     'Lecker!',
  //     'https://www.bella-cucina.de/wp-content/uploads/2016/11/pizza-funghi.jpg',
  //     [
  //       new Ingredient('Dough', 1),
  //       new Ingredient('Tomatoes', 2),
  //       new Ingredient('Mushrooms', 10),
  //       new Ingredient('Cheese', 1),
  //     ]),
  //   new Recipe('Ohne Zutaten', 
  //     'Schmeckts nicht',
  //     'https://www.bella-cucina.de/wp-content/uploads/2016/11/pizza-funghi.jpg',
  //     []
  //     ),
  // ];
  
  private recipes: Recipe[] = [];
  
  constructor(private shoppingListService: ShoppingListService) { }
  
  getRecipes() {
    return this.recipes.slice();
  }
  
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.fireRecipesChanged();
  }

  private fireRecipesChanged() {
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.fireRecipesChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.fireRecipesChanged();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.fireRecipesChanged();
  }
}
