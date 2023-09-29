import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartCountValue:any

  constructor(private api:ApiService){}
  ngOnInit(): void {
   
    this.api.cartItemCount.subscribe((response:any)=>{
      console.log(response)
      this.cartCountValue=response
    })
  }

  search(event:any){
    
    this.api.searchTerm.next(event.target.value)

    //next is a method in behaviour subject used to determine what to do next for passing the data
  }

}
