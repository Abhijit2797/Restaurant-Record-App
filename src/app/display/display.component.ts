import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaturantData } from './display.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  formValue! : FormGroup
  allRestaurantData: any;
  showAdd!:boolean //for Add
  showBtn!:boolean // for update
  constructor(private formbuilder : FormBuilder , private api:ApiService) { }
  //object for posting
   restaurantModelObj:RestaturantData = new RestaturantData
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile : [''],
      address : [''],
      services :['']
    })
    //now bind the form value
    //Now to interact this form data to server we need httpclientmodule
    //Now Add Details form is ready to use
    //now make service
    // To display data on home screen
    this.getAllData()
  }
     // To display data on home screen
     clickAddResto(){
       this.formValue.reset()
       this.showAdd= true;
       this.showBtn = false;
     }
  
//Now subscribe data
addResto(){
  this.restaurantModelObj.name = this.formValue.value.name ;
  this.restaurantModelObj.email = this.formValue.value.email ;
  this.restaurantModelObj.mobile = this.formValue.value.mobile ;
  this.restaurantModelObj.address = this.formValue.value.address ;
  this.restaurantModelObj.services = this.formValue.value.services ;
  
//data subscribe

this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
  alert ("Restaurant recorded added successfully")
  this.formValue.reset()
  this.getAllData() //quick refresh
},
err=>{
  alert ("something went wrong")
}
)
}
//show data on home screen
getAllData(){
  this.api.getRestaurant().subscribe(res=>{
    this.allRestaurantData = res;
  })
}
//delete records

deleteResto(data:any){
  this.api.deleteRestaurant(data.id).subscribe(res=>{
    alert("Record deleted successfully")
    this.getAllData() //quick refresh
  })
}
// Edit Records
onEditResto(data:any){
  this.showAdd= false;
  this.showBtn = true;
  //from update method
  this.restaurantModelObj.id = data.id
  //from update method
  //used to display particular record whenever click on edit
  // use controls and setValue to each data input field
  this.formValue.controls['name'].setValue(data.name)
  this.formValue.controls['email'].setValue(data.email)
  this.formValue.controls['mobile'].setValue(data.mobile)
  this.formValue.controls['address'].setValue(data.address)
  this.formValue.controls['services'].setValue(data.services)
}
updateResto(){
  this.restaurantModelObj.name = this.formValue.value.name ;
  this.restaurantModelObj.email = this.formValue.value.email ;
  this.restaurantModelObj.mobile = this.formValue.value.mobile ;
  this.restaurantModelObj.address = this.formValue.value.address ;
  this.restaurantModelObj.services = this.formValue.value.services ;
//use this from AddResto method and pass this.restaurantModelObj.id to get particular id 
  this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res=>{
    alert("Record updated Successfully")
    this.formValue.reset()
    this.getAllData()
  })
}
}




