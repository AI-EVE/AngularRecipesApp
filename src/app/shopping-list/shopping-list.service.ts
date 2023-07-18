import { Injectable } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  updateIngredients = new Subject<Ingredient[]>();

  selectedIngredientIndex = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updateIngredients.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updateIngredients.next(this.ingredients.slice());
  }

  setIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.updateIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateIngredients.next(this.ingredients.slice());
  }
}
