import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from './ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';
import { auth } from 'firebase';



@Injectable()
export class DataStorageService{
constructor(private httpClient:HttpClient, private recipeService:RecipeService,private authService:AuthService){}
storeRecipes(){
  const token= this.authService.getToken();
  return  this.httpClient.put('https://recipe-book-2500f.firebaseio.com/recipes.json?auth='+ token,this.recipeService.getRecipes());
}
getRecipes(){
  
 const token= this.authService.getToken();
 
  
   //  this.httpClient.get<Recipe[]>('https://recipe-book-2500f.firebaseio.com/recipes.json')
     this.httpClient.get<Recipe[]>('https://recipe-book-2500f.firebaseio.com/recipes.json?auth='+ token
     ).map(
    
        (recipes)=>{
            
            for(let recipe of recipes){
            if(!recipe['ingredients']){
            recipe['ingredients']=[];
            }
            
        }
        
        return recipes; 
    }
    )
    .subscribe(
        (recipes)=>{
            
            this.recipeService.setRecipes(recipes);
        }
    );
  }
}