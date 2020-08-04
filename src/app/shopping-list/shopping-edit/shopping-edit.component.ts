import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private editedIngredientIndex: number;
  editMode: boolean = false;
  @ViewChild('form') form: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editMode = true;
      this.editedIngredientIndex = index;
      const editedIngredient = this.shoppingListService.getIngredient(index);
      this.form.form.setValue({
        'name': editedIngredient.name, 
        'amount': editedIngredient.amount
      });
    });
  }

  onSubmit() {
    const name = this.form.value.name;
    const amount = this.form.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, newIngredient);
      this.cancelEditing();
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.form.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private cancelEditing() {
    this.editMode = false;
    this.editedIngredientIndex = null;
  }
  
  onCancelEditing() {
    this.cancelEditing();
    this.form.resetForm();
  }
}
