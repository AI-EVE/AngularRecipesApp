import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent {
  recipes: Recipe[];
  newRecipeSub: Subscription;
  constructor(private router: Router, private recipesService: RecipesService) {}

  ngOnInit() {
    this.newRecipeSub = this.recipesService.addNewRecipe.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipesService.getRecipes();
  }

  newRecipe() {
    this.router.navigate(['recipes', 'edit']);
  }

  ngOnDestroy() {
    this.newRecipeSub.unsubscribe();
  }
}
