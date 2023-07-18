import { Component } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = this.shoppingListService.getIngredients();
  subscribtion: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscribtion = this.shoppingListService.updateIngredients.subscribe(
      (ings) => {
        this.ingredients = ings;
      }
    );
  }

  onSelected(index: number) {
    this.shoppingListService.selectedIngredientIndex.next(index);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
