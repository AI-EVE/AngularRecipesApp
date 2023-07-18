import { Subject, catchError } from 'rxjs';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  public addNewRecipe = new Subject<Recipe[]>();

  private recipes: Recipe[] = null;

  private recipesToSave: Recipe[] = [];

  constructor(private httpClient: HttpClient) {}

  getRecipes() {
    if (this.recipes != null) {
      this.addNewRecipe.next(this.recipes.slice());
    } else {
      this.httpClient
        .get<Recipe[]>('https://localhost:7054/api/recipes')
        .pipe(
          catchError((error) => {
            console.log(error);
            return [];
          })
        )
        .subscribe((recipes) => {
          this.recipes = recipes;
          console.log(this.recipes);
          console.log(recipes);
          this.addNewRecipe.next(this.recipes.slice());
        });
    }
  }

  getRecipe(id: string) {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesToSave.push(recipe);
    console.log(this.recipesToSave);
  }

  onAddNewRecipe(recipe: Recipe) {
    this.addRecipe(recipe);
    this.addNewRecipe.next(this.recipes.slice());
  }

  updateRecipe(id: string, recipe: Recipe) {
    const recipeToEdit: Recipe = this.getRecipe(id);

    recipeToEdit.name = recipe.name;
    recipeToEdit.description = recipe.description;
    recipeToEdit.imgUrl = recipe.imgUrl;
    recipeToEdit.ingredients = recipe.ingredients;

    let x = this.recipesToSave.find((recipe) => recipe.id === id);

    if (x) {
      x.name = recipe.name;
      x.description = recipe.description;
      x.imgUrl = recipe.imgUrl;
      x.ingredients = recipe.ingredients;
    } else {
      this.recipesToSave.push(recipeToEdit);
    }
    this.addNewRecipe.next(this.recipes.slice());
    console.log(this.recipesToSave);
  }

  deleteRecipe(id: string) {
    let recipeToDelete: Recipe = this.recipesToSave.find(
      (recipe) => recipe.id === id
    );

    if (!recipeToDelete) {
      recipeToDelete = this.getRecipe(id);
    }

    if (recipeToDelete.id.split('-').length > 2) {
      this.httpClient
        .delete(`https://localhost:7054/api/recipes/${id}`)
        .subscribe((response) => {
          this.recipesToSave.splice(
            this.recipesToSave.indexOf(recipeToDelete),
            1
          );

          this.recipes.splice(this.recipes.indexOf(recipeToDelete), 1);
          this.addNewRecipe.next(this.recipes.slice());

          console.log(response);
        });
    } else {
      this.recipesToSave.splice(this.recipesToSave.indexOf(recipeToDelete), 1);

      this.recipes.splice(this.recipes.indexOf(recipeToDelete), 1);
      this.addNewRecipe.next(this.recipes.slice());
    }
  }

  saveRecipes() {
    this.recipesToSave.forEach((recipe) => {
      if (recipe.id.split('-').length > 2) {
        this.httpClient
          .put(`https://localhost:7054/api/recipes/${recipe.id}`, recipe)
          .subscribe((response) => {
            console.log(response);
          });
      } else {
        recipe.id = null;
        this.httpClient
          .post('https://localhost:7054/api/recipes', recipe)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });

    this.recipesToSave = [];
  }
}
