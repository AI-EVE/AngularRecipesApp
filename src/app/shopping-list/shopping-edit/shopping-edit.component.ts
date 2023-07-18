import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  ingredientForm: FormGroup;
  selectedIngredientIndex: number;
  selectedIngredientSubscription: Subscription;
  mode = 'add';
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.selectedIngredientSubscription =
      this.shoppingListService.selectedIngredientIndex.subscribe((index) => {
        this.selectedIngredientIndex = index;
        const selectedIngredient =
          this.shoppingListService.getIngredientByIndex(index);
        this.ingredientForm.setValue({
          name: selectedIngredient.name,
          amount: selectedIngredient.amount,
        });
        this.mode = 'edit';
      });
  }

  onAdd() {
    const ingredient = new Ingredient(
      this.ingredientForm.get('name').value,
      this.ingredientForm.get('amount').value
    );
    if (this.mode === 'edit') {
      this.shoppingListService.setIngredient(
        this.selectedIngredientIndex,
        ingredient
      );
      this.mode = 'add';
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.ingredientForm.reset();
  }

  onClear() {
    this.ingredientForm.reset();
    this.mode = 'add';
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.selectedIngredientSubscription.unsubscribe();
  }
}
