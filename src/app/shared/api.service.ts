import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  //Now Define Post ,Get, Put, Delete method
  // create any method and usse pipe
  postRestaurant(data:any){
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  // get Restaturant using GET method
  getRestaurant(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  // Update Restaturant using PUT method
  updateRestaurant(data:any,  id:number){
    return this._http.put<any>("http://localhost:3000/posts/" +id , data).pipe(map((res:any)=>{
      return res;
    }))
  }
     //Delete Restaurant using DELETE method
  deleteRestaurant(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
   
 

}
