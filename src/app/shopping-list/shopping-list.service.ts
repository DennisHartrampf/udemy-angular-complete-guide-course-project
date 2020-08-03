import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  
  private ingredients: Ingredient[] = [
    new Ingredient("Spaghetti", 500),
    new Ingredient("Knoblauch", 5),
  ];
  
  constructor() { }
  
  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
  
  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
  
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredients());
  }
}
