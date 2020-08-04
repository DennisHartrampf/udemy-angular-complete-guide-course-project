import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  get ingredientsControls() {
    return this.ingredientsFormArray.controls;
  }
  
  private get ingredientsFormArray() {
    return this.form.get('ingredients') as FormArray;
  }
  
  private initForm() {
    let name = null;
    let imagePath = null;
    let description = null;
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      
      for (const ingredient of recipe.ingredients) {
        ingredients.push(
          RecipeEditComponent.newIngredientControl(ingredient.name, ingredient.amount)
        )
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  private static newIngredientControl(name?: string, amount?: number) {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+\d*$/)])
    });
  }

  onSubmit() {
    const newRecipe = this.form.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
  }

  onAddIngredient() {
    this.ingredientsFormArray.push(RecipeEditComponent.newIngredientControl())
  }
}
