import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output('ingredientAdded') ingredientEventEmitter = new EventEmitter<Ingredient>();
  
  @ViewChild('nameInput') nameInputReference: ElementRef;
  @ViewChild('amountInput') amountInputReference: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const name = this.nameInputReference.nativeElement.value;
    const amount = this.amountInputReference.nativeElement.value;
    this.ingredientEventEmitter.emit(new Ingredient(name, amount));
  }
}
