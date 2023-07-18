import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent {
  recipe: Recipe;
  recipeId: string;
  constructor(
    private slSercive: ShoppingListService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.recipeId = queryParams['id'];
      this.recipe = this.recipesService.getRecipe(this.recipeId);
      console.log(this.recipe);
      console.log(this.recipeId);
    });
  }
  addToSL(event: Event) {
    event.preventDefault();
    this.slSercive.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe(event: Event) {
    event.preventDefault();
    this.recipesService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
