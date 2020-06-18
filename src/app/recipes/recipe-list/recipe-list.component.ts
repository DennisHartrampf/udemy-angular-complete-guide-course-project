import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output('recipeSelected') recipeChosenEventEmitter = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('Spaghetti Aglio e Olio', 'Sehr lecker!', 
      'https://img.chefkoch-cdn.de/rezepte/1452391250171274/bilder/1236586/crop-960x640/spaghetti-aglio-olio-e-peperoncino.jpg'),
    new Recipe('Pizza Funghi', 'Lecker!', 
      'https://www.bella-cucina.de/wp-content/uploads/2016/11/pizza-funghi.jpg'),
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeChosen(recipe: Recipe) {
    this.recipeChosenEventEmitter.emit(recipe);
  }
}
