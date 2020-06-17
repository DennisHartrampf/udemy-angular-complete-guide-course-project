import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Spaghetti Aglio e Olio', 'Lecker!', 
      'https://img.chefkoch-cdn.de/rezepte/1452391250171274/bilder/1236586/crop-960x640/spaghetti-aglio-olio-e-peperoncino.jpg')
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
