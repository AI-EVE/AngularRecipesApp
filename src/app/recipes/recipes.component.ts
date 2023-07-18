import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  constructor(private recipesService: RecipesService) {}
  ngOnInit() {
    this.recipesService.addNewRecipe.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}
