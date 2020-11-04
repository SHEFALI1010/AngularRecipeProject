import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
  recipesChanged=new Subject<Recipe[]>();
    recipeSelected=new EventEmitter<Recipe>();
  private  recipes:Recipe[]=[
        new Recipe('Tasty schnitzel',
        'A super tasty snitzel-just awesome',
        'https://simply-delicious-food.com/wp-content/uploads/2019/09/Chicken-schnitzel-1-500x500.jpg',
        [
          new Ingredient('Meat',1),
          new Ingredient('french fries',20)
        ]),
        new Recipe('Big Fat Burger',
        'What else you need to say?',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQO6V00WvxlwsLrIpLuApi-RBFh1OcsbfIWRMeqUNtt3BpWNXQV&usqp=CAU',
        [
          new Ingredient('Buns',2),
          new Ingredient('Meat',1)
        ]),
        new Recipe('Fruit Salad',
         'A delectable fruit salad recipe with fresh peaches, blueberries, strawberries, blackberries  ',
        'https://carlsbadcravings.com/wp-content/uploads/2018/07/fruit-salad-11-600x900.jpg',
        [
          new Ingredient('blueberries',20),
          new Ingredient('strawberries',10)
        ]),
        new Recipe('Sandwich',
        'The Mumbai sandwich is a classic Indian street food snack, made from layers of chutney, masala mix ',
        'https://gbc-cdn-public-media.azureedge.net/img60136.768x512.jpg',
        [
          new Ingredient('mint leaves',2),
          new Ingredient('green chillies',5)
        ])
      ];
      constructor(private slService:ShoppingListService){}
      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredient:Ingredient[]){
          this.slService.addIngredients(ingredient);
      }
      addRecipe(recipe:Recipe){
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}