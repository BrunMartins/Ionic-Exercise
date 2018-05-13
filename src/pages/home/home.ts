import { Component/*, ViewChild*/ } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any;
  page: number;
  //@ViewChild('title') title;
  
  constructor(public navCtrl: NavController, private api: ApiProvider, public navParams: NavParams, private toast: ToastController) { }

  ionViewDidEnter(){
	this.page = 1;
	this.getAllUsers(this.page);
  }
  
  getAllUsers(page: number){
    this.api.getAll(page)
	  .then((result: any) =>{
		  if(result.length == 0){
			let toaster = this.toast.create({message: "Sem resultados para a página " + this.page, position: "bottom", duration: 1500});
			toaster.present();
			this.page--;
			this.getAllUsers(this.page);
		  } else if(this.page == 0) {
		   	this.page = 1;
			this.getAllUsers(this.page);
		  } else {
		    this.users = [];
			for(var i = 0; i < result.length; i++){
			  var user = result[i];
			  this.users.push(user);
			}
		  }
	  })
	  .catch((error: any) =>{
	    if(error != undefined){
	      let toaster = this.toast.create({message: "Erro ao listar utilizadores Erro: " + error, position: "bottom", duration: 2000});
	      toaster.present();
		}
	  });
  }
  
  openUser(id: number){
    this.api.get(id)
	  .then((result: any) => {
		let toaster = this.toast.create({message: result.first_name + " " + result.last_name, position: "top", duration: 3000});
		toaster.present();
	  })
	  .catch((error: any) => {
		 let toaster = this.toast.create({message: "Erro ao listar utilizador Erro: " + error, position: "bottom", duration: 2000});
         toaster.present();
	  });	
  }
  
  nextPage(){
    this.page++;
	this.getAllUsers(this.page);
  }
  
  prevPage(){
    this.page--;
	this.getAllUsers(this.page);
  }
  
}
