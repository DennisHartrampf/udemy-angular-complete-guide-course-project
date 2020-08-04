import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  selectedIngredientIndex: number;
  
  constructor(private shoppingListService: ShoppingListService) { }

  private ingredientsChangedSubscription: Subscription;
  private stoppedEditingSubscription: Subscription;

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
    this.stoppedEditingSubscription = this.shoppingListService.stoppedEditing.subscribe(() => {
      this.selectedIngredientIndex = null;
    })
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
    this.stoppedEditingSubscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingListService.startedEditing.next(index);
    this.selectedIngredientIndex = index;
  }
}
