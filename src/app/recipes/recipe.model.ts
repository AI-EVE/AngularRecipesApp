import Ingredient from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imgUrl: string;
  public ingredients: Ingredient[];
  public id: string;

  constructor(
    name: string,
    desc: string,
    imgPath: string,
    id: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imgUrl = imgPath;
    this.ingredients = ingredients;
    this.id = id;
  }
}
