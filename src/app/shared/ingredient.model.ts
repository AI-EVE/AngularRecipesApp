export default class Ingredient {
  public id: string = null;
  public recipeId: string = null;
  constructor(public name: string, public amount: number) {}
}
