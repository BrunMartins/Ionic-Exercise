import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
	
  private API_URL = "https://reqres.in/api";
  
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }
  
  getAll(page :number){
	return new Promise((resolve, reject) => {
	   let url = this.API_URL + "/users/?per_page=10&page=" + page;
	   
	   this.http.get(url)
	     .subscribe((result: any) => {
			resolve(result.data);
			console.log(result.data);
		 },
		 (error) => {
			reject(error);
		 });
	});
  }

  get(id: number){
    return new Promise((resolve, reject) => {
	  let url = this.API_URL + "/users/" + id;
	  
	  this.http.get(url)
	    .subscribe((result: any) => {
		  resolve(result.data);
		},
		(error) => {
		  reject(error);
		});
	});
  }
}
