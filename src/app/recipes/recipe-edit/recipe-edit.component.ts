import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeEditForm: FormGroup;
  recipeId: string;
  recipe: Recipe;
  editMode = true;
  ings: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.formInit();
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['id']) {
        console.log(queryParams['id']);
        this.recipeId = queryParams['id'];
        this.recipe = this.recipesService.getRecipe(this.recipeId);
        if (this.recipe.ingredients) {
          for (let ing of this.recipe.ingredients) {
            (this.recipeEditForm.get('ingredients') as FormArray).push(
              new FormGroup({
                name: new FormControl(ing.name, Validators.required),
                amount: new FormControl(ing.amount, [
                  Validators.required,
                  Validators.min(1),
                ]),
              })
            );
          }
        }
        this.recipeEditForm.patchValue({
          name: this.recipe.name,
          imgPath: this.recipe.imgUrl,
          description: this.recipe.description,
        });
      } else {
        this.clear();
      }
    });
    this.ings = <FormArray>this.recipeEditForm.get('ingredients');
  }

  formInit() {
    this.recipeEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      imgPath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      ingredients: new FormArray([]),
    });
  }

  onAdd() {
    if (this.editMode) {
      this.recipesService.updateRecipe(
        this.recipeId,
        this.generateTheNewRecipe()
      );
    } else {
      this.recipesService.onAddNewRecipe(this.generateTheNewRecipe());
    }

    this.onCancel();
  }

  generateTheNewRecipe() {
    return new Recipe(
      this.recipeEditForm.get('name').value,
      this.recipeEditForm.get('description').value,
      this.recipeEditForm.get('imgPath').value,
      Math.random().toString(),
      this.recipeEditForm.get('ingredients').value
    );
  }
  onAddIngredient() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  clear() {
    this.editMode = false;
    this.recipe = null;
    this.recipeId = null;
    this.recipeEditForm.reset();
  }

  onCancel() {
    this.clear();

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.recipeId);
    this.onCancel();
  }

  deleteIng(index: number) {
    this.ings.removeAt(index);

    (this.recipeEditForm.get('ingredients') as FormArray).removeAt(index);
  }
}
