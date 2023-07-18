import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css'],
})
export class RecipesItemComponent {
  @Input()
  recipe: Recipe;
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // onRecipeClick(event: Event) {
  //   event.preventDefault();
  //   this.recipesService.selectRecipe.emit(this.recipe);
  // }

  navigate(event: Event) {
    event.preventDefault();
    this.router.navigate(['details'], {
      relativeTo: this.route,
      queryParams: { id: this.recipe.id },
    });
  }
}
