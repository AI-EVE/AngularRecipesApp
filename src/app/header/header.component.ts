import { Component, EventEmitter, Output } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private recipesService: RecipesService) {}

  onSaveData() {
    this.recipesService.saveRecipes();
  }
}
